import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Recommendation } from '../types';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Save, ExternalLink, ArrowLeft, Loader2, ShoppingCart } from 'lucide-react';

const componentTypeMap = {
  CPU: { label: 'Processador', color: 'bg-blue-100 text-blue-800' },
  GPU: { label: 'Placa de Vídeo', color: 'bg-green-100 text-green-800' },
  RAM: { label: 'Memória RAM', color: 'bg-purple-100 text-purple-800' },
  STORAGE: { label: 'Armazenamento', color: 'bg-yellow-100 text-yellow-800' },
  PSU: { label: 'Fonte', color: 'bg-red-100 text-red-800' },
  CASE: { label: 'Gabinete', color: 'bg-gray-100 text-gray-800' },
  MOTHERBOARD: { label: 'Placa-mãe', color: 'bg-indigo-100 text-indigo-800' },
};

export default function Pecas() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [saving, setSaving] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const stored = sessionStorage.getItem('recommendation');
    if (stored) {
      setRecommendation(JSON.parse(stored));
    } else {
      navigate('/questionario');
    }
  }, [navigate]);

  const handleSaveBuild = async () => {
    if (!recommendation) return;

    setSaving(true);
    try {
      await api.saveBuild({
        name: recommendation.name,
        total: recommendation.total,
        components: recommendation.components,
      });
      
      toast({
        title: "Build salva!",
        description: "Sua build foi salva com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar sua build.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Carregando componentes...</p>
          <Button asChild variant="outline">
            <Link to="/questionario">Voltar ao questionário</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Componentes e Preços
          </h1>
          <p className="text-muted-foreground">
            Detalhamento completo da sua build recomendada
          </p>
        </div>

        {/* Build Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <ShoppingCart className="mr-3 h-6 w-6" />
              {recommendation.name}
            </CardTitle>
            <CardDescription className="text-lg">
              Total: 
              <span className="text-2xl font-bold text-foreground ml-2">
                R$ {recommendation.total.toLocaleString('pt-BR')}
              </span>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Components Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Lista de Componentes</CardTitle>
            <CardDescription>
              Todos os componentes necessários para sua build
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Componente</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-center">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendation.components.map((component, index) => {
                    const typeInfo = componentTypeMap[component.type];
                    return (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell>
                          <Badge 
                            variant="secondary"
                            className={typeInfo?.color}
                          >
                            {typeInfo?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {component.name}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          R$ {component.price.toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-center">
                          {component.link ? (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a 
                                href={component.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Ver
                              </a>
                            </Button>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              N/A
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            
            {/* Total Row */}
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total da Build:</span>
                <span className="text-primary text-xl">
                  R$ {recommendation.total.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoggedIn && (
            <Button 
              size="lg"
              onClick={handleSaveBuild}
              disabled={saving}
              className="px-8"
            >
              {saving && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              <Save className="mr-2 h-5 w-5" />
              Salvar build
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="lg"
            asChild
          >
            <Link to="/motivos" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Link>
          </Button>
        </div>

        {!isLoggedIn && (
          <Card className="mt-8 bg-muted/30">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Faça login para salvar esta build e acessá-la posteriormente
              </p>
              <Button asChild>
                <Link to="/login">Fazer login</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}