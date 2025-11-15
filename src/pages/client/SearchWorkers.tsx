import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, DollarSign } from "lucide-react";
import { mockWorkers, comunas, serviceTypes, mockRates } from "@/utils/mockData";
import { ServiceType } from "@/types";

const SearchWorkers = () => {
  const navigate = useNavigate();
  const [selectedComuna, setSelectedComuna] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceType | 'all'>('all');
  const [searchDate, setSearchDate] = useState('');

  // Filter workers
  const filteredWorkers = mockWorkers
    .filter(w => w.isAvailable && !w.isPaused)
    .filter(w => selectedComuna === 'all' || w.comuna === selectedComuna)
    .sort((a, b) => {
      // Sort by comuna match first, then by rating
      const aComunaMatch = a.comuna === selectedComuna ? 1 : 0;
      const bComunaMatch = b.comuna === selectedComuna ? 1 : 0;
      if (aComunaMatch !== bComunaMatch) return bComunaMatch - aComunaMatch;
      return b.rating - a.rating;
    });

  const getWorkerPrice = (workerId: string, serviceType: ServiceType | '') => {
    if (!serviceType) return null;
    const rates = mockRates[workerId];
    if (!rates) return null;
    const rate = rates.find(r => r.serviceType === serviceType);
    return rate?.price;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/client/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary">Buscar Trabajadores</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="comuna">Comuna</Label>
                <Select value={selectedComuna} onValueChange={setSelectedComuna}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las comunas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las comunas</SelectItem>
                    {comunas.map(comuna => (
                      <SelectItem key={comuna} value={comuna}>{comuna}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Tipo de Servicio</Label>
                <Select value={selectedService} onValueChange={(val) => setSelectedService(val as ServiceType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los servicios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los servicios</SelectItem>
                    {Object.entries(serviceTypes).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha Deseada</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={() => {
                setSelectedComuna('all');
                setSelectedService('all');
                setSearchDate('all');
              }}
              variant="outline"
              className="w-full"
            >
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {filteredWorkers.length} trabajador{filteredWorkers.length !== 1 && 'es'} encontrado{filteredWorkers.length !== 1 && 's'}
          </p>

          {filteredWorkers.map(worker => {
            const price = selectedService !== 'all' ? getWorkerPrice(worker.id, selectedService) : null;

            return (
              <Card key={worker.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{worker.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {worker.comuna}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{worker.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({worker.reviewCount} reseñas)
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{worker.bio}</p>
                      
                      <Badge variant="secondary">{worker.experience}</Badge>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      {price && (
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            Desde
                          </div>
                          <p className="text-2xl font-bold text-primary">
                            ${price.toLocaleString('es-CL')}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/client/worker/${worker.id}`)}
                        >
                          Ver Perfil
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => navigate(`/client/booking/${worker.id}`, {
                            state: { serviceType: selectedService, date: searchDate }
                          })}
                        >
                          Reservar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredWorkers.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No se encontraron trabajadores con estos filtros
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchWorkers;
