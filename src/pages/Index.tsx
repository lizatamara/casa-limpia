import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">CasaLimpia</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="lg">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/auth?tab=signup">  {/* ← AGREGAR ?tab=signup */}
              <Button size="lg" className="bg-gradient-hero hover:opacity-90">
                Registrarse
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Conectamos hogares limpios con{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                profesionales de confianza
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              La plataforma que une trabajadores independientes de limpieza con clientes
              que necesitan sus servicios. Simple, rápido y confiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/client/search" className="w-full sm:w-auto">  {/* ← Cambiar a /client/search */}
               <Button size="lg" className="w-full bg-gradient-hero hover:opacity-90 text-lg py-6">
                  Buscar Servicio de Limpieza
               </Button>
              </Link>
              <Link to="/auth?tab=signup" className="w-full sm:w-auto">  {/* ← AGREGAR ?tab=signup */}
                <Button size="lg" variant="outline" className="w-full text-lg py-6 border-2">
                  Ofrecer Mis Servicios
                </Button>
              </Link>
          </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-medium">
              <img
                src={heroImage}
                alt="Servicio de limpieza profesional"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            ¿Por qué elegir CasaLimpia?
          </h2>
          <p className="text-xl text-muted-foreground">
            La mejor manera de conectar servicios de limpieza
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-medium transition-all">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">
              Profesionales Verificados
            </h3>
            <p className="text-muted-foreground">
              Todos nuestros trabajadores pasan por un proceso de verificación para
              garantizar calidad y confianza.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-medium transition-all">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">
              Reserva Rápida
            </h3>
            <p className="text-muted-foreground">
              Encuentra y reserva servicios de limpieza en minutos. Flexibilidad en
              horarios que se adaptan a ti.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-medium transition-all">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">
              Comunidad Confiable
            </h3>
            <p className="text-muted-foreground">
              Sistema de reseñas y calificaciones que ayuda a construir confianza entre
              clientes y trabajadores.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-hero rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestra comunidad hoy y descubre una nueva forma de conectar
          </p>
          <Link to="/auth?tab=signup">  {/* ← AGREGAR ?tab=signup */}
            <Button
              size="lg"
              variant="secondary"
              className="text-lg py-6 px-8"
            >
              Crear Cuenta Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 CasaLimpia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
