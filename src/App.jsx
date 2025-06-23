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
                🎯 Monitor Exclusivo de COTs CFTC + Carry Trade Costs - 100% Datos Reales
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
  const [dataError, setDataError] = useState(null);

  // Función para obtener datos COT 100% REALES usando Python + cot-reports
  const fetchRealCOTData = async (currency) => {
    try {
      console.log(`🐍 Fetching 100% REAL COT data for ${currency} using Python cot-reports library...`);
      
      const response = await fetch(`/api/cot-real?currency=${currency}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Error fetching REAL COT data');
      }
      
      console.log(`✅ 100% REAL COT data received for ${currency}:`, {
        records: result.records_count,
        source: result.source,
        timestamp: result.timestamp
      });
      
      // Validar que tenemos datos
      if (!result.data || result.data.length === 0) {
        throw new Error(`No REAL COT data available for ${currency}`);
      }
      
      return result.data;
      
    } catch (error) {
      console.error(`❌ Error fetching 100% REAL COT data for ${currency}:`, error);
      throw new Error(`No se pudieron obtener datos COT 100% REALES para ${currency}: ${error.message}`);
    }
  };

  // Función para obtener datos FX REALES via proxy
  const fetchRealFXData = async (pair) => {
    try {
      console.log(`🌐 Fetching REAL FX data for ${pair} from Alpha Vantage...`);
      
      const response = await fetch(`/api/fx-data?pair=${pair}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Error fetching FX data');
      }
      
      console.log(`✅ REAL FX data received for ${pair}:`, result.data.length, 'records');
      return result.data;
      
    } catch (error) {
      console.error(`❌ Error fetching REAL FX data for ${pair}:`, error);
      throw new Error(`No se pudieron obtener datos FX REALES para ${pair}: ${error.message}`);
    }
  };

  // Función para obtener tasas de interés REALES via proxy
  const fetchRealInterestRates = async () => {
    try {
      console.log('🌐 Fetching REAL interest rates from FRED...');
      
      const response = await fetch('/api/interest-rates');
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Error fetching interest rates');
      }
      
      console.log('✅ REAL interest rates received:', result.rates);
      return result.rates;
      
    } catch (error) {
      console.error('❌ Error fetching REAL interest rates:', error);
      throw new Error(`No se pudieron obtener tasas REALES: ${error.message}`);
    }
  };

  // Función principal para obtener TODOS los datos 100% REALES
  // REEMPLAZAR SOLO LA FUNCIÓN fetchAllData en tu App.jsx

