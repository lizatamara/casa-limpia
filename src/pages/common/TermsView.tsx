import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { appState } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';

const TermsView = () => {
  const { user } = useAuth();

  const getBackRoute = () => {
    if (!user) return '/';
    if (user.role === 'client') return '/client/dashboard';
    if (user.role === 'worker') return '/worker/dashboard';
    return '/admin/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={getBackRoute()}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Términos y Condiciones</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <span>Términos y Condiciones</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Versión {appState.terms.version}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: appState.terms.content.replace(/\n/g, '<br />').replace(/## /g, '<h2>').replace(/# /g, '<h1>'),
                }}
              />
            </div>
            <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
              Última actualización: {new Date(appState.terms.updatedAt).toLocaleDateString('es-CL')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsView;
