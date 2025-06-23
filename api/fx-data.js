export default async function handler(req, res) {
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

    const API_KEY = process.env.ALPHA_VANTAGE_KEY;
    
    if (!API_KEY) {
      throw new Error('Alpha Vantage API key not configured');
    }

    const symbol = 'USD';
    const market = pair === 'USDJPY' ? 'JPY' : 'CHF';
    const url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${symbol}&to_symbol=${market}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    if (data['Note']) {
      throw new Error('Alpha Vantage API limit reached');
    }
    
    if (!data['Time Series FX (Weekly)']) {
      throw new Error('Invalid response format');
    }
    
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
    
    res.status(200).json({
      success: true,
      pair,
      data: fxData.reverse(),
      source: 'Alpha Vantage Official',
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
