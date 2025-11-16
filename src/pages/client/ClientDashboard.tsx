import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Star, User, LogOut } from "lucide-react";
import { appState } from "@/utils/mockData";
import { useEffect } from "react";
import ClientBookings from "./ClientBookings";

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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
