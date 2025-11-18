import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Star, User, LogOut } from "lucide-react";
import { appState } from "@/utils/mockData";
import { useEffect } from "react";

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleLoad = () => window.scrollTo(0, 0);
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const myBookings = appState.bookings.filter(b => b.clientId === user?.id);
  const pendingBookings = myBookings.filter(b => b.status === 'pending').length;
  const acceptedBookings = myBookings.filter(b => b.status === 'accepted').length;
  const completedBookings = myBookings.filter(b => b.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">CasaLimpia</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">¡Hola, {user?.name}!</h2>
          <p className="text-muted-foreground">Encuentra el mejor servicio de limpieza</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Pendientes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aceptadas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptedBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedBookings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/client/search">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Search className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Buscar Trabajadores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Encuentra el trabajador perfecto para tu necesidad
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/client/bookings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mis Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ver y gestionar tus reservas activas
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/client/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <User className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Editar Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Actualiza tu información personal y preferencias
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Nuevas opciones de la IA */}
          <Link to="/client/recurring">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Limpiezas Recurrentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gestiona tus limpiezas semanales
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/client/faq">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <Star className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Centro de Ayuda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Preguntas frecuentes y soporte
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Bookings */}
        {myBookings.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Reservas Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.slice(0, 3).map(booking => {
                  const worker = appState.workers.find(w => w.id === booking.workerId);
                  return (
                    <div key={booking.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{worker?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString('es-CL')}
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${
                        booking.status === 'pending' ? 'text-orange-500' :
                        booking.status === 'accepted' ? 'text-green-500' :
                        booking.status === 'completed' ? 'text-blue-500' :
                        'text-red-500'
                      }`}>
                        {booking.status === 'pending' && 'Pendiente'}
                        {booking.status === 'accepted' && 'Aceptada'}
                        {booking.status === 'completed' && 'Completada'}
                        {booking.status === 'rejected' && 'Rechazada'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;