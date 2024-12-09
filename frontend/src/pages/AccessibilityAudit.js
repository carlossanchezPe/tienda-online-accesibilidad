import React, { useState } from 'react';
import jsPDF from 'jspdf';

const AccessibilityAudit = () => {
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

  const downloadReport = () => {
    if (!report) {
      alert('No hay datos de auditoría disponibles para descargar.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Reporte de Accesibilidad', 10, 10);
    doc.text(JSON.stringify(report, null, 2), 10, 20);
    doc.save('reporte-accesibilidad.pdf');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Auditoría de Accesibilidad</h1>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Ingrese la URL del sitio"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-md"
        />
        <button
          onClick={handleAudit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Realizar Auditoría
        </button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Cargando... Por favor espere.</p>}
      {report && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Resultados de la Auditoría</h2>
          <p>
            Violaciones: {report.violations.length} <br />
            Advertencias: {report.incomplete.length} <br />
            Correctos: {report.passes.length}
          </p>
          <ul>
            {report.violations.map((violation, index) => (
              <li key={index} className="text-red-500">
                {violation.id}: {violation.description}
              </li>
            ))}
          </ul>
          <button
            onClick={downloadReport}
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Descargar Reporte
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityAudit;
