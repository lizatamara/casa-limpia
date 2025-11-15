import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";

const WorkerAvailability = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    
    // Toggle availability
    const dateString = format(date, 'yyyy-MM-dd');
    const isAvailable = availableDates.some(d => format(d, 'yyyy-MM-dd') === dateString);
    
    if (isAvailable) {
      setAvailableDates(availableDates.filter(d => format(d, 'yyyy-MM-dd') !== dateString));
    } else {
      setAvailableDates([...availableDates, date]);
    }
  };

  const handleSave = () => {
    toast({
      title: "Disponibilidad guardada",
      description: `Has marcado ${availableDates.length} días como disponibles`,
    });
  };

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

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
          <h1 className="text-xl font-bold text-primary">Mi Disponibilidad</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Calendario Mensual</CardTitle>
            <p className="text-sm text-muted-foreground">
              Selecciona los días en que estás disponible para trabajar
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Month Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              >
                ← Mes Anterior
              </Button>
              <h3 className="text-lg font-semibold">
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </h3>
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                Mes Siguiente →
              </Button>
            </div>

            {/* Calendar */}
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                locale={es}
                className="rounded-md border"
                modifiers={{
                  available: availableDates
                }}
                modifiersStyles={{
                  available: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
              />
            </div>

            {/* Legend */}
            <div className="flex gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary"></div>
                <span>Días disponibles ({availableDates.length})</span>
              </div>
            </div>

            {/* Time Slots Info */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 Los clientes podrán reservar en estos días. Los horarios específicos se coordinarán según tu disponibilidad.
              </p>
            </div>

            <Button onClick={handleSave} className="w-full">
              Guardar Disponibilidad
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerAvailability;
