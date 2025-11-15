import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Worker pages
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerProfile from "./pages/worker/WorkerProfile";
import WorkerRates from "./pages/worker/WorkerRates";
import WorkerAvailability from "./pages/worker/WorkerAvailability";
import WorkerBookings from "./pages/worker/WorkerBookings";
import WorkerPayments from "./pages/worker/WorkerPayments";
import WorkerReviews from "./pages/worker/WorkerReviews";

// Client pages
import ClientDashboard from "./pages/client/ClientDashboard";
import SearchWorkers from "./pages/client/SearchWorkers";
import WorkerProfileView from "./pages/client/WorkerProfileView";
import BookingForm from "./pages/client/BookingForm";
import PaymentSimulation from "./pages/client/PaymentSimulation";
import ClientBookings from "./pages/client/ClientBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Worker routes */}
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/worker/profile" element={<WorkerProfile />} />
            <Route path="/worker/rates" element={<WorkerRates />} />
            <Route path="/worker/availability" element={<WorkerAvailability />} />
            <Route path="/worker/bookings" element={<WorkerBookings />} />
            <Route path="/worker/payments" element={<WorkerPayments />} />
            <Route path="/worker/reviews" element={<WorkerReviews />} />
            
            {/* Client routes */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/search" element={<SearchWorkers />} />
            <Route path="/client/worker/:workerId" element={<WorkerProfileView />} />
            <Route path="/client/booking/:workerId" element={<BookingForm />} />
            <Route path="/client/payment" element={<PaymentSimulation />} />
            <Route path="/client/bookings" element={<ClientBookings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
