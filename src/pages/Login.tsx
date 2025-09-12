import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { FormCard } from '../components/FormCard';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.login({ email, senha });
      login(response.token, response.user);
      toast({
        title: "Login realizado!",
        description: `Bem-vindo(a), ${response.user.nome}!`,
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente: admin@ideal.com / 123456",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard 
      title="Entrar" 
      description="Acesse sua conta para salvar suas builds"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Criar conta
            </Link>
          </p>
          <p className="text-xs">
            Demo: admin@ideal.com / 123456
          </p>
        </div>
      </form>
    </FormCard>
  );
}