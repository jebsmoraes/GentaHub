import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ana Silva",
      role: "Diretora de Marketing",
      company: "TechStart",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      content: "O GentaHub revolucionou nossa estratégia de marketing. Em 3 meses, aumentamos nosso engajamento em 300% e reduzimos o tempo de criação de conteúdo em 70%.",
      rating: 5,
      metrics: "+300% Engajamento"
    },
    {
      name: "Carlos Mendes",
      role: "CEO",
      company: "Digital Agency",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      content: "A IA generativa do GentaHub nos permite criar campanhas personalizadas para cada cliente em minutos. Nossa produtividade aumentou drasticamente.",
      rating: 5,
      metrics: "+250% Produtividade"
    },
    {
      name: "Mariana Costa",
      role: "Social Media Manager",
      company: "Fashion Brand",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content: "Nunca foi tão fácil gerenciar múltiplas redes sociais. O dashboard do GentaHub é intuitivo e os insights são incríveis. Recomendo para todos!",
      rating: 5,
      metrics: "+180% Alcance"
    },
    {
      name: "Roberto Lima",
      role: "Growth Hacker",
      company: "E-commerce Plus",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      content: "Os workflows automatizados do GentaHub nos economizam 20 horas por semana. Agora podemos focar no que realmente importa: estratégia e resultados.",
      rating: 5,
      metrics: "20h/semana economizadas"
    },
    {
      name: "Juliana Santos",
      role: "Marketing Director",
      company: "SaaS Company",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
      content: "A integração com todas as plataformas é perfeita. Conseguimos centralizar toda nossa operação de marketing em um só lugar. Simplesmente fantástico!",
      rating: 5,
      metrics: "+400% ROI"
    },
    {
      name: "Pedro Oliveira",
      role: "Founder",
      company: "Startup Hub",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      content: "Como startup, precisávamos de uma solução completa e acessível. O GentaHub superou todas as expectativas. É como ter uma agência inteira na palma da mão.",
      rating: 5,
      metrics: "+500% Conversões"
    }
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Depoimentos</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            O que nossos clientes{' '}
            <span className="text-primary">estão dizendo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais de 10.000 empresas confiam no GentaHub para transformar 
            suas estratégias de marketing e alcançar resultados extraordinários.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10k+</div>
            <div className="text-sm text-muted-foreground">Clientes Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Suporte Disponível</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.content}"
                </p>

                {/* Metrics */}
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium inline-block">
                  {testimonial.metrics}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-4 bg-card border rounded-2xl p-8">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <img 
                  key={index}
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full border-2 border-background object-cover"
                />
              ))}
              <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                +10k
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Junte-se a mais de 10.000 empresas</h3>
              <p className="text-muted-foreground">
                Comece sua transformação digital hoje mesmo
              </p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
              Começar Grátis Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

