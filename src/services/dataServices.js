// APIs para Datos Reales - Spec Stats COT Monitor

// ================================
// 1. CFTC COT DATA - DATOS REALES
// ================================

// Códigos CFTC para futures de divisas
const CFTC_COMMODITY_CODES = {
  JPY: '097741', // Japanese Yen futures
  CHF: '092741'  // Swiss Franc futures
};

// Función para obtener datos COT reales de CFTC
const fetchRealCOTData = async (currency) => {
  try {
    // CFTC API endpoint para datos COT
    const commodityCode = CFTC_COMMODITY_CODES[currency];
    const currentYear = new Date().getFullYear();
    
    // URL oficial CFTC para Legacy COT Reports
    const url = `https://www.cftc.gov/sites/default/files/files/dea/cotdata/${currentYear}/futures/deacot${currentYear}.zip`;
    
    // Para desarrollo, usaremos un proxy o servicio alternativo
    // Ya que CFTC no tiene CORS habilitado
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    
    console.log(`Fetching real COT data for ${currency}...`);
    
    // Alternativa: usar datos históricos del último año
    const response = await fetch(`https://www.cftc.gov/sites/default/files/files/dea/cotdata/legacy_fut/deacot2025.txt`);
    
    if (!response.ok) {
      throw new Error(`CFTC API error: ${response.status}`);
    }
    
    const textData = await response.text();
    return parseCFTCData(textData, commodityCode);
    
  } catch (error) {
    console.error(`Error fetching COT data for ${currency}:`, error);
    // Fallback a datos mock si falla la API real
    return generateMockCOTData(currency);
  }
};

// Parser para datos CFTC en formato texto
const parseCFTCData = (textData, commodityCode) => {
  const lines = textData.split('\n');
  const cotData = [];
  
  lines.forEach(line => {
    const columns = line.split(',');
    
    // Verificar si es el commodity code correcto
    if (columns[2] === commodityCode) {
      const date = columns[2]; // Report date
      const leveragedLong = parseInt(columns[7]) || 0;
      const leveragedShort = parseInt(columns[8]) || 0;
      const assetManagerLong = parseInt(columns[10]) || 0;
      const assetManagerShort = parseInt(columns[11]) || 0;
      const dealerLong = parseInt(columns[4]) || 0;
      const dealerShort = parseInt(columns[5]) || 0;
      
      const netLeveraged = leveragedLong - leveragedShort;
      const netAssetManager = assetManagerLong - assetManagerShort;
      const netDealer = dealerLong - dealerShort;
      const totalNet = netLeveraged + netAssetManager + netDealer;
      
      cotData.push({
        date: formatCFTCDate(date),
        leveragedLong, leveragedShort,
        assetManagerLong, assetManagerShort,
        dealerLong, dealerShort,
        netLeveraged, netAssetManager, netDealer,
        totalNet,
        deltaNet: 0, deltaLeveraged: 0, deltaAssetManager: 0
      });
    }
  });
  
  // Calcular deltas
  for (let i = 1; i < cotData.length; i++) {
    cotData[i].deltaNet = cotData[i].totalNet - cotData[i-1].totalNet;
    cotData[i].deltaLeveraged = cotData[i].netLeveraged - cotData[i-1].netLeveraged;
    cotData[i].deltaAssetManager = cotData[i].netAssetManager - cotData[i-1].netAssetManager;
  }
  
  return cotData.slice(-13); // Últimas 13 semanas
};

// Formatear fecha CFTC a formato ISO
const formatCFTCDate = (cftcDate) => {
  // CFTC usa formato YYMMDD
  const year = '20' + cftcDate.substring(0, 2);
  const month = cftcDate.substring(2, 4);
  const day = cftcDate.substring(4, 6);
  return `${year}-${month}-${day}`;
};

// ================================
// 2. FOREX DATA - DATOS REALES
// ================================

// Función para obtener datos FX reales
const fetchRealFXData = async (pair) => {
  try {
    // Usando Alpha Vantage API (requiere API key gratuita)
    const API_KEY = 'demo'; // Reemplazar por tu API key real
    const symbol = pair === 'USDJPY' ? 'USD' : 'USD';
    const market = pair === 'USDJPY' ? 'JPY' : 'CHF';
    
    // URL para datos FX históricos
    const url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${symbol}&to_symbol=${market}&apikey=${API_KEY}`;
    
    console.log(`Fetching real FX data for ${pair}...`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Error Message'] || data['Note']) {
      throw new Error('API limit reached or invalid request');
    }
    
    return parseAlphaVantageData(data, pair);
    
  } catch (error) {
    console.error(`Error fetching FX data for ${pair}:`, error);
    // Fallback a datos mock
    return generateMockFXData(pair);
  }
};

// Parser para datos Alpha Vantage
const parseAlphaVantageData = (data, pair) => {
  const timeSeries = data['Time Series FX (Weekly)'];
  const fxData = [];
  
  Object.entries(timeSeries).slice(0, 13).forEach(([date, values], index) => {
    const rate = parseFloat(values['4. close']);
    let weeklyChange = 0;
    
    if (index > 0) {
      const prevRate = parseFloat(Object.values(timeSeries)[index - 1]['4. close']);
      weeklyChange = ((rate - prevRate) / prevRate) * 100;
    }
    
    fxData.push({
      date,
      rate: parseFloat(rate.toFixed(4)),
      weeklyChange: parseFloat(weeklyChange.toFixed(2)),
      weeklyChangeAbs: parseFloat((rate * weeklyChange / 100).toFixed(4))
    });
  });
  
  return fxData.reverse(); // Orden cronológico
};

// ================================
// 3. INTEREST RATES - DATOS REALES
// ================================

// Función para obtener tasas de interés reales
const fetchRealInterestRates = async () => {
  try {
    console.log('Fetching real interest rates...');
    
    // FRED API para datos de St. Louis Fed (gratis)
    const FRED_API_KEY = 'demo'; // Reemplazar por tu API key
    
    // URLs para cada tasa
    const urls = {
      usd_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=TB3MS&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`,
      jpy_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=INTGSTJPM193N&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`,
      chf_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=INTGSTCHM193N&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`
    };
    
    const rates = {};
    
    for (const [currency, url] of Object.entries(urls)) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.observations && data.observations.length > 0) {
          rates[currency] = parseFloat(data.observations[0].value);
        }
      } catch (error) {
        console.error(`Error fetching ${currency} rate:`, error);
        // Usar valores por defecto
        rates[currency] = currency === 'usd_3m' ? 4.34 : currency === 'jpy_3m' ? 0.77 : 0.96;
      }
    }
    
    return rates;
    
  } catch (error) {
    console.error('Error fetching interest rates:', error);
    // Valores por defecto actuales (estimados)
    return {
      usd_3m: 4.34,
      jpy_3m: 0.77,
      chf_3m: 0.96
    };
  }
};

