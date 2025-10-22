import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Sparkles, 
  BarChart3, 
  Workflow, 
  Calendar, 
  MessageSquare, 
  Target,
  Zap,
  Users
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "IA Generativa",
      description: "Crie conteúdo de alta qualidade para suas campanhas usando GPT-4 e DALL-E. Textos, imagens e vídeos personalizados em segundos.",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Monitore performance em tempo real com dashboards interativos. Insights acionáveis para otimizar suas campanhas.",
      color: "text-blue-500"
    },
    {
      icon: Workflow,
      title: "Automação de Fluxos",
      description: "Configure workflows inteligentes que executam ações baseadas em triggers. Economize tempo e aumente eficiência.",
      color: "text-green-500"
    },
    {
      icon: Calendar,
      title: "Calendário Inteligente",
      description: "Planeje e agende publicações em múltiplas plataformas. Otimização automática de horários baseada em dados.",
      color: "text-orange-500"
    },
    {
      icon: MessageSquare,
      title: "Gestão de Comentários",
      description: "Monitore e responda comentários de todas as redes sociais em um só lugar. IA sugere respostas personalizadas.",
      color: "text-pink-500"
    },
    {
      icon: Target,
      title: "Segmentação Avançada",
      description: "Crie audiências precisas com base em comportamento, interesses e dados demográficos para campanhas mais efetivas.",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Integração Nativa",
      description: "Conecte-se com Instagram, Facebook, LinkedIn, Twitter e mais. Sincronização automática e em tempo real.",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Colaboração em Equipe",
      description: "Trabalhe em equipe com permissões granulares, aprovações de conteúdo e histórico completo de atividades.",
      color: "text-indigo-500"
    }
  ];

  return (
    <section id="recursos" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Recursos Poderosos</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Tudo que você precisa para{' '}
            <span className="text-primary">dominar o marketing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa com ferramentas avançadas de IA, analytics em tempo real 
            e automação inteligente para maximizar seus resultados.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="space-y-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors`}>
                    <IconComponent className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-card border rounded-2xl p-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Pronto para começar?</h3>
              <p className="text-muted-foreground">
                Experimente todos os recursos gratuitamente por 14 dias.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                Começar Grátis
              </button>
              <button className="border border-border hover:bg-accent px-6 py-3 rounded-lg font-medium transition-colors">
                Agendar Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

