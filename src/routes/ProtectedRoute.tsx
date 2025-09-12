import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isLoggedIn, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Faça login para acessar esta página",
      });
    } else if (requireAdmin && !isAdmin) {
      toast({
        variant: "destructive", 
        title: "Acesso negado",
        description: "Apenas administradores podem acessar esta página",
      });
    }
  }, [isLoggedIn, isAdmin, requireAdmin, toast]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}