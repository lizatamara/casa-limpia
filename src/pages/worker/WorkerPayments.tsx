import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { appState, serviceTypes } from "@/utils/mockData";

const WorkerPayments = () => {
  const { user } = useAuth();
  
  const myBookings = appState.bookings.filter(b => b.workerId === user?.id);
  const myPayments = appState.payments.filter(p => 
    myBookings.some(b => b.id === p.bookingId)
  );

  const totalEarnings = myPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingEarnings = myPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/worker/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Mis Pagos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ganancias Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                ${totalEarnings.toLocaleString('es-CL')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pagos Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">
                ${pendingEarnings.toLocaleString('es-CL')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {myPayments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No tienes pagos registrados aún
              </p>
            ) : (
              myPayments.map(payment => {
                const booking = myBookings.find(b => b.id === payment.bookingId);
                const client = booking ? appState.users[booking.clientId] : null;

                return (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {booking ? serviceTypes[booking.serviceType] : 'Servicio'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {client?.name} • {new Date(payment.date).toLocaleDateString('es-CL')}
                      </p>
                      <Badge variant={payment.status === 'completed' ? 'default' : 'outline'}>
                        {payment.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      ${payment.amount.toLocaleString('es-CL')}
                    </p>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerPayments;
