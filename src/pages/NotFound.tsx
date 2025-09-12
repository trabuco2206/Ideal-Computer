import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="pb-6">
          <div className="mx-auto bg-muted rounded-full w-20 h-20 flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-muted-foreground">404</span>
          </div>
          <CardTitle className="text-2xl">Página não encontrada</CardTitle>
          <CardDescription>
            A página que você está procurando não existe ou foi movida.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Que tal voltar para a página inicial e explorar nossas recomendações de PC?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Página inicial
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}