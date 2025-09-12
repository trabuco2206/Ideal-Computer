import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Build } from '../types';
import { api } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Plus, Calendar, DollarSign, Cpu, Loader2 } from 'lucide-react';

export default function MinhasBuilds() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBuilds();
  }, []);

  const loadBuilds = async () => {
    try {
      const data = await api.getMyBuilds();
      setBuilds(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar",
        description: "Não foi possível carregar suas builds.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando suas builds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Cpu className="mr-3 h-8 w-8 text-primary" />
              Minhas Builds
            </h1>
            <p className="text-muted-foreground mt-2">
              Suas configurações salvas
            </p>
          </div>
          
          <Button asChild>
            <Link to="/questionario">
              <Plus className="mr-2 h-4 w-4" />
              Nova build
            </Link>
          </Button>
        </div>

        {builds.length === 0 ? (
          /* Empty State */
          <Card className="text-center py-12">
            <CardContent>
              <Cpu className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <CardTitle className="mb-2">Nenhuma build salva</CardTitle>
              <CardDescription className="mb-6">
                Você ainda não salvou nenhuma configuração. Que tal criar sua primeira build?
              </CardDescription>
              <Button asChild>
                <Link to="/questionario">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar primeira build
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Builds Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card key={build.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{build.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {build.components.length} itens
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(build.createdAt).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Price */}
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-primary mr-2" />
                        <span className="font-medium">Total</span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        R$ {build.total.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    {/* Components Summary */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Componentes principais:</h4>
                      <div className="space-y-1">
                        {build.components.slice(0, 3).map((component, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground truncate">
                              {component.type}
                            </span>
                            <span className="font-medium ml-2">
                              R$ {component.price.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        ))}
                        {build.components.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{build.components.length - 3} outros componentes
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          // Store build in sessionStorage and navigate to details
                          const buildAsRecommendation = {
                            name: build.name,
                            total: build.total,
                            components: build.components,
                            reasons: ['Build salva anteriormente']
                          };
                          sessionStorage.setItem('recommendation', JSON.stringify(buildAsRecommendation));
                          window.location.href = '/pecas';
                        }}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}