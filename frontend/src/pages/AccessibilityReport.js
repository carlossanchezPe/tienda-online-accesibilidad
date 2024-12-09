import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AccessibilityReport = () => {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudit = async () => {
    if (!url.trim()) {
      setError('Por favor, ingrese una URL válida.');
      return;
    }

    setError('');
    setLoading(true);
    setReport(null);

    try {
      const response = await fetch('http://localhost:5000/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la auditoría. Verifique la URL.');
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al realizar la auditoría.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Violaciones', 'Advertencias', 'Correctas'],
    datasets: [
      {
        label: 'Resultados de Accesibilidad',
        data: report
          ? [
              report.violations?.length || 0,
              report.incomplete?.length || 0,
              report.passes?.length || 0,
            ]
          : [0, 0, 0],
        backgroundColor: ['#FF6B6B', '#FFD93D', '#6BCB77'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Resultados de la Auditoría de Accesibilidad' },
    },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Auditoría de Accesibilidad</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Ingrese la URL del sitio"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: '10px',
            width: '70%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleAudit}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Realizar Auditoría
        </button>
      </div>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      {loading && <p>Cargando... Por favor espere.</p>}

      {report && (
        <div>
          <h2>Resultados de la Auditoría</h2>
          <Bar data={chartData} options={chartOptions} />
          <h3>Violaciones</h3>
          <ul>
            {report.violations?.length > 0 ? (
              report.violations.map((violation, index) => (
                <li key={index}>
                  <strong>{violation.id}</strong>: {violation.description} (Impacto: {violation.impact})
                </li>
              ))
            ) : (
              <p>No se encontraron violaciones.</p>
            )}
          </ul>
          <h3>Advertencias</h3>
          <ul>
            {report.incomplete?.length > 0 ? (
              report.incomplete.map((warning, index) => (
                <li key={index}>
                  <strong>{warning.id}</strong>: {warning.description}
                </li>
              ))
            ) : (
              <p>No se encontraron advertencias.</p>
            )}
          </ul>
          <h3>Elementos Correctos</h3>
          <p>{report.passes?.length || 0} elementos cumplen con las pautas de accesibilidad.</p>
        </div>
      )}
    </div>
  );
};

export default AccessibilityReport;
