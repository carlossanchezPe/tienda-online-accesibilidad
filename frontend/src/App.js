import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AccessibilityAudit from './pages/AccessibilityAudit';

function App() {
  // Estados para alto contraste y zoom ajustable
  const [highContrast, setHighContrast] = useState(false);
  const [zoom, setZoom] = useState(1); // Estado para ajustar el zoom

  // Funciones para manejar el zoom
  const increaseZoom = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Máximo 2x
  const decreaseZoom = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Mínimo 0.5x
  const resetZoom = () => setZoom(1); // Restablecer al zoom estándar

  return (
    <div
      className={highContrast ? 'high-contrast' : ''}
      style={{ fontSize: `${zoom}em` }} // Aplica el zoom dinámicamente
    >
      <Router>
        <header
          style={{
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: highContrast ? '#000' : '#007BFF',
            color: highContrast ? 'yellow' : '#fff',
          }}
        >
          <h1>Mi Tienda</h1>
          <div>
            {/* Botón para ir al reporte de accesibilidad */}
            <Link to="/audit">
              <button
                style={{
                  padding: '10px',
                  marginRight: '10px',
                  backgroundColor: highContrast ? '#ffc107' : '#6c757d',
                  color: highContrast ? '#000' : '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Ver Reporte
              </button>
            </Link>

            {/* Botón para alternar modo alto contraste */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              style={{
                padding: '10px',
                marginRight: '10px',
                backgroundColor: highContrast ? 'yellow' : '#28a745',
                color: highContrast ? 'black' : '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {highContrast ? 'Modo Estándar' : 'Modo Alto Contraste'}
            </button>

            {/* Botones de zoom */}
            <button
              onClick={decreaseZoom}
              style={{
                padding: '10px',
                marginRight: '5px',
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              aria-label="Disminuir zoom"
            >
              -
            </button>
            <button
              onClick={increaseZoom}
              style={{
                padding: '10px',
                marginRight: '5px',
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              aria-label="Aumentar zoom"
            >
              +
            </button>
            <button
              onClick={resetZoom}
              style={{
                padding: '10px',
                backgroundColor: '#17a2b8',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              aria-label="Restablecer zoom"
            >
              Restablecer
            </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/audit" element={<AccessibilityAudit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
