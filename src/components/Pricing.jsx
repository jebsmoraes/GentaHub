import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfeito para começar",
      price: { monthly: 0, annual: 0 },
      features: [
        "Até 3 projetos",
        "5 posts por mês",
        "Analytics básico",
        "1 usuário",
        "Suporte por email",
        "Templates básicos"
      ],
      buttonText: "Começar Grátis",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Pro",
      description: "Para profissionais e pequenas equipes",
      price: { monthly: 49, annual: 39 },
      features: [
        "Projetos ilimitados",
        "500 posts por mês",
        "IA Generativa completa",
        "Analytics avançado",
        "Até 5 usuários",
        "Automação de fluxos",
        "Integração com redes sociais",
        "Suporte prioritário",
        "Templates premium"
      ],
      buttonText: "Começar Teste Grátis",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Master",
      description: "Para agências e grandes empresas",
      price: { monthly: 149, annual: 119 },
      features: [
        "Tudo do Pro",
        "Posts ilimitados",
        "White-label completo",
        "API personalizada",
        "Usuários ilimitados",
        "Gerente de conta dedicado",
        "Treinamento personalizado",
        "SLA garantido",
        "Integrações customizadas"
      ],
      buttonText: "Falar com Vendas",
      buttonVariant: "outline",
      popular: false
    }
  ];

  return (
    <section id="precos" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Preços Transparentes</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Escolha o plano ideal{' '}
            <span className="text-primary">para seu negócio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comece grátis e escale conforme sua necessidade. Todos os planos incluem 
            14 dias de teste gratuito, sem compromisso.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Mensal
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Anual
          </span>
          {isAnnual && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Economize 20%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border'
              } hover:shadow-lg transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Zap className="h-3 w-3" />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold">
                      R${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  {isAnnual && plan.price.monthly > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <span className="line-through">R${plan.price.monthly}/mês</span>
                      <span className="text-green-600 ml-2">Economize R${(plan.price.monthly - plan.price.annual) * 12}/ano</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button 
                  className={`w-full ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-primary hover:bg-primary/90' 
                      : ''
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-16 space-y-4">
          <h3 className="text-2xl font-bold">Dúvidas sobre os planos?</h3>
          <p className="text-muted-foreground">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano.
          </p>
          <Button variant="outline" size="lg">
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

