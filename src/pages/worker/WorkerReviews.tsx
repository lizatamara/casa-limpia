import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { appState } from "@/utils/mockData";

const WorkerReviews = () => {
  const { user } = useAuth();
  
  const myReviews = appState.reviews.filter(r => r.workerId === user?.id);
  const avgRating = myReviews.length > 0
    ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
    : '0.0';

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
          <Link to="/worker/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Mis Reseñas</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumen de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-primary">{avgRating}</div>
              <div>
                <div className="flex gap-1 mb-1">
                  {renderStars(Math.round(parseFloat(avgRating)))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Basado en {myReviews.length} reseña{myReviews.length !== 1 && 's'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {myReviews.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Aún no tienes reseñas
              </CardContent>
            </Card>
          ) : (
            myReviews.map(review => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
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
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerReviews;
