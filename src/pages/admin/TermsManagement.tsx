import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const TermsManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState(appState.terms.content);
  const [version, setVersion] = useState(appState.terms.version);

  const handleSave = () => {
    appState.terms.content = content;
    appState.terms.version = version;
    appState.terms.updatedAt = new Date().toISOString();
    appState.terms.updatedBy = user?.id || 'admin';

    toast({
      title: 'Términos actualizados',
      description: 'Los cambios han sido guardados correctamente',
    });

    navigate('/admin/dashboard');
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
          <h1 className="text-xl font-bold text-primary">Gestionar Términos y Condiciones</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Editar Términos y Condiciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Versión
              </label>
              <Input
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Ej: 1.0, 2.0"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Contenido
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Usa # para títulos principales, ## para subtítulos
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsManagement;
