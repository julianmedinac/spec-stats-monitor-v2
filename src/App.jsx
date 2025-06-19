import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, RefreshCw, Wifi, DollarSign, Calculator, LogOut, User } from 'lucide-react';

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
  // Emails autorizados - personalizar con los reales
  authorizedEmails: [
    "admin@specstats.com",
    "test@specstats.com",
    "demo@specstats.com",
    "estudiante1@specstats.com",
    "estudiante2@specstats.com"
    // Agregar más emails de tu comunidad aquí
  ]
};

// Componente de Logo Spec Stats
const SpecStatsLogo = ({ size = "h-8" }) => (
  <div className={`${size} flex items-center space-x-2`}>
    <div className="relative">
      <svg viewBox="0 0 100 120" className={size} fill="none">
        <path 
          d="M20 20 L80 20 Q90 20 90 30 L90 35 Q90 45 80 45 L40 45 Q30 45 30 55 L30 60 Q30 70 40 70 L80 70 Q90 70 90 80 L90 85 Q90 95 80 95 L20 95 Q10 95 10 85 L10 80 Q10 70 20 70 L60 70 Q70 70 70 60 L70 55 Q70 45 60 45 L20 45 Q10 45 10 35 L10 30 Q10 20 20 20 Z" 
          fill={SPEC_STATS_CONFIG.colors.secondary}
        />
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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #8B5CF6 0%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          maxWidth: '450px',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <SpecStatsLogo size="h-16" />
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: SPEC_STATS_CONFIG.colors.primary,
              margin: '20px 0 10px 0'
            }}>
              {SPEC_STATS_CONFIG.name}
            </h1>
            <p style={{ color: '#6B7280', fontWeight: '500' }}>
              {SPEC_STATS_CONFIG.tagline}
            </p>
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#F3F4F6',
              borderRadius: '10px',
              border: `2px solid ${SPEC_STATS_CONFIG.colors.primary}20`
            }}>
              <p style={{ 
                fontSize: '0.9rem', 
                color: SPEC_STATS_CONFIG.colors.primary,
                fontWeight: '600'
              }}>
                🎯 Monitor Exclusivo de COTs CFTC + Carry Trade Costs
              </p>
            </div>
          </div>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#374151', 
                fontSize: '0.9rem', 
                fontWeight: '600', 
                marginBottom: '8px' 
              }}>
                📧 Email Autorizado:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="tu-email@ejemplo.com"
                required
                disabled={isLoading}
                onFocus={(e) => e.target.style.borderColor = SPEC_STATS_CONFIG.colors.primary}
                onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
              />
            </div>
            
            {error && (
              <div style={{
                padding: '12px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <p style={{ color: '#DC2626', fontSize: '0.9rem', fontWeight: '500' }}>{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: SPEC_STATS_CONFIG.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#7C3AED')}
              onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = SPEC_STATS_CONFIG.colors.primary)}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span>Verificando...</span>
                </>
              ) : (
                <span>🚀 Acceder al Monitor</span>
              )}
            </button>
          </form>
          
          <div style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              Acceso exclusivo para estudiantes autorizados de <strong>Spec Stats</strong>
            </p>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '5px' }}>
              ¿No tienes acceso? Contacta al administrador
            </p>
            <p style={{ fontSize: '0.75rem', color: SPEC_STATS_CONFIG.colors.primary, marginTop: '10px' }}>
              Demo: usa admin@specstats.com o test@specstats.com
            </p>
          </div>
        </div>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #E5E7EB',
        padding: '12px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <SpecStatsLogo />
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#6B7280' }}>
              <User size={16} />
              <span>{email}</span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.9rem',
                color: SPEC_STATS_CONFIG.colors.primary,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
              onMouseOver={(e) => e.target.style.color = '#7C3AED'}
              onMouseOut={(e) => e.target.style.color = SPEC_STATS_CONFIG.colors.primary}
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

