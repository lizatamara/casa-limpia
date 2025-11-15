import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockRates, serviceTypes } from "@/utils/mockData";
import { ServiceType, ServiceRate } from "@/types";

const WorkerRates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const initialRates = mockRates[user?.id || ''] || Object.keys(serviceTypes).map(type => ({
    serviceType: type as ServiceType,
    price: 15000,
    duration: 3,
    description: ''
  }));

  const [rates, setRates] = useState<ServiceRate[]>(initialRates);

  const handleRateChange = (index: number, field: keyof ServiceRate, value: string | number) => {
    const newRates = [...rates];
    newRates[index] = { ...newRates[index], [field]: value };
    setRates(newRates);
  };

  const handleSave = () => {
    if (user?.id) {
      mockRates[user.id] = rates;
    }

    toast({
      title: "Tarifas actualizadas",
      description: "Tus precios han sido guardados exitosamente",
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
          <h1 className="text-xl font-bold text-primary">Mis Tarifas</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Configura tus Precios</CardTitle>
            <p className="text-sm text-muted-foreground">
              Define el precio y duración para cada tipo de servicio
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {rates.map((rate, index) => (
              <div key={rate.serviceType} className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg">
                  {serviceTypes[rate.serviceType]}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`price-${index}`}>Precio (CLP)</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      value={rate.price}
                      onChange={(e) => handleRateChange(index, 'price', parseInt(e.target.value))}
                      placeholder="15000"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`duration-${index}`}>Duración (horas)</Label>
                    <Input
                      id={`duration-${index}`}
                      type="number"
                      value={rate.duration}
                      onChange={(e) => handleRateChange(index, 'duration', parseInt(e.target.value))}
                      placeholder="3"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`description-${index}`}>Descripción</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={rate.description}
                    onChange={(e) => handleRateChange(index, 'description', e.target.value)}
                    placeholder="Describe qué incluye este servicio..."
                    rows={2}
                  />
                </div>
              </div>
            ))}

            <Button onClick={handleSave} className="w-full">
              Guardar Tarifas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerRates;
