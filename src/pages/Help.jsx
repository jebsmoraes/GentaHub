import React, { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, Mail, Phone, FileText, Video, Users, Zap, ChevronRight, ExternalLink } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);

  const helpCategories = [
    { id: 'all', name: 'Todas as Categorias', icon: Book },
    { id: 'getting-started', name: 'Primeiros Passos', icon: Zap },
    { id: 'content-creation', name: 'Criação de Conteúdo', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: Users },
    { id: 'integrations', name: 'Integrações', icon: MessageCircle },
    { id: 'billing', name: 'Faturamento', icon: Mail }
  ];

  const helpArticles = [
    {
      id: 1,
      title: 'Como começar com o GentaHub',
      category: 'getting-started',
      description: 'Guia completo para configurar sua conta e começar a usar a plataforma.',
      readTime: '5 min',
      popularity: 'high',
      tags: ['setup', 'básico', 'tutorial']
    },
    {
      id: 2,
      title: 'Gerando conteúdo com IA',
      category: 'content-creation',
      description: 'Aprenda a usar as ferramentas de IA para criar conteúdo envolvente.',
      readTime: '8 min',
      popularity: 'high',
      tags: ['ia', 'conteúdo', 'criação']
    },
    {
      id: 3,
      title: 'Conectando suas redes sociais',
      category: 'integrations',
      description: 'Passo a passo para conectar Instagram, Facebook, LinkedIn e outras plataformas.',
      readTime: '6 min',
      popularity: 'medium',
      tags: ['integração', 'redes sociais', 'conexão']
    },
    {
      id: 4,
      title: 'Entendendo seus analytics',
      category: 'analytics',
      description: 'Como interpretar métricas e relatórios para otimizar sua estratégia.',
      readTime: '10 min',
      popularity: 'medium',
      tags: ['analytics', 'métricas', 'relatórios']
    },
    {
      id: 5,
      title: 'Gerenciando planos e pagamentos',
      category: 'billing',
      description: 'Tudo sobre planos, upgrades, downgrades e faturamento.',
      readTime: '4 min',
      popularity: 'low',
      tags: ['planos', 'pagamento', 'faturamento']
    },
    {
      id: 6,
      title: 'Agendamento de posts',
      category: 'content-creation',
      description: 'Como agendar e gerenciar suas publicações em múltiplas plataformas.',
      readTime: '7 min',
      popularity: 'high',
      tags: ['agendamento', 'posts', 'calendário']
    }
  ];

  const quickActions = [
    {
      title: 'Chat ao Vivo',
      description: 'Fale conosco em tempo real',
      icon: MessageCircle,
      action: () => setShowContactModal(true),
      available: true
    },
    {
      title: 'Enviar Email',
      description: 'Envie sua dúvida por email',
      icon: Mail,
      action: () => window.open('mailto:support@gentahub.com'),
      available: true
    },
    {
      title: 'Agendar Chamada',
      description: 'Agende uma conversa com nosso time',
      icon: Phone,
      action: () => setShowContactModal(true),
      available: false
    },
    {
      title: 'Tutoriais em Vídeo',
      description: 'Assista nossos tutoriais',
      icon: Video,
      action: () => window.open('https://youtube.com/@gentahub'),
      available: true
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPopularityColor = (popularity) => {
    switch (popularity) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          Central de Ajuda
        </h1>
        <p className="text-gray-400 mt-2">Encontre respostas, tutoriais e entre em contato conosco</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar artigos, tutoriais, perguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            disabled={!action.available}
            className={`p-6 bg-card border rounded-lg text-left transition-all hover:shadow-lg hover:-translate-y-1 ${
              action.available ? 'hover:border-primary cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <action.icon className={`w-8 h-8 mb-3 ${action.available ? 'text-primary' : 'text-gray-500'}`} />
            <h3 className="font-semibold text-white mb-1">{action.title}</h3>
            <p className="text-gray-400 text-sm">{action.description}</p>
            {!action.available && (
              <span className="text-xs text-yellow-500 mt-2 block">Em breve</span>
            )}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {helpCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white border-primary'
                : 'bg-card text-gray-300 border-gray-700 hover:border-primary'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-card border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-gray-400 mb-4">{article.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{article.readTime} de leitura</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPopularityColor(article.popularity)}`}>
                  {article.popularity === 'high' ? 'Popular' : article.popularity === 'medium' ? 'Médio' : 'Básico'}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {article.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Nenhum artigo encontrado</h3>
          <p className="text-gray-500">Tente ajustar sua busca ou entre em contato conosco</p>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Entrar em Contato</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Assunto</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Selecione um assunto</option>
                  <option value="technical">Problema Técnico</option>
                  <option value="billing">Dúvida de Faturamento</option>
                  <option value="feature">Solicitação de Recurso</option>
                  <option value="general">Dúvida Geral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="Descreva sua dúvida ou problema..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
