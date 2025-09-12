import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { api } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { Loader2, GamepadIcon, BriefcaseIcon, GraduationCapIcon, DollarSignIcon } from 'lucide-react';

export default function Questionario() {
  const [purpose, setPurpose] = useState<'gaming' | 'work' | 'study' | ''>('');
  const [budget, setBudget] = useState<'budget' | 'mid' | 'high' | 'extreme' | ''>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const purposeOptions = [
    { value: 'gaming', label: 'Gaming', icon: GamepadIcon, description: 'Jogos e entretenimento' },
    { value: 'work', label: 'Trabalho', icon: BriefcaseIcon, description: 'Produtividade e profissional' },
    { value: 'study', label: 'Estudos', icon: GraduationCapIcon, description: 'Acadêmico e aprendizado' },
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Econômico', price: 'R$ 2.000 - 4.000', color: 'text-green-600' },
    { value: 'mid', label: 'Intermediário', price: 'R$ 4.000 - 7.000', color: 'text-blue-600' },
    { value: 'high', label: 'Alto', price: 'R$ 7.000 - 12.000', color: 'text-purple-600' },
    { value: 'extreme', label: 'Extremo', price: 'R$ 12.000+', color: 'text-red-600' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!purpose || !budget) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, selecione o propósito e orçamento.",
      });
      return;
    }

    setLoading(true);

    try {
      const recommendation = await api.getRecommendation({ 
        purpose: purpose as 'gaming' | 'work' | 'study', 
        budget: budget as 'budget' | 'mid' | 'high' | 'extreme' 
      });
      
      // Store recommendation in sessionStorage for next pages
      sessionStorage.setItem('recommendation', JSON.stringify(recommendation));
      
      toast({
        title: "Recomendação gerada!",
        description: "Sua build personalizada está pronta.",
      });
      
      navigate('/motivos');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na recomendação",
        description: "Ocorreu um erro ao gerar sua recomendação. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Questionário de Recomendação
          </h1>
          <p className="text-muted-foreground">
            Conte-nos suas necessidades para criarmos a build perfeita
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Purpose Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Qual será o uso principal do PC?</CardTitle>
              <CardDescription>
                Isso nos ajuda a priorizar as peças certas para sua necessidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {purposeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        purpose === option.value 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setPurpose(option.value as any)}
                    >
                      <CardContent className="p-6 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Budget Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Qual é seu orçamento?</CardTitle>
              <CardDescription>
                Definiremos as melhores peças dentro da sua faixa de preço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {budgetOptions.map((option) => (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      budget === option.value 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setBudget(option.value as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <DollarSignIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <h3 className="font-semibold mb-1">{option.label}</h3>
                      <p className={`text-sm font-medium ${option.color}`}>
                        {option.price}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg"
              disabled={loading || !purpose || !budget}
              className="px-8 py-6 text-lg"
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Gerar recomendação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}