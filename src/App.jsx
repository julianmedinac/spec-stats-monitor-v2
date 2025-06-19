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
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Generar datos mock para demostración
  const generateMockCOTData = (currency) => {
    const data = [];
    const baseDate = new Date();
    
    for (let i = 12; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - (i * 7));
      
      const trend = currency === 'JPY' ? -1 : 1;
      const totalNet = Math.floor(Math.random() * 50000) + (trend * 10000);
      
      data.push({
        date: date.toISOString().split('T')[0],
        totalNet,
        deltaNet: i > 0 ? Math.floor(Math.random() * 20000) - 10000 : 0
      });
    }
    
    return data;
  };

  const fetchAllData = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const jpyData = generateMockCOTData('JPY');
      const chfData = generateMockCOTData('CHF');
      
      setCotData({ jpy: jpyData, chf: chfData });
      setLastUpdate(new Date());
      
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
              <span className="text-sm">Demo - Spec Stats</span>
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

      {/* Cards básicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderColor: SPEC_STATS_CONFIG.colors.primary }}>
          <h3 className="text-xl font-bold text-gray-800">JPY</h3>
          <p className="text-2xl font-bold mt-2">
            {cotData.jpy.length > 0 ? formatNumber(cotData.jpy[cotData.jpy.length - 1]?.totalNet) : 'Cargando...'}
          </p>
          <p className="text-sm text-gray-600">Posición Neta Total</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderColor: SPEC_STATS_CONFIG.colors.primary }}>
          <h3 className="text-xl font-bold text-gray-800">CHF</h3>
          <p className="text-2xl font-bold mt-2">
            {cotData.chf.length > 0 ? formatNumber(cotData.chf[cotData.chf.length - 1]?.totalNet) : 'Cargando...'}
          </p>
          <p className="text-sm text-gray-600">Posición Neta Total</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 p-6 rounded-lg border" style={{ backgroundColor: '#F8F7FF', borderColor: SPEC_STATS_CONFIG.colors.primary }}>
        <div className="text-center">
          <SpecStatsLogo size="h-8" />
          <p className="text-sm text-gray-600 mt-2">
            Monitor exclusivo COT + Carry Trade para estudiantes de <strong>Spec Stats</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ¡Funcionando! 🎉 - Próxima versión con gráficos completos
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
