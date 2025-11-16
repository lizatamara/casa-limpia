import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, DollarSign, Calendar, Star, Settings, LogOut } from "lucide-react";
import { appState } from "@/utils/mockData";
import { useEffect } from "react";

const WorkerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const myBookings = appState.bookings.filter(b => b.workerId === user?.id);
  const pendingBookings = myBookings.filter(b => b.status === 'pending').length;
  const completedBookings = myBookings.filter(b => b.status === 'completed').length;
  const totalEarnings = appState.payments
    .filter(p => myBookings.some(b => b.id === p.bookingId && p.status === 'completed'))
    .reduce((sum, p) => sum + p.amount, 0);
  const myReviews = appState.reviews.filter(r => r.workerId === user?.id);
  const avgRating = myReviews.length > 0 
    ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
    : '0.0';

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
          <p className="text-muted-foreground">Bienvenido a tu panel de trabajador</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganancias Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings.toLocaleString('es-CL')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calificación</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRating} ⭐</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/worker/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <User className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mi Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Edita tu información visible al público
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/worker/rates">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mis Tarifas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configura precios por tipo de servicio
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/worker/availability">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mi Disponibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gestiona tu calendario mensual
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/worker/bookings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Settings className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mis Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gestiona solicitudes de clientes
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/worker/payments">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mis Pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Historial de pagos recibidos
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/worker/reviews">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Star className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mis Reseñas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lee opiniones de tus clientes
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
