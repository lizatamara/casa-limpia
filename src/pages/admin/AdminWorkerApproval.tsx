import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { toast } from 'sonner';

export default function AdminWorkerApproval() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingWorkers, setPendingWorkers] = useState(appState.workers.filter(w => !w.isApproved));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleApprove = (workerId: string) => {
    const workerIndex = appState.workers.findIndex(w => w.id === workerId);
    if (workerIndex !== -1) {
      appState.workers[workerIndex].isApproved = true;
      appState.workers[workerIndex].approvalDate = new Date().toISOString().split('T')[0];
      setPendingWorkers(appState.workers.filter(w => !w.isApproved));
      toast.success('Trabajador aprobado exitosamente');
    }
  };

  const handleReject = (workerId: string) => {
    const workerIndex = appState.workers.findIndex(w => w.id === workerId);
    if (workerIndex !== -1) {
      appState.workers.splice(workerIndex, 1);
      setPendingWorkers(appState.workers.filter(w => !w.isApproved));
      toast.error('Trabajador rechazado');
    }
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
          <h1 className="text-2xl font-bold text-primary">Validar Trabajadores</h1>
          <p className="text-sm text-muted-foreground">Revisa y aprueba nuevos perfiles</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {pendingWorkers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No hay trabajadores pendientes de aprobación</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {pendingWorkers.map((worker) => (
              <Card key={worker.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{worker.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {worker.commercialName && `${worker.commercialName} • `}
                        {worker.experience} de experiencia
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Pendiente</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Información Personal */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm">Información de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.address}, {worker.comuna}</span>
                      </div>
                    </div>
                  </div>

                  {/* Información Tributaria */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm">Información Tributaria</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Razón Social:</span>
                        <p className="font-medium">{worker.businessName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nombre Comercial:</span>
                        <p className="font-medium">{worker.commercialName}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Dirección Tributaria:</span>
                        <p className="font-medium">{worker.taxAddress}, {worker.taxComuna}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email Tributario:</span>
                        <p className="font-medium">{worker.taxEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Perfil Profesional */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm">Perfil Profesional</h3>
                    <p className="text-sm text-muted-foreground mb-2">{worker.bio}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>Experiencia: {worker.experience}</span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={() => handleApprove(worker.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Aprobar Trabajador
                    </Button>
                    <Button
                      onClick={() => handleReject(worker.id)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
