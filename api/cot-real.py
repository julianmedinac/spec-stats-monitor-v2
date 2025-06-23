from http.server import BaseHTTPRequestHandler
import json
import urllib.parse
from datetime import datetime, timedelta
import traceback

try:
    from cot_reports import cot
except ImportError:
    # Si no está instalada, instalar automáticamente
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "cot-reports"])
    from cot_reports import cot

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse URL parameters
            parsed_url = urllib.parse.urlparse(self.path)
            query_params = urllib.parse.parse_qs(parsed_url.query)
            
            # Enable CORS
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # Get currency parameter
            currency = query_params.get('currency', [''])[0].upper()
            
            if currency not in ['JPY', 'CHF']:
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Currency must be JPY or CHF'
                }).encode())
                return
            
            print(f"Fetching REAL COT data for {currency} using cot-reports library...")
            
            # Obtener datos REALES de COT usando la librería
            cot_data = fetch_real_cot_data(currency)
            
            response = {
                'success': True,
                'currency': currency,
                'data': cot_data,
                'source': 'CFTC Official via cot-reports library',
                'timestamp': datetime.now().isoformat(),
                'records_count': len(cot_data)
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            print(f"Error in COT endpoint: {str(e)}")
            print(traceback.format_exc())
            
            error_response = {
                'success': False,
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            }
            
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def fetch_real_cot_data(currency):
    """
    Obtener datos COT reales usando la librería cot-reports
    """
    try:
        # Mapear currency a CFTC commodity codes
        commodity_mapping = {
            'JPY': 'JAPANESE YEN - CHICAGO MERCANTILE EXCHANGE',
            'CHF': 'SWISS FRANC - CHICAGO MERCANTILE EXCHANGE'
        }
        
        commodity_name = commodity_mapping.get(currency)
        if not commodity_name:
            raise ValueError(f"Commodity mapping not found for {currency}")
        
        print(f"Fetching COT data for: {commodity_name}")
        
        # Obtener datos de los últimos 6 meses para tener suficiente historia
        end_date = datetime.now()
        start_date = end_date - timedelta(days=180)  # ~6 meses
        
        # Usar la librería cot-reports para obtener datos REALES
        # Esto descarga directamente de CFTC
        df = cot.cot_year(
            year=end_date.year,
            cot_report_type='legacy_fut'  # Legacy Futures reports
        )
        
        # Filtrar por el commodity específico
        currency_data = df[df['Market_and_Exchange_Names'].str.contains(
            commodity_name, case=False, na=False
        )]
        
        if currency_data.empty:
            # Si no encuentra datos exactos, buscar por currency code
            currency_data = df[df['Market_and_Exchange_Names'].str.contains(
                currency, case=False, na=False
            )]
        
        if currency_data.empty:
            raise ValueError(f"No COT data found for {currency}")
        
        # Convertir a formato que espera el frontend
        cot_records = []
        
        # Ordenar por fecha
        currency_data = currency_data.sort_values('Report_Date_as_YYYY-MM-DD')
        
        # Tomar las últimas 13 semanas
        recent_data = currency_data.tail(13)
        
        for index, row in recent_data.iterrows():
            try:
                # Extraer valores numéricos (remover comas y convertir)
                leveraged_long = safe_int(row.get('Money_Manager_Longs', 0))
                leveraged_short = safe_int(row.get('Money_Manager_Shorts', 0))
                
                # Otros reportables (Other Reportables)
                asset_manager_long = safe_int(row.get('Other_Rept_Longs', 0))
                asset_manager_short = safe_int(row.get('Other_Rept_Shorts', 0))
                
                # Dealers (Commercial)
                dealer_long = safe_int(row.get('Dealer_Longs', 0))
                dealer_short = safe_int(row.get('Dealer_Shorts', 0))
                
                # Calcular posiciones netas
                net_leveraged = leveraged_long - leveraged_short
                net_asset_manager = asset_manager_long - asset_manager_short
                net_dealer = dealer_long - dealer_short
                total_net = net_leveraged + net_asset_manager + net_dealer
                
                cot_records.append({
                    'date': str(row['Report_Date_as_YYYY-MM-DD']),
                    'leveragedLong': leveraged_long,
                    'leveragedShort': leveraged_short,
                    'assetManagerLong': asset_manager_long,
                    'assetManagerShort': asset_manager_short,
                    'dealerLong': dealer_long,
                    'dealerShort': dealer_short,
                    'netLeveraged': net_leveraged,
                    'netAssetManager': net_asset_manager,
                    'netDealer': net_dealer,
                    'totalNet': total_net,
                    'deltaNet': 0,  # Calcularemos después
                    'deltaLeveraged': 0,
                    'deltaAssetManager': 0
                })
                
            except Exception as e:
                print(f"Error processing row: {e}")
                continue
        
        # Calcular deltas semanales
        for i in range(1, len(cot_records)):
            prev_record = cot_records[i-1]
            curr_record = cot_records[i]
            
            curr_record['deltaNet'] = curr_record['totalNet'] - prev_record['totalNet']
            curr_record['deltaLeveraged'] = curr_record['netLeveraged'] - prev_record['netLeveraged']
            curr_record['deltaAssetManager'] = curr_record['netAssetManager'] - prev_record['netAssetManager']
        
        print(f"✅ Successfully processed {len(cot_records)} REAL COT records for {currency}")
        return cot_records
        
    except Exception as e:
        print(f"Error fetching REAL COT data: {e}")
        raise

def safe_int(value):
    """
    Convertir valor a entero de forma segura
    """
    if isinstance(value, (int, float)):
        return int(value)
    
    if isinstance(value, str):
        # Remover comas y espacios
        clean_value = value.replace(',', '').replace(' ', '').strip()
        if clean_value == '' or clean_value == '-':
            return 0
        try:
            return int(float(clean_value))
        except ValueError:
            return 0
    
    return 0
