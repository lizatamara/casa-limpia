import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Star, MapPin, Phone, Mail } from "lucide-react";
import { mockWorkers, mockRates, mockReviews, serviceTypes } from "@/utils/mockData";
import { useState } from "react";
import { es } from "date-fns/locale";

const WorkerProfileView = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const worker = mockWorkers.find(w => w.id === workerId);
  const rates = mockRates[workerId || ''] || [];
  const reviews = mockReviews.filter(r => r.workerId === workerId);

  if (!worker) {
    return <div>Trabajador no encontrado</div>;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/client/search">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Perfil del Trabajador</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* Worker Info */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{worker.name}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {worker.comuna}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {renderStars(Math.round(worker.rating))}
                  </div>
                  <span className="font-medium">{worker.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({worker.reviewCount} reseñas)
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                {worker.experience}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Sobre mí</h3>
              <p className="text-muted-foreground">{worker.bio}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {worker.phone}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {worker.email}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rates */}
        <Card>
          <CardHeader>
            <CardTitle>Tarifas de Servicios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rates.map(rate => (
              <div key={rate.serviceType} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{serviceTypes[rate.serviceType]}</p>
                  <p className="text-sm text-muted-foreground">{rate.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Duración: {rate.duration} hora{rate.duration !== 1 && 's'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">${rate.price.toLocaleString('es-CL')}</p>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/client/booking/${workerId}`, {
                      state: { serviceType: rate.serviceType }
                    })}
                    className="mt-2"
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Availability Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Disponibilidad</CardTitle>
            <p className="text-sm text-muted-foreground">
              Selecciona una fecha para ver horarios disponibles
            </p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Reseñas de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Este trabajador aún no tiene reseñas
              </p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{review.clientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('es-CL')}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerProfileView;
