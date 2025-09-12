import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Recommendation } from '../types';
import { CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';

export default function Motivos() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('recommendation');
    if (stored) {
      setRecommendation(JSON.parse(stored));
    } else {
      // Redirect to questionnaire if no recommendation found
      navigate('/questionario');
    }
  }, [navigate]);

  if (!recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Carregando recomendação...</p>
          <Button asChild variant="outline">
            <Link to="/questionario">Voltar ao questionário</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="h-4 w-4 mr-1" />
            Recomendação Personalizada
          </Badge>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Por que essa build?
          </h1>
          <p className="text-muted-foreground">
            Entenda as razões por trás de cada escolha
          </p>
        </div>

        {/* Build Summary */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              {recommendation.name}
            </CardTitle>
            <CardDescription className="text-lg">
              <span className="text-2xl font-bold text-foreground">
                R$ {recommendation.total.toLocaleString('pt-BR')}
              </span>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Reasons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-success" />
              Justificativas da Recomendação
            </CardTitle>
            <CardDescription>
              Cada componente foi escolhido estrategicamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendation.reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg"
                >
                  <div className="bg-primary/10 rounded-full p-1 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">
                {recommendation.components.length}
              </div>
              <p className="text-sm text-muted-foreground">Componentes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success mb-2">
                100%
              </div>
              <p className="text-sm text-muted-foreground">Compatibilidade</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning mb-2">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-sm text-muted-foreground">Performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg" 
            className="px-8"
          >
            <Link to="/pecas" className="flex items-center">
              Ver peças e valores
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            asChild
          >
            <Link to="/questionario">Refazer questionário</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}