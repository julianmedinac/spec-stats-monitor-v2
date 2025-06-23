// api/fx-data.js
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
    const { pair } = req.query;
    
    if (!pair || !['USDJPY', 'USDCHF'].includes(pair)) {
      return res.status(400).json({ error: 'Pair must be USDJPY or USDCHF' });
    }

    // Usar tu API key de Alpha Vantage desde variables de entorno de Vercel
    const API_KEY = process.env.ALPHA_VANTAGE_KEY;
    
    if (!API_KEY) {
      throw new Error('Alpha Vantage API key not configured in Vercel');
    }

    const symbol = 'USD';
    const market = pair === 'USDJPY' ? 'JPY' : 'CHF';
    
    // Llamada real a Alpha Vantage desde backend (sin CORS)
    const url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${symbol}&to_symbol=${market}&apikey=${API_KEY}`;
    
    console.log(`Fetching real FX data for ${pair} from Alpha Vantage`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    if (data['Note']) {
      throw new Error('Alpha Vantage API limit reached');
    }
    
    if (!data['Time Series FX (Weekly)']) {
      throw new Error('Invalid response format from Alpha Vantage');
    }
    
    const parsedData = parseAlphaVantageData(data, pair);
    
    res.status(200).json({
      success: true,
      pair,
      data: parsedData,
      source: 'Alpha Vantage Official',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching FX data:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Parser para datos reales de Alpha Vantage
function parseAlphaVantageData(data, pair) {
  const timeSeries = data['Time Series FX (Weekly)'];
  const fxData = [];
  const entries = Object.entries(timeSeries).slice(0, 13);
  
  entries.forEach(([date, values], index) => {
    const rate = parseFloat(values['4. close']);
    let weeklyChange = 0;
    
    if (index > 0) {
      const prevEntry = entries[index - 1];
      const prevRate = parseFloat(prevEntry[1]['4. close']);
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
}
