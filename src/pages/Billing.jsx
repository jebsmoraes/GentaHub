import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, Crown, Zap, Users, CreditCard, Download, Calendar } from 'lucide-react';

const Billing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [currentPlan, setCurrentPlan] = useState('professional');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfeito para começar',
      features: [
        '100 créditos de IA por mês',
        '1 conta de rede social',
        '10 posts agendados',
        'Analytics básicos',
        'Suporte por email'
      ],
      limitations: [
        'Sem geração de imagens',
        'Sem automação avançada',
        'Sem relatórios personalizados'
      ],
      color: 'gray',
      icon: Zap,
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 49, yearly: 490 },
      description: 'Para profissionais de marketing',
      features: [
        '1.000 créditos de IA por mês',
        '5 contas de redes sociais',
        '100 posts agendados',
        'Geração de imagens com IA',
        'Analytics avançados',
        'Automação de workflows',
        'Suporte prioritário',
        'Relatórios personalizados'
      ],
      limitations: [],
      color: 'primary',
      icon: Crown,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 149, yearly: 1490 },
      description: 'Para equipes e agências',
      features: [
        'Créditos de IA ilimitados',
        'Contas ilimitadas',
        'Posts ilimitados',
        'Geração avançada de conteúdo',
        'White-label disponível',
        'API personalizada',
        'Gerente de conta dedicado',
        'Treinamento personalizado',
        'SLA garantido'
      ],
      limitations: [],
      color: 'purple',
      icon: Users,
      popular: false
    }
  ];

  const currentPlanData = plans.find(plan => plan.id === currentPlan);
  const savings = billingPeriod === 'yearly' ? 20 : 0;

  const invoices = [
    {
      id: 'INV-001',
      date: '2024-01-15',
      amount: 49.00,
      status: 'paid',
      plan: 'Professional',
      period: 'Jan 2024'
    },
    {
      id: 'INV-002',
      date: '2024-02-15',
      amount: 49.00,
      status: 'paid',
      plan: 'Professional',
      period: 'Fev 2024'
    },
    {
      id: 'INV-003',
      date: '2024-03-15',
      amount: 49.00,
      status: 'pending',
      plan: 'Professional',
      period: 'Mar 2024'
    }
  ];

  const handlePlanChange = (planId) => {
    // Aqui seria implementada a lógica de mudança de plano
    console.log('Changing to plan:', planId);
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Aqui seria implementada a lógica de download da fatura
    console.log('Downloading invoice:', invoiceId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Faturamento</h1>
        <p className="text-muted-foreground">
          Gerencie seu plano, pagamentos e faturas
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Plano Atual</span>
          </CardTitle>
          <CardDescription>
            Seu plano ativo e informações de uso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentPlanData?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${currentPlanData?.price[billingPeriod]}/{billingPeriod === 'monthly' ? 'mês' : 'ano'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Próxima cobrança</p>
              <p className="font-semibold">15 de Abril, 2024</p>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Créditos IA</span>
                <span className="text-xs text-muted-foreground">750/1000</span>
              </div>
              <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Contas Conectadas</span>
                <span className="text-xs text-muted-foreground">3/5</span>
              </div>
              <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Posts Agendados</span>
                <span className="text-xs text-muted-foreground">23/100</span>
              </div>
              <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Alterar Plano</CardTitle>
          <CardDescription>
            Escolha o plano que melhor se adapta às suas necessidades
          </CardDescription>
          
          {/* Billing Period Toggle */}
          <div className="flex items-center space-x-4 pt-4">
            <span className="text-sm font-medium">Período de cobrança:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant={billingPeriod === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBillingPeriod('monthly')}
              >
                Mensal
              </Button>
              <Button
                variant={billingPeriod === 'yearly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setBillingPeriod('yearly')}
              >
                Anual
                {savings > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    -{savings}%
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = plan.id === currentPlan;
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''} ${isCurrentPlan ? 'bg-accent/50' : ''}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      Mais Popular
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {isCurrentPlan && (
                        <Badge variant="secondary">Atual</Badge>
                      )}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="pt-2">
                      <span className="text-3xl font-bold">
                        ${plan.price[billingPeriod]}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingPeriod === 'monthly' ? 'mês' : 'ano'}
                      </span>
                      {billingPeriod === 'yearly' && plan.price.monthly > 0 && (
                        <div className="text-sm text-green-600">
                          Economize ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(0)}/ano
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      className="w-full mt-6"
                      variant={isCurrentPlan ? 'outline' : 'default'}
                      disabled={isCurrentPlan}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {isCurrentPlan ? 'Plano Atual' : `Mudar para ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Método de Pagamento</CardTitle>
          <CardDescription>
            Gerencie seus métodos de pagamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-accent">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expira em 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Alterar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Faturas</CardTitle>
          <CardDescription>
            Visualize e baixe suas faturas anteriores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-accent">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.plan} - {invoice.period}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                    <Badge 
                      variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;