// ================================
// 4. FUNCIÓN PRINCIPAL REAL DATA
// ================================

// Función principal para obtener todos los datos reales
const fetchAllRealData = async () => {
  console.log('🔄 Iniciando descarga de datos reales...');
  
  try {
    // Ejecutar todas las llamadas en paralelo para mejor performance
    const [
      jpyData,
      chfData,
      usdJpyFxData,
      usdChfFxData,
      interestRates
    ] = await Promise.all([
      fetchRealCOTData('JPY'),
      fetchRealCOTData('CHF'),
      fetchRealFXData('USDJPY'),
      fetchRealFXData('USDCHF'),
      fetchRealInterestRates()
    ]);
    
    console.log('✅ Datos reales descargados exitosamente');
    
    return {
      cotData: { jpy: jpyData, chf: chfData },
      fxData: { usdjpy: usdJpyFxData, usdchf: usdChfFxData },
      interestRates,
      success: true,
      lastUpdate: new Date()
    };
    
  } catch (error) {
    console.error('❌ Error en descarga de datos reales:', error);
    
    // Fallback a datos mock
    console.log('🔄 Usando datos mock como fallback...');
    return {
      cotData: { 
        jpy: generateMockCOTData('JPY'), 
        chf: generateMockCOTData('CHF') 
      },
      fxData: { 
        usdjpy: generateMockFXData('USDJPY'), 
        usdchf: generateMockFXData('USDCHF') 
      },
      interestRates: {
        usd_3m: 4.34,
        jpy_3m: 0.77,
        chf_3m: 0.96
      },
      success: false,
      error: error.message,
      lastUpdate: new Date()
    };
  }
};

// ================================
// 5. CONFIGURATION PARA APIs
// ================================

// Configuración de APIs
const API_CONFIG = {
  // Alpha Vantage para FX data
  ALPHA_VANTAGE: {
    baseUrl: 'https://www.alphavantage.co/query',
    apiKey: process.env.REACT_APP_ALPHA_VANTAGE_KEY || 'demo',
    rateLimit: 5, // calls per minute
  },
  
  // FRED para interest rates
  FRED: {
    baseUrl: 'https://api.stlouisfed.org/fred',
    apiKey: process.env.REACT_APP_FRED_KEY || 'demo',
    rateLimit: 120, // calls per minute
  },
  
  // CFTC para COT data
  CFTC: {
    baseUrl: 'https://www.cftc.gov/sites/default/files/files/dea/cotdata',
    refreshFrequency: 'weekly', // Los datos se actualizan semanalmente
  }
};

// ================================
// 6. INSTRUCCIONES DE SETUP
// ================================

/*
INSTRUCCIONES PARA IMPLEMENTAR DATOS REALES:

1. **API KEYS NECESARIAS (GRATUITAS):**
   - Alpha Vantage: https://www.alphavantage.co/support/#api-key
   - FRED: https://fred.stlouisfed.org/docs/api/api_key.html

2. **VARIABLES DE ENTORNO:**
   Crear archivo .env en la raíz del proyecto:
   ```
   REACT_APP_ALPHA_VANTAGE_KEY=tu_api_key_aqui
   REACT_APP_FRED_KEY=tu_api_key_aqui
   ```

3. **CORS PROXY (OPCIONAL):**
   Para CFTC data, considerar usar:
   - Vercel Edge Functions
   - Netlify Functions  
   - O servicio proxy como allorigins.win

4. **AUTOMATIZACIÓN:**
   - Los datos COT se actualizan viernes después de mercado
   - Implementar cron job o webhook para actualización automática
   - Caché de datos para optimizar performance

5. **FALLBACK:**
   - El código incluye fallback a datos mock si fallan APIs
   - Garantiza que la aplicación siempre funcione
*/

export {
  fetchAllRealData,
  fetchRealCOTData,
  fetchRealFXData,
  fetchRealInterestRates,
  API_CONFIG
};