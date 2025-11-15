import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { appState, mockWorkers } from "@/utils/mockData";

const WorkerProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const workerProfile = mockWorkers.find(w => w.id === user?.id) || {
    bio: '',
    experience: '',
    isAvailable: true,
    isPaused: false
  };

  const [bio, setBio] = useState(workerProfile.bio || '');
  const [experience, setExperience] = useState(workerProfile.experience || '');
  const [isAvailable, setIsAvailable] = useState(workerProfile.isAvailable);
  const [isPaused, setIsPaused] = useState(workerProfile.isPaused || false);

  const handleSave = () => {
    // Update in mock data
    const workerIndex = mockWorkers.findIndex(w => w.id === user?.id);
    if (workerIndex !== -1) {
      mockWorkers[workerIndex] = {
        ...mockWorkers[workerIndex],
        bio,
        experience,
        isAvailable,
        isPaused
      };
    }

    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente",
    });
  };

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
          <h1 className="text-xl font-bold text-primary">Mi Perfil</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Información Pública</CardTitle>
            <p className="text-sm text-muted-foreground">
              Esta información será visible para los clientes
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info (Read-only from registration) */}
            <div className="space-y-4 pb-4 border-b">
              <div>
                <Label>Nombre</Label>
                <Input value={user?.name} disabled />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input value={user?.phone} disabled />
              </div>
              <div>
                <Label>Comuna</Label>
                <Input value={user?.comuna} disabled />
              </div>
            </div>

            {/* Editable Profile */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Cuéntanos sobre tu experiencia y especialidades..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="experience">Años de Experiencia</Label>
                <Input
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="ej: 5 años"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Disponible para Reservas</Label>
                  <p className="text-sm text-muted-foreground">
                    Los clientes podrán ver tu perfil y reservar
                  </p>
                </div>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Pausar Temporalmente</Label>
                  <p className="text-sm text-muted-foreground">
                    Oculta tu perfil sin perder tu información
                  </p>
                </div>
                <Switch
                  checked={isPaused}
                  onCheckedChange={setIsPaused}
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerProfile;
