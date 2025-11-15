import { Booking, User } from '@/types';
import { serviceTypes } from './mockData';

export function generateInvoicePDF(booking: Booking, client: User, worker: User) {
  // Create a simple HTML invoice
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Boleta - CasaLimpia</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2563eb;
          margin: 0;
        }
        .section {
          margin-bottom: 25px;
        }
        .section h2 {
          color: #333;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
        }
        .label {
          font-weight: bold;
          color: #666;
        }
        .total {
          background: #f0f9ff;
          padding: 15px;
          margin-top: 20px;
          border-radius: 5px;
        }
        .total-amount {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✨ CasaLimpia</h1>
        <p>Boleta de Servicio</p>
        <p><strong>N° ${booking.id}</strong></p>
      </div>

      <div class="section">
        <h2>Información del Cliente</h2>
        <div class="info-row">
          <span class="label">Nombre:</span>
          <span>${client.name}</span>
        </div>
        <div class="info-row">
          <span class="label">Correo:</span>
          <span>${client.email}</span>
        </div>
        <div class="info-row">
          <span class="label">Teléfono:</span>
          <span>${client.phone}</span>
        </div>
        <div class="info-row">
          <span class="label">Dirección:</span>
          <span>${booking.address}, ${booking.comuna}</span>
        </div>
      </div>

      <div class="section">
        <h2>Información del Trabajador</h2>
        <div class="info-row">
          <span class="label">Nombre:</span>
          <span>${worker.name}</span>
        </div>
        <div class="info-row">
          <span class="label">Razón Social:</span>
          <span>${worker.businessName || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="label">Nombre Comercial:</span>
          <span>${worker.commercialName || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="label">Correo Tributario:</span>
          <span>${worker.taxEmail || 'N/A'}</span>
        </div>
      </div>

      <div class="section">
        <h2>Detalles del Servicio</h2>
        <div class="info-row">
          <span class="label">Tipo de Servicio:</span>
          <span>${serviceTypes[booking.serviceType]}</span>
        </div>
        <div class="info-row">
          <span class="label">Fecha:</span>
          <span>${new Date(booking.date).toLocaleDateString('es-CL')}</span>
        </div>
        <div class="info-row">
          <span class="label">Horario:</span>
          <span>${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}</span>
        </div>
        ${booking.clientNotes ? `
        <div class="info-row">
          <span class="label">Notas:</span>
          <span>${booking.clientNotes}</span>
        </div>
        ` : ''}
      </div>

      <div class="total">
        <div class="info-row">
          <span class="label">TOTAL A PAGAR:</span>
          <span class="total-amount">$${booking.price.toLocaleString('es-CL')}</span>
        </div>
      </div>

      <div class="footer">
        <p>Gracias por confiar en CasaLimpia</p>
        <p>Este documento es una boleta electrónica válida</p>
        <p>Fecha de emisión: ${new Date().toLocaleString('es-CL')}</p>
      </div>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([invoiceHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `boleta-${booking.id}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
