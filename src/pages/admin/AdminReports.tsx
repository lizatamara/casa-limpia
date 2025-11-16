import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { appState, serviceTypes } from '@/utils/mockData';

export default function AdminReports() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState('all');
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    netRevenue: 0,
    completedBookings: 0,
    averagePrice: 0,
    byServiceType: {} as Record<string, { count: number; revenue: number }>
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    calculateReport();
  }, [period]);

  const calculateReport = () => {
    let filteredBookings = appState.bookings.filter(b => b.status === 'completed');

    // Filtrar por periodo
    if (period !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (period) {
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filteredBookings = filteredBookings.filter(b => 
        new Date(b.createdAt) >= filterDate
      );
    }

    const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.price, 0);
    const platformFee = 0.15; // 15% comisión de plataforma
    const netRevenue = totalRevenue * platformFee;
    const averagePrice = filteredBookings.length > 0 ? totalRevenue / filteredBookings.length : 0;

    // Calcular por tipo de servicio
    const byServiceType: Record<string, { count: number; revenue: number }> = {};
    filteredBookings.forEach(b => {
      if (!byServiceType[b.serviceType]) {
        byServiceType[b.serviceType] = { count: 0, revenue: 0 };
      }
      byServiceType[b.serviceType].count++;
      byServiceType[b.serviceType].revenue += b.price;
    });

    setReportData({
      totalRevenue,
      netRevenue,
      completedBookings: filteredBookings.length,
      averagePrice,
      byServiceType
    });
  };

  const downloadReport = () => {
    const periodLabels: Record<string, string> = {
      all: 'Todos los tiempos',
      month: 'Último mes',
      quarter: 'Último trimestre',
      year: 'Último año'
    };

    let reportContent = `Reporte Financiero CasaLimpia\n`;
    reportContent += `Periodo: ${periodLabels[period]}\n`;
    reportContent += `Generado: ${new Date().toLocaleString('es-CL')}\n\n`;
    reportContent += `===== RESUMEN GENERAL =====\n`;
    reportContent += `Total de Reservas Completadas: ${reportData.completedBookings}\n`;
    reportContent += `Ingresos Totales: $${reportData.totalRevenue.toLocaleString('es-CL')}\n`;
    reportContent += `Ingresos Netos (15% comisión): $${reportData.netRevenue.toLocaleString('es-CL')}\n`;
    reportContent += `Precio Promedio por Servicio: $${reportData.averagePrice.toLocaleString('es-CL')}\n\n`;
    reportContent += `===== DESGLOSE POR TIPO DE SERVICIO =====\n`;
    
    Object.entries(reportData.byServiceType).forEach(([type, data]) => {
      reportContent += `\n${serviceTypes[type as keyof typeof serviceTypes]}:\n`;
      reportContent += `  Cantidad: ${data.count}\n`;
      reportContent += `  Ingresos: $${data.revenue.toLocaleString('es-CL')}\n`;
      reportContent += `  Comisión (15%): $${(data.revenue * 0.15).toLocaleString('es-CL')}\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-casalimpia-${period}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={() => navigate('/admin/dashboard')} variant="ghost" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>
          <h1 className="text-2xl font-bold text-primary">Reportes Financieros</h1>
          <p className="text-sm text-muted-foreground">Análisis de ganancias y rentabilidad</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-64">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tiempos</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último año</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Descargar Reporte
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${reportData.totalRevenue.toLocaleString('es-CL')}</div>
              <p className="text-xs text-muted-foreground">
                De {reportData.completedBookings} servicios
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Netos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${reportData.netRevenue.toLocaleString('es-CL')}</div>
              <p className="text-xs text-muted-foreground">
                Comisión 15%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(reportData.averagePrice).toLocaleString('es-CL')}</div>
              <p className="text-xs text-muted-foreground">
                Por servicio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Completadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.completedBookings}</div>
              <p className="text-xs text-muted-foreground">
                En el periodo
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Desglose por Tipo de Servicio</CardTitle>
            <CardDescription>Detalle de ingresos y cantidad por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(reportData.byServiceType).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No hay datos para el periodo seleccionado
                </p>
              ) : (
                Object.entries(reportData.byServiceType).map(([type, data]) => (
                  <div key={type} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{serviceTypes[type as keyof typeof serviceTypes]}</h3>
                      <span className="text-sm text-muted-foreground">{data.count} servicios</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Ingresos Totales</p>
                        <p className="text-lg font-bold">${data.revenue.toLocaleString('es-CL')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Comisión (15%)</p>
                        <p className="text-lg font-bold text-primary">
                          ${Math.round(data.revenue * 0.15).toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