const fetchAllData = async () => {
  setLoading(true);
  setDataError(null);
  
  try {
    console.log('🚀 Iniciando descarga de datos 100% REALES...');
    console.log('📊 Usando endpoints de backend (sin variables de entorno)');
    
    // Para desarrollo local: usar endpoints directos
    const [jpyData, chfData, usdJpyFxData, usdChfFxData, rates] = await Promise.all([
      fetchRealCOTData('JPY'),   // Usará /api/cot-real
      fetchRealCOTData('CHF'),   // Usará /api/cot-real
      fetchRealFXData('USDJPY'), // Usará /api/fx-data
      fetchRealFXData('USDCHF'), // Usará /api/fx-data
      fetchRealInterestRates()   // Usará /api/interest-rates
    ]);
    
    console.log('🎉 TODOS LOS DATOS 100% REALES OBTENIDOS EXITOSAMENTE');
    console.log('📈 COT JPY (CFTC Official):', jpyData.length, 'registros');
    console.log('📈 COT CHF (CFTC Official):', chfData.length, 'registros');
    console.log('💱 FX USDJPY (Alpha Vantage):', usdJpyFxData.length, 'registros');
    console.log('💱 FX USDCHF (Alpha Vantage):', usdChfFxData.length, 'registros');
    console.log('🏦 Interest Rates (FRED):', rates);
    
    // Verificar calidad de datos COT
    if (jpyData.length === 0 || chfData.length === 0) {
      throw new Error('No se recibieron datos COT válidos');
    }
    
    // Actualizar estado con datos 100% REALES
    setCotData({ jpy: jpyData, chf: chfData });
    setFxData({ usdjpy: usdJpyFxData, usdchf: usdChfFxData });
    setInterestRates(rates);
    setLastUpdate(new Date());
    
    // Calcular carry trade costs con datos 100% REALES
    const usdJpyCarryCosts = calculateCarryTradeCost(usdJpyFxData, 'USD', 'JPY', rates);
    const usdChfCarryCosts = calculateCarryTradeCost(usdChfFxData, 'USD', 'CHF', rates);
    
    setCarryTradeCosts({ usdjpy: usdJpyCarryCosts, usdchf: usdChfCarryCosts });
    
    // Generar alertas basadas en datos 100% REALES
    const newAlerts = generateAlerts(jpyData, chfData, usdJpyCarryCosts, usdChfCarryCosts);
    setAlerts(newAlerts);
    
    console.log('✅ Dashboard actualizado con datos 100% REALES de CFTC + Alpha Vantage + FRED');
    
  } catch (error) {
    console.error('💥 ERROR obteniendo datos 100% REALES:', error);
    setDataError(error.message);
    
    setAlerts([{
      currency: 'SYSTEM',
      type: 'error',
      message: `Error obteniendo datos 100% REALES: ${error.message}`,
      severity: 'high',
      category: 'ERROR'
    }]);
  } finally {
    setLoading(false);
  }
};

  const calculateCarryTradeCost = (fxDataArray, baseCurrency, quoteCurrency, rates = interestRates) => {
    const baseRate = baseCurrency === 'USD' ? rates.usd_3m : 
                     baseCurrency === 'JPY' ? rates.jpy_3m : rates.chf_3m;
    const quoteRate = quoteCurrency === 'USD' ? rates.usd_3m : 
                      quoteCurrency === 'JPY' ? rates.jpy_3m : rates.chf_3m;
    
    return fxDataArray.map(item => {
      const interestDifferential = (baseRate - quoteRate) / 52;
      const totalCarryCost = item.weeklyChange + interestDifferential;
      
      return {
        ...item,
        interestDifferential: parseFloat(interestDifferential.toFixed(4)),
        totalCarryCost: parseFloat(totalCarryCost.toFixed(4)),
        baseRate, 
        quoteRate,
        dataSource: '🐍 100% REAL: CFTC (Python) + Alpha Vantage + FRED'
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

  // Componente de Status de Datos
  const DataStatusIndicator = () => {
    const hasError = dataError !== null;
    const hasData = cotData.jpy.length > 0 || cotData.chf.length > 0;
    
    const statusColor = hasError ? 'text-red-600' : hasData ? 'text-green-600' : 'text-yellow-600';
    const StatusIcon = hasError ? WifiOff : hasData ? Wifi : RefreshCw;
    
    let statusText = 'Cargando...';
    if (hasError) {
      statusText = 'Error de Datos';
    } else if (hasData) {
      statusText = '100% Datos Reales CFTC';
    }
    
    return (
      <div className="flex items-center space-x-2">
        <StatusIcon size={16} className={statusColor} />
        <span className={`text-sm font-medium ${statusColor}`}>
          {statusText}
        </span>
        {hasData && !hasError && (
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        )}
      </div>
    );
  };

  // Error de datos
  const DataErrorDisplay = () => {
    if (!dataError) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle size={20} />
          <h3 className="font-bold">❌ Error al Obtener Datos Reales</h3>
        </div>
        <div className="mt-2 text-sm text-red-700">
          <p className="font-medium">{dataError}</p>
          <button
            onClick={fetchAllData}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
          >
            🔄 Reintentar Datos Reales
          </button>
        </div>
      </div>
    );
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
          <p className="text-green-600 font-medium">✅ {data.dataSource}</p>
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
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>Fecha reporte: {data.date}</p>
          <p className="text-green-600 font-medium">✅ CFTC Data 100% Real (Python)</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Errores de datos */}
      <DataErrorDisplay />

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
                Análisis exclusivo para estudiantes de Spec Stats - Solo Datos 100% Reales
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-200">🐍 Datos 100% Reales</p>
              <p className="font-semibold">CFTC + Alpha Vantage + FRED</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <DataStatusIndicator />
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
            <span>{loading ? 'Actualizando...' : 'Actualizar Datos 100% Reales'}</span>
          </button>
        </div>
      </div>

      {/* Panel de Tasas de Interés */}
      <div className="bg-purple-50 p-6 rounded-lg mb-8 border border-purple-200">
        <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>
          <Calculator className="mr-2" size={20} />
          📊 Tasas de Interés 3M Reales (FRED API)
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600">🇺🇸 USD T-Bill 3M</p>
            <p className="text-2xl font-bold" style={{ color: SPEC_STATS_CONFIG.colors.primary }}>
              {interestRates.usd_3m?.toFixed(2)}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600">🇯🇵 JPY TIBOR 3M</p>
            <p className="text-2xl font-bold text-red-600">{interestRates.jpy_3m?.toFixed(2)}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-600">🇨🇭 CHF SARON 3M</p>
            <p className="text-2xl font-bold text-green-600">{interestRates.chf_3m?.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3 flex items-center">
            <AlertTriangle className="mr-2 text-orange-500" size={20} />
            🚨 Alertas de Trading - Spec Stats (Datos 100% Reales)
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
          💰 Costos de Fondeo Carry Trade (Datos 100% Reales)
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
          <h2 className="text-xl font-bold mb-4">💸 Evolución Costos de Carry Trade (Datos 100% Reales)</h2>
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

        {/* Gráfico COT */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">📈 Evolución Posicionamiento Neto COT (CFTC Data 100% Real)</h2>
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
            📚 Guía de Interpretación Spec Stats - ES/NQ Trading (Datos 100% Reales)
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
            🐍 Datos 100% reales: CFTC (Python) + Alpha Vantage + FRED APIs
          </p>
          <p className="text-xs text-green-600 mt-1 font-medium">
            ✅ Solo datos oficiales - Sin simulaciones - 100% Real
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
