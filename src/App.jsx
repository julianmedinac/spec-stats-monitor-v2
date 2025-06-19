import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Download, RefreshCw, Wifi, WifiOff, DollarSign, Calculator, LogOut, User } from 'lucide-react';

// Configuración Spec Stats
const SPEC_STATS_CONFIG = {
  name: "Spec Stats",
  fullName: "Spec Stats Trading Academy",
  tagline: "Monitor Exclusivo COT + Carry Trade",
  colors: {
    primary: "#8B5CF6", // Púrpura
    secondary: "#000000", // Negro
    accent: "#FFFFFF", // Blanco
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444"
  },
  // Emails temporales - reemplazar por los reales después
  authorizedEmails: [
    "admin@specstats.com",
    "test@specstats.com",
    "demo@specstats.com"
    // Agregar emails reales después
  ]
};

// Componente de Logo Spec Stats
const SpecStatsLogo = ({ size = "h-8" }) => (
  <div className={`${size} flex items-center space-x-2`}>
    <div className="relative">
      {/* Logo S */}
      <svg viewBox="0 0 100 120" className={size} fill="none">
        {/* Forma de S */}
        <path 
          d="M20 20 L80 20 Q90 20 90 30 L90 35 Q90 45 80 45 L40 45 Q30 45 30 55 L30 60 Q30 70 40 70 L80 70 Q90 70 90 80 L90 85 Q90 95 80 95 L20 95 Q10 95 10 85 L10 80 Q10 70 20 70 L60 70 Q70 70 70 60 L70 55 Q70 45 60 45 L20 45 Q10 45 10 35 L10 30 Q10 20 20 20 Z" 
          fill={SPEC_STATS_CONFIG.colors.secondary}
        />
        {/* Punto púrpura */}
        <rect 
          x="35" 
          y="100" 
          width="15" 
          height="15" 
          rx="3" 
          fill={SPEC_STATS_CONFIG.colors.primary}
        />
      </svg>
    </div>
    <div className="font-bold text-lg" style={{ color: SPEC_STATS_CONFIG.colors.secondary }}>
      Spec Stats
    </div>
  </div>
);

