// src/utils/pdfGenerator.ts
import { Booking, User } from '@/types';
import { serviceTypes } from './mockData';
import jsPDF from 'jspdf';

export function generateInvoicePDF(booking: Booking, client: User, worker: User) {
  try {
    console.log('🔄 Iniciando generación de PDF...');
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('✨ CasaLimpia', pageWidth / 2, yPosition, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    yPosition += 10;
    doc.text('Boleta de Servicio', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 8;
    doc.setFontSize(10);
    doc.text(`N° ${booking.id}`, pageWidth / 2, yPosition, { align: 'center' });

    // Información del Cliente
    yPosition += 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DEL CLIENTE', 20, yPosition);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition += 8;
    doc.text(`Nombre: ${client.name}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Correo: ${client.email}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Teléfono: ${client.phone}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Dirección: ${booking.address}, ${booking.comuna}`, 20, yPosition);

    // Información del Trabajador
    yPosition += 15;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DEL TRABAJADOR', 20, yPosition);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition += 8;
    doc.text(`Nombre: ${worker.name}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Razón Social: ${worker.businessName || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Nombre Comercial: ${worker.commercialName || 'N/A'}`, 20, yPosition);

    // Detalles del Servicio
    yPosition += 15;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLES DEL SERVICIO', 20, yPosition);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition += 8;
    doc.text(`Servicio: ${serviceTypes[booking.serviceType]}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Fecha: ${new Date(booking.date).toLocaleDateString('es-CL')}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Horario: ${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}`, 20, yPosition);
    
    if (booking.clientNotes) {
      yPosition += 6;
      doc.text(`Notas: ${booking.clientNotes}`, 20, yPosition);
    }

    // Total
    yPosition += 15;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL A PAGAR:', 20, yPosition);
    doc.text(`$${booking.price.toLocaleString('es-CL')}`, pageWidth - 20, yPosition, { align: 'right' });

    // Footer
    yPosition += 20;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Gracias por confiar en CasaLimpia', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    doc.text('Este documento es una boleta electrónica válida', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    doc.text(`Fecha de emisión: ${new Date().toLocaleString('es-CL')}`, pageWidth / 2, yPosition, { align: 'center' });

    // Guardar PDF
    console.log('💾 Guardando PDF...');
    doc.save(`boleta-${booking.id}.pdf`);
    console.log('✅ PDF generado exitosamente!');
    
  } catch (error) {
    console.error('❌ Error generando PDF:', error);
  }
}