import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Cpu, Zap, Shield, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Monte seu PC
            <span className="text-primary block">dos sonhos</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Receba recomendações personalizadas de peças para seu computador ideal. 
            Nossa inteligência artificial analisa suas necessidades e orçamento.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <Link to="/questionario">
              <Cpu className="mr-2 h-5 w-5" />
              Montar PC
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Recomendações Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Algoritmo inteligente que considera seu uso, orçamento e preferências para sugerir a configuração perfeita.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Performance Otimizada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Configurações balanceadas que garantem máxima performance dentro do seu orçamento disponível.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Compatibilidade Garantida</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Todas as peças são verificadas para compatibilidade total, evitando problemas na montagem.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Responda algumas perguntas simples e receba sua recomendação personalizada em instantes.
          </p>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/questionario">Começar agora</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}