// Componente Principal del Monitor
const SpecStatsCOTAnalyzer = () => {
  const [cotData, setCotData] = useState({ jpy: [], chf: [] });
  const [fxData, setFxData] = useState({ usdjpy: [], usdchf: [] });
  const [interestRates, setInterestRates] = useState({
    usd_3m: 4.34, // T-Bill 3M actual
    jpy_3m: 0.77, // TIBOR 3M actual
    chf_3m: 0.96  // SARON aprox 3M
  });
  const [carryTradeCosts, setCarryTradeCosts] = useState({ usdjpy: [], usdchf: [] });
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // Generar datos mock realistas para demostración
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
    
    // Calcular deltas
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
      
      const change = (Math.random() - 0.5) * 0.04; // ±2% volatilidad semanal
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
      const interestDifferential = (baseRate - quoteRate) / 52; // Semanal
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
    
    const costColor = data.totalCarryCost > 0 ? '#EF4444' : '#10B981';
    const CostIcon = data.totalCarryCost > 0 ? TrendingUp : TrendingDown;
    
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '24px',
        borderLeft: `4px solid ${SPEC_STATS_CONFIG.colors.primary}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1F2937' }}>{title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CostIcon size={20} color={costColor} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: costColor }}>
              {formatPercent(data.totalCarryCost)}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Spot Rate</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{data.rate}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Cambio Semanal</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: data.weeklyChange > 0 ? '#10B981' : '#EF4444' }}>
              {formatPercent(data.weeklyChange)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Diferencial Tasas</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{formatPercent(data.interestDifferential)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Costo Total Carry</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: costColor }}>
              {formatPercent(data.totalCarryCost)}
            </p>
          </div>
        </div>
        
        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
          <p>Base: {data.baseRate?.toFixed(2)}% | Quote: {data.quoteRate?.toFixed(2)}%</p>
          <p>Fecha: {data.date}</p>
        </div>
      </div>
    );
  };

  const CurrencyCard = ({ currency, data }) => {
    if (!data) return null;
    
    const deltaColor = data.deltaNet > 0 ? '#10B981' : '#EF4444';
    const DeltaIcon = data.deltaNet > 0 ? TrendingUp : TrendingDown;
    
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '24px',
        borderLeft: `4px solid ${SPEC_STATS_CONFIG.colors.primary}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1F2937' }}>{currency}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DeltaIcon size={20} color={deltaColor} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: deltaColor }}>
              {data.deltaNet > 0 ? '+' : ''}{formatNumber(data.deltaNet)}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Posición Neta Total</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{formatNumber(data.totalNet)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Delta Semanal</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: deltaColor }}>
              {data.deltaNet > 0 ? '+' : ''}{formatNumber(data.deltaNet)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Non-Commercial</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{formatNumber(data.netLeveraged)}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Other Reportable</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{formatNumber(data.netAssetManager)}</p>
          </div>
        </div>
        
        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
          Fecha reporte: {data.date}
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header personalizado Spec Stats */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${SPEC_STATS_CONFIG.colors.primary} 0%, ${SPEC_STATS_CONFIG.colors.secondary} 100%)`,
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '20px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: SPEC_STATS_CONFIG.colors.primary }}>
              <Wifi size={16} />
              <span style={{ fontSize: '0.9rem' }}>Demo - Spec Stats</span>
            </div>
            {lastUpdate && (
              <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: 0 }}>
                Última actualización: {lastUpdate.toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={fetchAllData}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: SPEC_STATS_CONFIG.colors.primary,
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s',
              fontWeight: '500'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#7C3AED')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = SPEC_STATS_CONFIG.colors.primary)}
          >
            <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            <span>{loading ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        </div>
      </div>

      {/* Panel de Tasas de Interés Actuales */}
      <div style={{
        backgroundColor: '#F3F4F6',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: `2px solid ${SPEC_STATS_CONFIG.colors.primary}20`
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: SPEC_STATS_CONFIG.colors.primary,
          margin: '0 0 20px 0'
        }}>
          <Calculator size={20} />
          📊 Tasas de Interés 3M Actuales
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 8px 0' }}>🇺🇸 USD T-Bill 3M</p>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: SPEC_STATS_CONFIG.colors.primary,
              margin: 0
            }}>
              {interestRates.usd_3m}%
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 8px 0' }}>🇯🇵 JPY TIBOR 3M</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EF4444', margin: 0 }}>
              {interestRates.jpy_3m}%
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: '0 0 8px 0' }}>🇨🇭 CHF SARON 3M</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981', margin: 0 }}>
              {interestRates.chf_3m}%
            </p>
          </div>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
            Diferencial USD-JPY: <span style={{ fontWeight: 'bold', color: SPEC_STATS_CONFIG.colors.primary }}>
              {(interestRates.usd_3m - interestRates.jpy_3m).toFixed(2)}%
            </span> | 
            Diferencial USD-CHF: <span style={{ fontWeight: 'bold', color: SPEC_STATS_CONFIG.colors.primary }}>
              {(interestRates.usd_3m - interestRates.chf_3m).toFixed(2)}%
            </span>
          </p>
        </div>
      </div>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 0 15px 0'
          }}>
            <AlertTriangle size={20} color="#F59E0B" />
            🚨 Alertas de Trading - Spec Stats
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {alerts.map((alert, index) => (
              <div key={index} style={{
                padding: '16px',
                borderRadius: '8px',
                borderLeft: `4px solid ${alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#10B981'}`,
                backgroundColor: alert.severity === 'high' ? '#FEF2F2' : alert.severity === 'medium' ? '#FFFBEB' : '#F0FDF4'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.125rem', margin: '0 0 8px 0' }}>{alert.currency}</p>
                    <p style={{ fontSize: '0.875rem', margin: 0 }}>{alert.message}</p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: alert.category === 'COT' ? SPEC_STATS_CONFIG.colors.primary : SPEC_STATS_CONFIG.colors.secondary
                  }}>
                    {alert.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cards de Carry Trade */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '0 0 15px 0'
        }}>
          <DollarSign size={20} color="#10B981" />
          💰 Costos de Fondeo Carry Trade (Semanal)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <CurrencyCard currency="JPY" data={getLatestData('jpy')} />
        <CurrencyCard currency="CHF" data={getLatestData('chf')} />
      </div>

      {/* Gráficos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Gráfico de Costos de Carry Trade */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', margin: '0 0 20px 0' }}>
            💸 Evolución Costos de Carry Trade
          </h2>
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
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', margin: '0 0 20px 0' }}>
            📈 Evolución Posicionamiento Neto COT
          </h2>
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
                strokeWidth={3}
                name="JPY Net"
                dot={{ r: 4 }}
              />
              <Line 
                data={cotData.chf}
                type="monotone" 
                dataKey="totalNet" 
                stroke={SPEC_STATS_CONFIG.colors.secondary}
                strokeWidth={3}
                name="CHF Net"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Deltas COT */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px', margin: '0 0 20px 0' }}>
            🔄 Cambios Semanales COT (Delta) - Carry Trade Signals
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value, name) => [formatNumber(value), name]}
              />
              <Legend />
              <Bar 
                data={cotData.jpy}
                dataKey="deltaNet" 
                fill={SPEC_STATS_CONFIG.colors.primary}
                name="JPY Delta"
                opacity={0.8}
              />
              <Bar 
                data={cotData.chf}
                dataKey="deltaNet" 
                fill="#EF4444"
                name="CHF Delta"
                opacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Panel Educativo para Spec Stats */}
        <div style={{
          background: 'linear-gradient(to right, #F3E8FF, #F9FAFB)',
          padding: '24px',
          borderRadius: '12px',
          border: `2px solid ${SPEC_STATS_CONFIG.colors.primary}30`
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: SPEC_STATS_CONFIG.colors.primary,
            margin: '0 0 20px 0'
          }}>
            📚 Guía de Interpretación Spec Stats - ES/NQ Trading
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '0.875rem' }}>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '2px solid #10B981' }}>
              <h4 style={{ fontWeight: 'bold', color: '#10B981', marginBottom: '10px', margin: '0 0 10px 0' }}>
                ✅ Señales Alcistas ES/NQ
              </h4>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151' }}>
                <li style={{ marginBottom: '4px' }}>JPY carry cost bajo (-2% o menos)</li>
                <li style={{ marginBottom: '4px' }}>CHF posiciones short aumentando</li>
                <li style={{ marginBottom: '4px' }}>COT non-commercial vendiendo JPY</li>
                <li style={{ marginBottom: '4px' }}>Diferencial tasas USD-JPY amplio</li>
              </ul>
            </div>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: '2px solid #EF4444' }}>
              <h4 style={{ fontWeight: 'bold', color: '#EF4444', marginBottom: '10px', margin: '0 0 10px 0' }}>
                ⚠️ Señales de Risk-Off
              </h4>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151' }}>
                <li style={{ marginBottom: '4px' }}>Carry cost JPY extremo (+3% o más)</li>
                <li style={{ marginBottom: '4px' }}>Unwind masivo CHF (delta >20K)</li>
                <li style={{ marginBottom: '4px' }}>Flight-to-safety hacia JPY/CHF</li>
                <li style={{ marginBottom: '4px' }}>Volatilidad FX aumentando</li>
              </ul>
            </div>
            <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', border: `2px solid ${SPEC_STATS_CONFIG.colors.primary}` }}>
              <h4 style={{ fontWeight: 'bold', color: SPEC_STATS_CONFIG.colors.primary, marginBottom: '10px', margin: '0 0 10px 0' }}>
                🎯 Estrategias Spec Stats
              </h4>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151' }}>
                <li style={{ marginBottom: '4px' }}>Monitor carry cost para timing</li>
                <li style={{ marginBottom: '4px' }}>COT como confirmación dirección</li>
                <li style={{ marginBottom: '4px' }}>Hedge con VIX en unwinds</li>
                <li style={{ marginBottom: '4px' }}>Stop loss ajustados en volatilidad FX</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spec Stats */}
      <div style={{
        marginTop: '30px',
        padding: '24px',
        borderRadius: '12px',
        border: `2px solid ${SPEC_STATS_CONFIG.colors.primary}`,
        backgroundColor: '#FEFBFF'
      }}>
        <div style={{ textAlign: 'center' }}>
          <SpecStatsLogo size="h-8" />
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '10px', margin: '10px 0 5px 0' }}>
            Monitor exclusivo COT + Carry Trade para estudiantes de <strong>Spec Stats</strong>
          </p>
          <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: 0 }}>
            Datos profesionales de CFTC | Análisis para trading ES/NQ | Versión Completa ✅
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const SpecStatsApp = () => {
  return (
    <AccessControl>
      <SpecStatsCOTAnalyzer />
    </AccessControl>
  );
};

export default SpecStatsApp;
