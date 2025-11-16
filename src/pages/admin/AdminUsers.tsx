import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, Ban, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { toast } from 'sonner';
import { User } from '@/types';

export default function AdminUsers() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(Object.values(appState.users));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleToggleSuspend = (userId: string) => {
    const userToUpdate = appState.users[userId];
    if (userToUpdate) {
      userToUpdate.isSuspended = !userToUpdate.isSuspended;
      setUsers([...Object.values(appState.users)]);
      
      // También actualizar en workers si es trabajador
      const workerIndex = appState.workers.findIndex(w => w.id === userId);
      if (workerIndex !== -1) {
        appState.workers[workerIndex].isSuspended = userToUpdate.isSuspended;
      }
      
      toast.success(userToUpdate.isSuspended ? 'Usuario suspendido' : 'Usuario reactivado');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.comuna.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clients = filteredUsers.filter(u => u.role === 'client');
  const workers = filteredUsers.filter(u => u.role === 'worker');
  const allNonAdmin = filteredUsers.filter(u => u.role !== 'admin');

  if (!user || user.role !== 'admin') return null;

  const UserCard = ({ userData }: { userData: User }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{userData.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {userData.role === 'client' ? 'Cliente' : 'Trabajador'}
            </p>
          </div>
          <Badge variant={userData.isSuspended ? 'destructive' : 'default'}>
            {userData.isSuspended ? 'Suspendido' : 'Activo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{userData.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{userData.address}, {userData.comuna}</span>
          </div>
        </div>

        {userData.role === 'worker' && (
          <div className="pt-3 border-t text-sm">
            <p className="text-muted-foreground mb-1">Datos Tributarios:</p>
            <p className="font-medium">{userData.commercialName}</p>
            <p className="text-xs text-muted-foreground">{userData.businessName}</p>
          </div>
        )}

        <Button
          onClick={() => handleToggleSuspend(userData.id)}
          variant={userData.isSuspended ? 'default' : 'destructive'}
          className="w-full"
        >
          {userData.isSuspended ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Reactivar Usuario
            </>
          ) : (
            <>
              <Ban className="mr-2 h-4 w-4" />
              Suspender Usuario
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={() => navigate('/admin/dashboard')} variant="ghost" className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Panel
          </Button>
          <h1 className="text-2xl font-bold text-primary">Gestionar Usuarios</h1>
          <p className="text-sm text-muted-foreground">Administra todos los usuarios de la plataforma</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o comuna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">Todos ({allNonAdmin.length})</TabsTrigger>
            <TabsTrigger value="clients">Clientes ({clients.length})</TabsTrigger>
            <TabsTrigger value="workers">Trabajadores ({workers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {allNonAdmin.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No se encontraron usuarios</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allNonAdmin.map(u => <UserCard key={u.id} userData={u} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            {clients.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No se encontraron clientes</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clients.map(u => <UserCard key={u.id} userData={u} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="workers" className="space-y-4">
            {workers.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No se encontraron trabajadores</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workers.map(u => <UserCard key={u.id} userData={u} />)}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
