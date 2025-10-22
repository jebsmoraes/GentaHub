import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  UserPlus, 
  Settings, 
  Sparkles, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: "Cadastre-se Gratuitamente",
      description: "Crie sua conta em menos de 2 minutos. Sem cartão de crédito, sem compromisso. Comece com nosso plano gratuito.",
      features: [
        "Cadastro instantâneo",
        "Sem cartão de crédito",
        "Acesso imediato"
      ],
      color: "text-blue-500"
    },
    {
      step: 2,
      icon: Settings,
      title: "Configure Suas Integrações",
      description: "Conecte suas redes sociais e ferramentas favoritas. Nossa IA aprende sobre sua marca e audiência automaticamente.",
      features: [
        "Integração com redes sociais",
        "Análise automática da marca",
        "Configuração guiada"
      ],
      color: "text-green-500"
    },
    {
      step: 3,
      icon: Sparkles,
      title: "Crie Conteúdo com IA",
      description: "Use nossa IA generativa para criar textos, imagens e vídeos personalizados. Edite, aprove e agende tudo em um só lugar.",
      features: [
        "Geração de conteúdo IA",
        "Editor integrado",
        "Agendamento inteligente"
      ],
      color: "text-purple-500"
    },
    {
      step: 4,
      icon: BarChart3,
      title: "Analise e Otimize",
      description: "Monitore performance em tempo real, receba insights acionáveis e otimize suas campanhas para máximos resultados.",
      features: [
        "Analytics em tempo real",
        "Insights acionáveis",
        "Otimização automática"
      ],
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Como Funciona</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Transforme seu marketing em{' '}
            <span className="text-primary">4 passos simples</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Do cadastro aos primeiros resultados em menos de 30 minutos. 
            Nossa plataforma foi projetada para ser intuitiva e poderosa.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <div className={`grid grid-cols-12 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'direction-rtl'
                  }`}>
                    {/* Content */}
                    <div className={`col-span-5 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-8 space-y-6">
                          <div className={`flex items-center space-x-4 ${
                            index % 2 === 0 ? '' : 'flex-row-reverse space-x-reverse'
                          }`}>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors`}>
                              <IconComponent className={`h-6 w-6 ${step.color} group-hover:scale-110 transition-transform`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-primary">Passo {step.step}</div>
                              <h3 className="text-xl font-bold">{step.title}</h3>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                          
                          <div className="space-y-2">
                            {step.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className={`flex items-center space-x-2 ${
                                index % 2 === 0 ? '' : 'flex-row-reverse space-x-reverse'
                              }`}>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Step Number */}
                    <div className="col-span-2 flex justify-center">
                      <div className="relative">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                          {step.step}
                        </div>
                        {!isLast && (
                          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 h-16 w-0.5 bg-border" />
                        )}
                      </div>
                    </div>

                    {/* Visual/Placeholder */}
                    <div className="col-span-5">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center">
                        <IconComponent className={`h-16 w-16 ${step.color} opacity-50`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
                          {step.step}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-primary">Passo {step.step}</div>
                          <h3 className="text-lg font-bold">{step.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {!isLast && (
                    <div className="flex justify-center py-4">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-6 bg-card border rounded-2xl p-8 max-w-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Pronto para começar sua jornada?</h3>
              <p className="text-muted-foreground">
                Junte-se a milhares de empresas que já transformaram seu marketing com o GentaHub
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>Começar Grátis</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="border border-border hover:bg-accent px-8 py-3 rounded-lg font-medium transition-colors">
                Agendar Demonstração
              </button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              ✓ Sem cartão de crédito • ✓ Configuração em 2 minutos • ✓ Suporte 24/7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

