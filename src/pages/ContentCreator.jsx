import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  PenTool, 
  Image, 
  FileText, 
  History, 
  Sparkles, 
  Download,
  Copy,
  Edit3,
  Trash2,
  Search,
  Filter,
  Plus,
  Upload,
  Wand2,
  Eye,
  Save,
  RefreshCw,
  Share
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ContentCreator = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentHistory, setContentHistory] = useState([
    {
      id: 1,
      type: 'text',
      title: 'Instagram Post - Product Launch',
      content: '🚀 Exciting news! Our new product is finally here...',
      createdAt: '2024-01-15',
      status: 'published'
    },
    {
      id: 2,
      type: 'image',
      title: 'Banner - Summer Campaign',
      content: 'summer_banner.png',
      createdAt: '2024-01-14',
      status: 'draft'
    },
    {
      id: 3,
      type: 'text',
      title: 'Blog Article - SEO Tips',
      content: 'Complete guide to SEO optimization...',
      createdAt: '2024-01-13',
      status: 'published'
    }
  ]);

  const [templates] = useState([
    {
      id: 1,
      name: 'Instagram Post',
      category: 'Social Media',
      preview: 'Perfect for engaging Instagram content...'
    },
    {
      id: 2,
      name: 'Blog Article',
      category: 'Content Marketing',
      preview: 'SEO-optimized blog post structure...'
    },
    {
      id: 3,
      name: 'Email Campaign',
      category: 'Email Marketing',
      preview: 'High-converting email template...'
    },
    {
      id: 4,
      name: 'Product Description',
      category: 'E-commerce',
      preview: 'Compelling product descriptions...'
    }
  ]);

  const generateContent = async (type, prompt) => {
    setIsGenerating(true);
    
    try {
      // Usar a API real do OpenAI
      const response = await fetch('/api/openai/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('gentahub_token')}`
        },
        body: JSON.stringify({
          prompt,
          content_type: type
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar conteúdo');
      }

      const data = await response.json();
      setGeneratedContent(data.text);
      
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      
      // Fallback para dados mock em caso de erro
      if (type === 'text') {
        setGeneratedContent(`🚀 Transforme sua estratégia de marketing com IA!

Você sabia que empresas que usam inteligência artificial em suas campanhas têm 37% mais engajamento? 

✨ Com o GentaHub, você pode:
• Criar conteúdo personalizado em segundos
• Analisar performance em tempo real
• Automatizar workflows complexos
• Otimizar campanhas automaticamente

Pronto para revolucionar seu marketing? 

#MarketingDigital #IA #GentaHub #Inovacao`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const TextGeneration = () => {
    const [prompt, setPrompt] = useState('');
    const [contentType, setContentType] = useState('social-post');

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <PenTool className="w-6 h-6 text-pink-500" />
          <h3 className="text-xl font-semibold text-white">Text Generation</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content Type
            </label>
            <select 
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="social-post">Social Media Post</option>
              <option value="blog-article">Blog Article</option>
              <option value="email">Email Campaign</option>
              <option value="product-desc">Product Description</option>
              <option value="video-script">Video Script</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe what you want to create
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write an introduction for the topic of..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <button
            onClick={() => generateContent('text', prompt)}
            disabled={!prompt || isGenerating}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <LoadingSpinner size="sm" text="Gerando..." showText={true} />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Gerar Conteúdo
              </>
            )}
          </button>

          {generatedContent && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-300">Generated Content</h4>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-white whitespace-pre-wrap text-sm">
                {generatedContent}
              </div>
              <div className="flex gap-3 mt-4">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <Share className="w-4 h-4" />
                  Publish Now
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ImageGeneration = () => {
    const [imagePrompt, setImagePrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Image className="w-6 h-6 text-pink-500" />
          <h3 className="text-xl font-semibold text-white">Image Creation</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe the image you want to create
            </label>
            <textarea
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="A modern minimalist banner for social media with..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            {generatedImage ? (
              <div className="space-y-4">
                <div className="w-full h-48 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium">Generated Image Preview</span>
                </div>
                <div className="flex gap-2 justify-center">
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-300 font-medium">Drag & drop an image or</p>
                  <p className="text-gray-400 text-sm">Generate with AI</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setGeneratedImage(true)}
            disabled={!imagePrompt || isGenerating}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <LoadingSpinner size="sm" text="Criando Imagem..." showText={true} />
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Criar Imagem
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const Templates = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredTemplates = templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-pink-500" />
          <h3 className="text-xl font-semibold text-white">Templates</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Social Media">Social Media</option>
              <option value="Content Marketing">Content Marketing</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <div key={template.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{template.name}</h4>
                  <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{template.preview}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-sm py-2 px-3 rounded transition-colors">
                    Use Template
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ContentHistory = () => {
    const [filter, setFilter] = useState('all');

    const filteredHistory = contentHistory.filter(item => {
      return filter === 'all' || item.status === filter;
    });

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-pink-500" />
            <h3 className="text-xl font-semibold text-white">Content History</h3>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Content</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredHistory.map(item => (
            <div key={item.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white text-sm">{item.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.status === 'published' ? 'bg-green-500 text-white' :
                      item.status === 'draft' ? 'bg-yellow-500 text-black' :
                      'bg-blue-500 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2 truncate">{item.content}</p>
                  <p className="text-gray-400 text-xs">{item.createdAt}</p>
                </div>
                <div className="flex gap-1 ml-4">
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors text-sm">
          Load More
        </button>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Creator</h1>
            <p className="text-gray-400 mt-1">AI-powered tools to generate content quickly and easily</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">AI Credits:</span>
              <span className="text-sm font-medium text-white">750/1000</span>
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextGeneration />
          <ImageGeneration />
          <Templates />
          <ContentHistory />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentCreator;

