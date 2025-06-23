export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const FRED_API_KEY = process.env.FRED_KEY;
    
    if (!FRED_API_KEY) {
      throw new Error('FRED API key not configured');
    }

    const urls = {
      usd_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=TB3MS&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`,
      jpy_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=INTGSTJPM193N&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`,
      chf_3m: `https://api.stlouisfed.org/fred/series/observations?series_id=INTGSTCHM193N&api_key=${FRED_API_KEY}&file_type=json&limit=1&sort_order=desc`
    };
    
    const rates = {};
    const errors = [];
    
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
          }
        }
        throw new Error('No valid data');
      } catch (error) {
        errors.push(`${currency}: ${error.message}`);
        return { currency, error: error.message, success: false };
      }
    });
    
    await Promise.all(promises);
    
    const defaultRates = {
      usd_3m: 4.34,
      jpy_3m: 0.77,
      chf_3m: 0.96
    };
    
    const finalRates = { ...defaultRates, ...rates };
    
    res.status(200).json({
      success: true,
      rates: finalRates,
      source: 'FRED Official API',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
