import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { LogOut, Settings, User, Cpu } from 'lucide-react';

export function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Cpu className="h-6 w-6" />
            <span>PC Ideal</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/questionario" className="text-foreground hover:text-primary transition-colors">
              Montar PC
            </Link>
            {isLoggedIn && (
              <Link to="/minhas-builds" className="text-foreground hover:text-primary transition-colors">
                Minhas Builds
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin/usuarios" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4" />
                  <span className="text-foreground">{user?.nome}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline">Sair</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Registrar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 border-t border-border pt-3 mt-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/" className="text-foreground hover:text-primary">
              Início
            </Link>
            <Link to="/questionario" className="text-foreground hover:text-primary">
              Montar PC
            </Link>
            {isLoggedIn && (
              <Link to="/minhas-builds" className="text-foreground hover:text-primary">
                Minhas Builds
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin/usuarios" className="text-foreground hover:text-primary">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}