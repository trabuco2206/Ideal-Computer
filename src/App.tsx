import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questionario from "./pages/Questionario";
import Motivos from "./pages/Motivos";
import Pecas from "./pages/Pecas";
import AdminUsuarios from "./pages/AdminUsuarios";
import MinhasBuilds from "./pages/MinhasBuilds";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/questionario" element={<Questionario />} />
            <Route path="/motivos" element={<Motivos />} />
            <Route path="/pecas" element={<Pecas />} />
            <Route 
              path="/minhas-builds" 
              element={
                <ProtectedRoute>
                  <MinhasBuilds />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/usuarios" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminUsuarios />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
