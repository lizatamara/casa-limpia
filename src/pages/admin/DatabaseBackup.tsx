import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Database } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const DatabaseBackup = () => {
  const { toast } = useToast();

  const handleBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        users: appState.users,
        workers: appState.workers,
        rates: appState.rates,
        bookings: appState.bookings,
        reviews: appState.reviews,
        payments: appState.payments,
        recurringBookings: appState.recurringBookings,
        messages: appState.messages,
        terms: appState.terms,
      },
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `casalimpia-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Respaldo creado',
      description: 'El archivo de respaldo se ha descargado correctamente',
    });
  };

  const stats = {
    users: Object.keys(appState.users).length,
    workers: appState.workers.length,
    bookings: appState.bookings.length,
    reviews: appState.reviews.length,
    messages: appState.messages.length,
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Database className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-primary">Respaldo de Base de Datos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Crear Respaldo de Datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.users}</p>
                <p className="text-sm text-muted-foreground">Usuarios</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.workers}</p>
                <p className="text-sm text-muted-foreground">Trabajadores</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.bookings}</p>
                <p className="text-sm text-muted-foreground">Reservas</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.reviews}</p>
                <p className="text-sm text-muted-foreground">Reseñas</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.messages}</p>
                <p className="text-sm text-muted-foreground">Mensajes</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-2">¿Qué incluye el respaldo?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Todos los usuarios (clientes, trabajadores, administradores)</li>
                <li>Perfiles y tarifas de trabajadores</li>
                <li>Todas las reservas y pagos</li>
                <li>Reseñas y calificaciones</li>
                <li>Mensajes del chat</li>
                <li>Configuración de términos y condiciones</li>
              </ul>
            </div>

            <Button onClick={handleBackup} className="w-full" size="lg">
              <Download className="h-5 w-5 mr-2" />
              Descargar Respaldo
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              El respaldo se descargará como un archivo JSON con toda la información del sistema
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseBackup;