// Control de Acceso
const AccessControl = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authEmail = localStorage.getItem('spec_stats_auth_email');
    if (authEmail && SPEC_STATS_CONFIG.authorizedEmails.includes(authEmail)) {
      setIsAuthenticated(true);
      setEmail(authEmail);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (SPEC_STATS_CONFIG.authorizedEmails.includes(email.toLowerCase().trim())) {
      setIsAuthenticated(true);
      localStorage.setItem('spec_stats_auth_email', email.toLowerCase().trim());
    } else {
      setError('Email no autorizado. Contacta al administrador de Spec Stats.');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    localStorage.removeItem('spec_stats_auth_email');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-black to-purple-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-gray-100">
          <div className="text-center mb-8">
            <SpecStatsLogo size="h-16" />
            <h1 className="text-3xl font-bold mt-4 mb-2" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>
              {SPEC_STATS_CONFIG.name}
            </h1>
            <p className="text-gray-600 font-medium">
              {SPEC_STATS_CONFIG.tagline}
            </p>
            <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 font-semibold">
                🎯 Monitor Exclusivo de COTs CFTC + Carry Trade Costs
              </p>
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                📧 Email Autorizado:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="tu-email@ejemplo.com"
                required
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 hover:opacity-90"
              style={{ backgroundColor: SPEC_STATS_CONFIG.colors.primary }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verificando...</span>
                </>
              ) : (
                <span>🚀 Acceder al Monitor</span>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Acceso exclusivo para estudiantes autorizados de <strong>Spec Stats</strong>
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              ¿No tienes acceso? Contacta al administrador
            </p>
            <p className="text-xs text-blue-500 text-center mt-2">
              Demo: usa admin@specstats.com o test@specstats.com
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <SpecStatsLogo />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User size={16} />
              <span>{email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

// Componente Principal
const SpecStatsCOTAnalyzer = () => {
  const [cotData, setCotData] = useState({ jpy: [], chf: [] });
  const [fxData, setFxData] = useState({ usdjpy: [], usdchf: [] });
  const [interestRates, setInterestRates] = useState({
    usd_3m: 4.34,
    jpy_3m: 0.77,
    chf_3m: 0.96
  });
  const [carryTradeCosts, setCarryTradeCosts] = useState({ usdjpy: [], usdchf: [] });
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Generar datos mock para demostración
  const generateMockCOTData = (currency) => {
    const data = [];
    const baseDate = new Date();
    
    for (let i = 12; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - (i * 7));
      
      const trend = currency === 'JPY' ? -1 : 1;
      const leveragedLong = Math.floor(Math.random() * 30000) + 20000 + (trend * 5000);
      const leveragedShort = Math.floor(Math.random() * 40000) + 30000 - (trend * 5000);
      const assetManagerLong = Math.floor(Math.random() * 25000) + 15000;
      const assetManagerShort = Math.floor(Math.random() * 20000) + 10000;
      const dealerLong = Math.floor(Math.random() * 50000) + 40000;
      const dealerShort = Math.floor(Math.random() * 60000) + 50000;
      
      const netLeveraged = leveragedLong - leveragedShort;
      const netAssetManager = assetManagerLong - assetManagerShort;
      const netDealer = dealerLong - dealerShort;
      const totalNet = netLeveraged + netAssetManager + netDealer;
      
      data.push({
        date: date.toISOString().split('T')[0],
        leveragedLong, leveragedShort, assetManagerLong, assetManagerShort,
        dealerLong, dealerShort, netLeveraged, netAssetManager, netDealer, totalNet,
        deltaNet: 0, deltaLeveraged: 0, deltaAssetManager: 0
      });
    }
    
    for (let i = 1; i < data.length; i++) {
      data[i].deltaNet = data[i].totalNet - data[i-1].totalNet;
      data[i].deltaLeveraged = data[i].netLeveraged - data[i-1].netLeveraged;
      data[i].deltaAssetManager = data[i].netAssetManager - data[i-1].netAssetManager;
    }
    
    return data;
  };

  const generateMockFXData = (pair) => {
    const data = [];
    const baseDate = new Date();
    let baseRate = pair === 'USDJPY' ? 150.0 : 0.92;
    
    for (let i = 12; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - (i * 7));
      
      const change = (Math.random() - 0.5) * 0.04;
      baseRate *= (1 + change);
      
      data.push({
        date: date.toISOString().split('T')[0],
        rate: parseFloat(baseRate.toFixed(4)),
        weeklyChange: parseFloat((change * 100).toFixed(2)),
        weeklyChangeAbs: parseFloat((baseRate * change).toFixed(4))
      });
    }
    
    return data;
  };

  const calculateCarryTradeCost = (fxDataArray, baseCurrency, quoteCurrency) => {
    const baseRate = baseCurrency === 'USD' ? interestRates.usd_3m : 
                     baseCurrency === 'JPY' ? interestRates.jpy_3m : interestRates.chf_3m;
    const quoteRate = quoteCurrency === 'USD' ? interestRates.usd_3m : 
                      quoteCurrency === 'JPY' ? interestRates.jpy_3m : interestRates.chf_3m;
    
    return fxDataArray.map(item => {
      const interestDifferential = (baseRate - quoteRate) / 52;
      const totalCarryCost = item.weeklyChange + interestDifferential;
      
      return {
        ...item,
        interestDifferential: parseFloat(interestDifferential.toFixed(4)),
        totalCarryCost: parseFloat(totalCarryCost.toFixed(4)),
        baseRate, quoteRate
      };
    });
  };

  const generateAlerts = (jpyData, chfData, jpyCarry, chfCarry) => {
    const alerts = [];
    
    if (jpyData.length > 0) {
      const latestJPY = jpyData[jpyData.length - 1];
      const latestJPYCarry = jpyCarry[jpyCarry.length - 1];
      
      if (Math.abs(latestJPY.deltaNet) > 15000) {
        alerts.push({
          currency: 'JPY', type: latestJPY.deltaNet > 0 ? 'bullish' : 'bearish',
          message: `COT cambio significativo: ${latestJPY.deltaNet > 0 ? '+' : ''}${latestJPY.deltaNet.toLocaleString()}`,
          severity: 'high', category: 'COT'
        });
      }
      
      if (Math.abs(latestJPYCarry.totalCarryCost) > 2.0) {
        alerts.push({
          currency: 'JPY', type: latestJPYCarry.totalCarryCost > 0 ? 'expensive' : 'cheap',
          message: `Carry cost extremo: ${latestJPYCarry.totalCarryCost.toFixed(2)}%`,
          severity: latestJPYCarry.totalCarryCost > 3 ? 'high' : 'medium', category: 'CARRY'
        });
      }
    }
    
    if (chfData.length > 0) {
      const latestCHF = chfData[chfData.length - 1];
      const latestCHFCarry = chfCarry[chfCarry.length - 1];
      
      if (Math.abs(latestCHF.deltaNet) > 15000) {
        alerts.push({
          currency: 'CHF', type: latestCHF.deltaNet > 0 ? 'bullish' : 'bearish',
          message: `COT cambio significativo: ${latestCHF.deltaNet > 0 ? '+' : ''}${latestCHF.deltaNet.toLocaleString()}`,
          severity: 'high', category: 'COT'
        });
      }
      
      if (Math.abs(latestCHFCarry.totalCarryCost) > 2.0) {
        alerts.push({
          currency: 'CHF', type: latestCHFCarry.totalCarryCost > 0 ? 'expensive' : 'cheap',
          message: `Carry cost extremo: ${latestCHFCarry.totalCarryCost.toFixed(2)}%`,
          severity: latestCHFCarry.totalCarryCost > 3 ? 'high' : 'medium', category: 'CARRY'
        });
      }
    }
    
    return alerts;
  };

  const fetchAllData = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const jpyData = generateMockCOTData('JPY');
      const chfData = generateMockCOTData('CHF');
      const usdJpyFxData = generateMockFXData('USDJPY');
      const usdChfFxData = generateMockFXData('USDCHF');
      const usdJpyCarryCosts = calculateCarryTradeCost(usdJpyFxData, 'USD', 'JPY');
      const usdChfCarryCosts = calculateCarryTradeCost(usdChfFxData, 'USD', 'CHF');
      
      setCotData({ jpy: jpyData, chf: chfData });
      setFxData({ usdjpy: usdJpyFxData, usdchf: usdChfFxData });
      setCarryTradeCosts({ usdjpy: usdJpyCarryCosts, usdchf: usdChfCarryCosts });
      setLastUpdate(new Date());
      
      const newAlerts = generateAlerts(jpyData, chfData, usdJpyCarryCosts, usdChfCarryCosts);
      setAlerts(newAlerts);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const formatNumber = (num) => num?.toLocaleString() || '0';
  const formatPercent = (num) => `${num > 0 ? '+' : ''}${num?.toFixed(2)}%` || '0.00%';
  const getLatestData = (currency) => {
    const data = cotData[currency.toLowerCase()];
    return data && data.length > 0 ? data[data.length - 1] : null;
  };
  const getLatestCarryData = (pair) => {
    const data = carryTradeCosts[pair];
    return data && data.length > 0 ? data[data.length - 1] : null;
  };

  const CarryTradeCard = ({ pair, data, title }) => {
    if (!data) return null;
    
    const costColor = data.totalCarryCost > 0 ? 'text-red-600' : 'text-green-600';
    const CostIcon = data.totalCarryCost > 0 ? TrendingUp : TrendingDown;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderColor: SPEC_STATS_CONFIG.colors.primary }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <div className="flex items-center space-x-2">
            <CostIcon className={costColor.replace('text-', 'text-')} size={20} />
            <span className={`text-sm font-semibold ${costColor}`}>
              {formatPercent(data.totalCarryCost)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Spot Rate</p>
            <p className="text-lg font-bold">{data.rate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cambio Semanal</p>
            <p className={`text-lg font-bold ${data.weeklyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(data.weeklyChange)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Diferencial Tasas</p>
            <p className="text-lg font-bold">{formatPercent(data.interestDifferential)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Costo Total Carry</p>
            <p className={`text-lg font-bold ${costColor}`}>
              {formatPercent(data.totalCarryCost)}
            </p>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>Base: {data.baseRate?.toFixed(2)}% | Quote: {data.quoteRate?.toFixed(2)}%</p>
          <p>Fecha: {data.date}</p>
        </div>
      </div>
    );
  };

  const CurrencyCard = ({ currency, data }) => {
    if (!data) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderColor: SPEC_STATS_CONFIG.colors.primary }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{currency}</h3>
          <div className="flex items-center space-x-2">
            {data.deltaNet > 0 ? (
              <TrendingUp className="text-green-500" size={20} />
            ) : (
              <TrendingDown className="text-red-500" size={20} />
            )}
            <span className={`text-sm font-semibold ${data.deltaNet > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.deltaNet > 0 ? '+' : ''}{formatNumber(data.deltaNet)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Posición Neta Total</p>
            <p className="text-lg font-bold">{formatNumber(data.totalNet)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Delta Semanal</p>
            <p className={`text-lg font-bold ${data.deltaNet > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.deltaNet > 0 ? '+' : ''}{formatNumber(data.deltaNet)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Non-Commercial Neto</p>
            <p className="text-lg font-bold">{formatNumber(data.netLeveraged)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Other Reportable Neto</p>
            <p className="text-lg font-bold">{formatNumber(data.netAssetManager)}</p>
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          Fecha reporte: {data.date}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header personalizado Spec Stats */}
      <div className="mb-8">
        <div 
          className="rounded-lg p-6 mb-6 text-white"
          style={{ background: `linear-gradient(135deg, ${SPEC_STATS_CONFIG.colors.primary} 0%, ${SPEC_STATS_CONFIG.colors.secondary} 100%)` }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Monitor COT + Carry Trade</h1>
              <p className="text-purple-100">
                Análisis exclusivo para estudiantes de Spec Stats
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-200">Acceso Exclusivo</p>
              <p className="font-semibold">JPY & CHF Trading Signals</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-purple-600">
              <Wifi size={16} />
              <span className="text-sm">Modo Demo - Spec Stats</span>
            </div>
            {lastUpdate && (
              <p className="text-sm text-gray-600">
                Última actualización: {lastUpdate.toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={fetchAllData}
            disabled={loading}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition duration-200"
            style={{ backgroundColor: SPEC_STATS_CONFIG.colors.primary }}
          >
            <RefreshCw className={`${loading ? 'animate-spin' : ''}`} size={16} />
            <span>{loading ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        </div>
      </div>

      {/* Panel de Tasas de Interés */}
      <div className="bg-purple-50 p-6 rounded-lg mb-8 border border-purple-200">
        <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>
          <Calculator className="mr-2" size={20} />
          📊 Tasas de Interés 3M Actuales
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600">🇺🇸 USD T-Bill 3M</p>
            <p className="text-2xl font-bold" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>
              {interestRates.usd_3m}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600">🇯🇵 JPY TIBOR 3M</p>
            <p className="text-2xl font-bold text-red-600">{interestRates.jpy_3m}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600">🇨🇭 CHF SARON 3M</p>
            <p className="text-2xl font-bold text-green-600">{interestRates.chf_3m}%</p>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 flex items-center">
            <AlertTriangle className="mr-2 text-orange-500" size={20} />
            🚨 Alertas de Trading - Spec Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-400' : 
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-400' : 
                'bg-green-50 border-green-400'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg">{alert.currency}</p>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <span 
                    className="px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: alert.category === 'COT' ? SPEC_STATS_CONFIG.colors.primary : SPEC_STATS_CONFIG.colors.secondary }}
                  >
                    {alert.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cards de Carry Trade */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <DollarSign className="mr-2 text-green-500" size={20} />
          💰 Costos de Fondeo Carry Trade (Semanal)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CarryTradeCard 
            pair="usdjpy" 
            data={getLatestCarryData('usdjpy')} 
            title="USD/JPY Carry Cost" 
          />
          <CarryTradeCard 
            pair="usdchf" 
            data={getLatestCarryData('usdchf')} 
            title="USD/CHF Carry Cost" 
          />
        </div>
      </div>

      {/* Cards de COT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CurrencyCard currency="JPY" data={getLatestData('jpy')} />
        <CurrencyCard currency="CHF" data={getLatestData('chf')} />
      </div>

      {/* Gráficos */}
      <div className="space-y-8">
        {/* Gráfico de Costos de Carry Trade */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">💸 Evolución Costos de Carry Trade</h2>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis yAxisId="left" label={{ value: 'Costo %', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'FX Rate', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value, name) => [
                  name.includes('Rate') ? value : `${value}%`, 
                  name
                ]}
              />
              <Legend />
              <Area 
                yAxisId="left"
                data={carryTradeCosts.usdjpy}
                type="monotone" 
                dataKey="totalCarryCost" 
                fill="#8884d8" 
                fillOpacity={0.3}
                stroke="#8884d8"
                strokeWidth={2}
                name="USD/JPY Carry Cost %" 
              />
              <Area 
                yAxisId="left"
                data={carryTradeCosts.usdchf}
                type="monotone" 
                dataKey="totalCarryCost" 
                fill="#82ca9d" 
                fillOpacity={0.3}
                stroke="#82ca9d"
                strokeWidth={2}
                name="USD/CHF Carry Cost %" 
              />
              <Line 
                yAxisId="right"
                data={fxData.usdjpy}
                type="monotone" 
                dataKey="rate" 
                stroke="#ff7300" 
                strokeWidth={1}
                strokeDasharray="5 5"
                name="USD/JPY Rate"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico tradicional COT */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">📈 Evolución Posicionamiento Neto COT</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                domain={['dataMin', 'dataMax']}
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value, name) => [formatNumber(value), name]}
              />
              <Legend />
              <Line 
                data={cotData.jpy}
                type="monotone" 
                dataKey="totalNet" 
                stroke={SPEC_STATS_CONFIG.colors.primary}
                strokeWidth={2}
                name="JPY Net"
                dot={{ r: 4 }}
              />
              <Line 
                data={cotData.chf}
                type="monotone" 
                dataKey="totalNet" 
                stroke={SPEC_STATS_CONFIG.colors.secondary}
                strokeWidth={2}
                name="CHF Net"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Panel Educativo para Spec Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-gray-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-bold mb-4" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>
            📚 Guía de Interpretación Spec Stats - ES/NQ Trading
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-600 mb-2">✅ Señales Alcistas ES/NQ</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• JPY carry cost bajo (-2% o menos)</li>
                <li>• CHF posiciones short aumentando</li>
                <li>• COT non-commercial vendiendo JPY</li>
                <li>• Diferencial tasas USD-JPY amplio</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-600 mb-2">⚠️ Señales de Risk-Off</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Carry cost JPY extremo (+3% o más)</li>
                <li>• Unwind masivo CHF (delta >20K)</li>
                <li>• Flight-to-safety hacia JPY/CHF</li>
                <li>• Volatilidad FX aumentando</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: SPEC_STATS_CONFIG.colors.primary }}>
              <h4 className="font-bold mb-2" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>🎯 Estrategias Spec Stats</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Monitor carry cost para timing</li>
                <li>• COT como confirmación dirección</li>
                <li>• Hedge con VIX en unwinds</li>
                <li>• Stop loss ajustados en volatilidad FX</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spec Stats */}
      <div className="mt-8 p-6 rounded-lg border" style={{ backgroundColor: '#F8F7FF', borderColor: SPEC_STATS_CONFIG.colors.primary }}>
        <div className="text-center">
          <SpecStatsLogo size="h-8" />
          <p className="text-sm text-gray-600 mt-2">
            Monitor exclusivo COT + Carry Trade para estudiantes de <strong>Spec Stats</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Datos en tiempo real de CFTC | Análisis profesional para trading ES/NQ
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente principal con control de acceso
const SpecStatsApp = () => {
  return (
    <AccessControl>
      <SpecStatsCOTAnalyzer />
    </AccessControl>
  );
};

export default SpecStatsApp;
