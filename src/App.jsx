import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            Spec Stats
          </h1>
          <p className="text-gray-600 mb-4">
            Monitor COT + Carry Trade
          </p>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 font-semibold">
              ✅ ¡Funcionando correctamente!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Deploy exitoso en Vercel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
