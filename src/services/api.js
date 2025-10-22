// Configuração base da API
const API_BASE_URL = 'http://localhost:5000/api';

// Classe para gerenciar requisições à API
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('gentahub_token');
  }

  // Configurar headers padrão
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Método genérico para fazer requisições
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.auth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Métodos de autenticação
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      auth: false,
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('gentahub_token', response.token);
    }

    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      auth: false,
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('gentahub_token', response.token);
    }

    return response;
  }

  async verifyToken() {
    if (!this.token) return null;

    try {
      return await this.request('/auth/verify-token', {
        method: 'POST',
        body: JSON.stringify({ token: this.token }),
      });
    } catch (error) {
      this.logout();
      return null;
    }
  }

  async getProfile() {
    return await this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return await this.request('/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return await this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('gentahub_token');
  }

  // Métodos da API OpenAI
  async generateText(prompt, platform = 'instagram', contentType = 'post') {
    return await this.request('/openai/generate-text', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
        platform,
        content_type: contentType,
      }),
    });
  }

  async generateImage(prompt, size = '1024x1024') {
    return await this.request('/openai/generate-image', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
  }

  async analyzeContent(content, platform = 'instagram') {
    return await this.request('/openai/analyze-content', {
      method: 'POST',
      body: JSON.stringify({
        content,
        platform,
      }),
    });
  }

  async suggestHashtags(content, platform = 'instagram', niche = 'marketing') {
    return await this.request('/openai/suggest-hashtags', {
      method: 'POST',
      body: JSON.stringify({
        content,
        platform,
        niche,
      }),
    });
  }

  async optimizeContent(content, platform = 'instagram', goal = 'engagement') {
    return await this.request('/openai/optimize-content', {
      method: 'POST',
      body: JSON.stringify({
        content,
        platform,
        goal,
      }),
    });
  }

  // Métodos da API Instagram
  async connectInstagramAccount(accessToken) {
    return await this.request('/instagram/connect-account', {
      method: 'POST',
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });
  }

  async getAccountInsights(accountId) {
    return await this.request(`/instagram/account-insights/${accountId}`);
  }

  async getInstagramMedia(accountId, limit = 25) {
    return await this.request(`/instagram/media/${accountId}?limit=${limit}`);
  }

  async publishContent(accountId, accessToken, imageUrl, caption) {
    return await this.request('/instagram/publish-content', {
      method: 'POST',
      body: JSON.stringify({
        account_id: accountId,
        access_token: accessToken,
        image_url: imageUrl,
        caption,
      }),
    });
  }

  async scheduleContent(accountId, imageUrl, caption, scheduledTime) {
    return await this.request('/instagram/schedule-content', {
      method: 'POST',
      body: JSON.stringify({
        account_id: accountId,
        image_url: imageUrl,
        caption,
        scheduled_time: scheduledTime,
      }),
    });
  }

  async getAnalytics(accountId, period = '30') {
    return await this.request(`/instagram/analytics/${accountId}?period=${period}`);
  }

  // Métodos auxiliares
  async createDemoUser() {
    return await this.request('/auth/create-demo-user', {
      method: 'POST',
      auth: false,
    });
  }

  async healthCheck() {
    return await this.request('/health', { auth: false });
  }

  // Verificar se está autenticado
  isAuthenticated() {
    return !!this.token;
  }

  // Obter dados mock para desenvolvimento
  getMockDashboardData() {
    return {
      kpis: [
        {
          title: "Total de Seguidores",
          value: "127.5K",
          change: "+12.5%",
          changeType: "positive",
        },
        {
          title: "Engajamento Médio",
          value: "8.4%",
          change: "+2.1%",
          changeType: "positive",
        },
        {
          title: "Alcance Total",
          value: "2.1M",
          change: "+18.2%",
          changeType: "positive",
        },
        {
          title: "Taxa de Conversão",
          value: "3.2%",
          change: "-0.5%",
          changeType: "negative",
        }
      ],
      engagementData: [
        { name: 'Jan', engajamento: 4000, alcance: 2400, conversoes: 240 },
        { name: 'Fev', engajamento: 3000, alcance: 1398, conversoes: 221 },
        { name: 'Mar', engajamento: 2000, alcance: 9800, conversoes: 229 },
        { name: 'Abr', engajamento: 2780, alcance: 3908, conversoes: 200 },
        { name: 'Mai', engajamento: 1890, alcance: 4800, conversoes: 218 },
        { name: 'Jun', engajamento: 2390, alcance: 3800, conversoes: 250 },
        { name: 'Jul', engajamento: 3490, alcance: 4300, conversoes: 210 }
      ],
      platformData: [
        { name: 'Instagram', value: 35, color: '#E1306C' },
        { name: 'Facebook', value: 25, color: '#1877F2' },
        { name: 'LinkedIn', value: 20, color: '#0A66C2' },
        { name: 'Twitter', value: 15, color: '#1DA1F2' },
        { name: 'TikTok', value: 5, color: '#000000' }
      ],
      recentPosts: [
        {
          id: 1,
          title: "Lançamento do novo produto",
          platform: "Instagram",
          status: "Publicado",
          engagement: "1.2K",
          date: "2 horas atrás",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop"
        },
        {
          id: 2,
          title: "Dicas de marketing digital",
          platform: "LinkedIn",
          status: "Agendado",
          engagement: "856",
          date: "Amanhã às 14h",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop"
        },
        {
          id: 3,
          title: "Behind the scenes",
          platform: "Stories",
          status: "Publicado",
          engagement: "2.1K",
          date: "5 horas atrás",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop"
        }
      ]
    };
  }
}

// Instância global da API
const apiService = new ApiService();

export default apiService;

