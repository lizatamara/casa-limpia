import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { comunas } from "@/utils/mockData";
import { UserRole } from "@/types";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserRole>('client');
  const { toast } = useToast();
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';


  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'worker') {
        navigate('/worker/dashboard');
      } else if (user.role === 'client') {
        navigate('/client/dashboard');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await login(email, password);
    
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a CasaLimpia",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      comuna: formData.get('comuna') as string,
      role: userType,
      ...(userType === 'worker' && {
        businessName: formData.get('businessName') as string,
        commercialName: formData.get('commercialName') as string,
        taxAddress: formData.get('taxAddress') as string,
        taxComuna: formData.get('taxComuna') as string,
        taxEmail: formData.get('taxEmail') as string,
      })
    };

    const result = await signup(userData);
    
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="h-10 w-10 text-primary" />
          <span className="text-3xl font-bold text-primary">CasaLimpia</span>
        </Link>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrarse</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Correo Electrónico</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Crear Cuenta</CardTitle>
                <CardDescription>
                  Regístrate para comenzar a usar CasaLimpia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-type">Tipo de Usuario</Label>
                    <Select value={userType} onValueChange={(value) => setUserType(value as UserRole)} name="role">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Cliente (Busco servicios)</SelectItem>
                        <SelectItem value="worker">Trabajador (Ofrezco servicios)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nombre Completo</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Correo Electrónico</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Contraseña</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Teléfono</Label>
                    <Input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-address">Dirección</Label>
                    <Input
                      id="signup-address"
                      name="address"
                      type="text"
                      placeholder="Av. Providencia 1234"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-comuna">Comuna</Label>
                    <Select name="comuna" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu comuna" />
                      </SelectTrigger>
                      <SelectContent>
                        {comunas.map(comuna => (
                          <SelectItem key={comuna} value={comuna}>{comuna}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {userType === 'worker' && (
                    <>
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-semibold mb-3">Datos Tributarios</h4>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessName">Razón Social</Label>
                            <Input
                              id="businessName"
                              name="businessName"
                              type="text"
                              placeholder="Mi Empresa SpA"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="commercialName">Nombre Comercial</Label>
                            <Input
                              id="commercialName"
                              name="commercialName"
                              type="text"
                              placeholder="LimpiezaPro"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="taxAddress">Dirección Tributaria</Label>
                            <Input
                              id="taxAddress"
                              name="taxAddress"
                              type="text"
                              placeholder="Av. Apoquindo 5678"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="taxComuna">Comuna Tributaria</Label>
                            <Select name="taxComuna" required>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona comuna" />
                              </SelectTrigger>
                              <SelectContent>
                                {comunas.map(comuna => (
                                  <SelectItem key={comuna} value={comuna}>{comuna}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="taxEmail">Correo Tributario</Label>
                            <Input
                              id="taxEmail"
                              name="taxEmail"
                              type="email"
                              placeholder="facturacion@miempresa.cl"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
