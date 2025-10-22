import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Sparkles, Zap, Target } from 'lucide-react';
import dashboardMockup from '../assets/gentahub_dashboard_mockup.png';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Powered by AI</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Plataforma{' '}
                <span className="text-primary">All-in-One</span>{' '}
                para Gestão de Marketing
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Gerencie, organize e otimize suas campanhas de marketing com o poder da 
                inteligência artificial. Crie conteúdo, analise performance e automatize 
                fluxos de trabalho em uma única plataforma.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">IA Generativa</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Analytics Avançado</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Começar Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Ver Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Usuários Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500k+</div>
                <div className="text-sm text-muted-foreground">Conteúdos Criados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl" />
            
            {/* Dashboard Image */}
            <div className="relative bg-card rounded-2xl border shadow-2xl overflow-hidden">
              <img 
                src={dashboardMockup} 
                alt="GentaHub Dashboard Preview" 
                className="w-full h-auto"
              />
              
              {/* Overlay with floating elements */}
              <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                Live Preview
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">+127% Engajamento</span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">IA Ativa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

