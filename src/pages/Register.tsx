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

export default function Register() {
  const [nome, setNome] = useState('');
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
      const response = await api.register({ nome, email, senha });
      login(response.token, response.user);
      toast({
        title: "Conta criada!",
        description: `Bem-vindo(a), ${response.user.nome}!`,
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard 
      title="Criar conta" 
      description="Cadastre-se para salvar suas builds personalizadas"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

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
            minLength={6}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Criar conta
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Fazer login
          </Link>
        </div>
      </form>
    </FormCard>
  );
}