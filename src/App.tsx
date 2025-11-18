import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ScrollToTop from '@/components/ScrollToTop';

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
import PaymentConfirmation from './pages/client/PaymentConfirmation';

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorkerApproval from "./pages/admin/AdminWorkerApproval";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminReports from "./pages/admin/AdminReports";
// Nuevas rutas admin de la IA
import TermsManagement from "./pages/admin/TermsManagement";
import DatabaseBackup from "./pages/admin/DatabaseBackup";

// Common pages (nuevas de la IA)
import Chat from "./pages/common/Chat";
import TermsView from "./pages/common/TermsView";
import ClientFAQ from "./pages/client/ClientFAQ";
import WorkerFAQ from "./pages/worker/WorkerFAQ";
import RecurringBookings from "./pages/client/RecurringBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        {/* Configuración del Sonner con borde verde */}
        <Sonner 
          position="bottom-right"
          expand={false}
          closeButton={false}
          duration={4000}
          toastOptions={{
            style: {
              border: '1px solid #22c55e',
              background: 'white',
              color: 'hsl(240 10% 3.9%)',
              fontWeight: 500,
            },
            success: {
              style: {
                border: '1px solid #22c55e',
                background: 'white',
                color: 'hsl(240 10% 3.9%)',
              },
            },
            error: {
              style: {
                border: '1px solid #ef4444',
                background: 'white',
                color: 'hsl(240 10% 3.9%)',
              },
            },
          }}
        />
        <BrowserRouter>
          <ScrollToTop />
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
            <Route path="/client/payment-confirmation" element={<PaymentConfirmation />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/worker-approval" element={<AdminWorkerApproval />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            {/* Nuevas rutas admin de la IA */}
            <Route path="/admin/terms" element={<TermsManagement />} />
            <Route path="/admin/backup" element={<DatabaseBackup />} />
            
            {/* Common routes (nuevas de la IA) */}
            <Route path="/chat/:bookingId" element={<Chat />} />
            <Route path="/terms" element={<TermsView />} />
            <Route path="/client/faq" element={<ClientFAQ />} />
            <Route path="/worker/faq" element={<WorkerFAQ />} />
            <Route path="/client/recurring" element={<RecurringBookings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;