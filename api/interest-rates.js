// api/interest-rates.js
export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Usar tu API key de FRED desde variables de entorno de Vercel
    const FRED_API_KEY = process.env.FRED_KEY;
    
    if (!FRED_API_KEY) {
      throw new Error('FRED API key not configured in Vercel');
    }

    console.log('Fetching real interest rates from FRED API');
    
    // URLs para tasas reales de FRED
    const urls = {
      usd_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=TB3MS&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`,
      jpy_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=INTGSTJPM193N&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`,
      chf_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=INTGSTCHM193N&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`
    };
    
    const rates = {};
    const errors = [];
    
    // Fetch todas las tasas en paralelo
    const promises = Object.entries(urls).map(async ([currency, url]) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error_message) {
          throw new Error(data.error_message);
        }
        
        if (data.observations && data.observations.length > 0) {
          const value = parseFloat(data.observations[0].value);
          if (!isNaN(value)) {
            rates[currency] = value;
            return { currency, value, success: true };
          } else {
            throw new Error('Invalid rate value');
          }
        } else {
          throw new Error('No observations available');
        }
      } catch (error) {
        errors.push(`${currency}: ${error.message}`);
        return { currency, error: error.message, success: false };
      }
    });
    
    const results = await Promise.all(promises);
    
    // Verificar que tenemos al menos algunas tasas
    if (Object.keys(rates).length === 0) {
      throw new Error(`No se pudieron obtener tasas. Errores: ${errors.join(', ')}`);
    }
    
    // Llenar valores faltantes con defaults si es necesario
    const defaultRates = {
      usd_3m: 4.34,
      jpy_3m: 0.77,
      chf_3m: 0.96
    };
    
    const finalRates = { ...defaultRates, ...rates };
    
    res.status(200).json({
      success: true,
      rates: finalRates,
      fetchResults: results,
      source: 'FRED Official API',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching interest rates:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
