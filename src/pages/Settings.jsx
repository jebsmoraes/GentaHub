import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  Key, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  Trash2, 
  Save,
  Eye,
  EyeOff,
  Instagram,
  Facebook,
  Linkedin,
  Twitter
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    security: true
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'integrations', label: 'Integrações', icon: Key },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'advanced', label: 'Avançado', icon: Globe }
  ];

  const connectedAccounts = [
    {
      platform: 'Instagram',
      icon: Instagram,
      connected: true,
      username: '@gentahub_oficial',
      followers: '12.5K'
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      connected: true,
      username: 'GentaHub Marketing',
      followers: '8.2K'
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      connected: false,
      username: null,
      followers: null
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      connected: false,
      username: null,
      followers: null
    }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize suas informações de perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nome Completo</label>
              <input
                type="text"
                defaultValue="João Silva"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue="joao@gentahub.com"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Empresa</label>
              <input
                type="text"
                defaultValue="GentaHub Marketing"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Cargo</label>
              <input
                type="text"
                defaultValue="Marketing Manager"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              rows={3}
              defaultValue="Especialista em marketing digital com foco em automação e IA. Apaixonado por criar campanhas que geram resultados reais."
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Mantenha sua conta segura com uma senha forte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Senha Atual</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Nova Senha</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirmar Nova Senha</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button>Alterar Senha</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticação de Dois Fatores</CardTitle>
          <CardDescription>
            Adicione uma camada extra de segurança à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">2FA via SMS</p>
              <p className="text-sm text-muted-foreground">
                Receba códigos de verificação por SMS
              </p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chave da API OpenAI</CardTitle>
          <CardDescription>
            Configure sua chave da OpenAI para geração de conteúdo personalizada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Chave da API</label>
            <div className="flex mt-1">
              <input
                type={showApiKey ? 'text' : 'password'}
                defaultValue="sk-proj-abc123...xyz789"
                className="flex-1 px-3 py-2 border rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="outline"
                onClick={() => setShowApiKey(!showApiKey)}
                className="rounded-l-none"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sua chave é criptografada e armazenada com segurança
            </p>
          </div>
          <Button>Salvar Chave</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contas de Redes Sociais</CardTitle>
          <CardDescription>
            Conecte suas contas para publicação automática
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <div key={account.platform} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Icon className="h-8 w-8" />
                    <div>
                      <p className="font-medium">{account.platform}</p>
                      {account.connected ? (
                        <div className="text-sm text-muted-foreground">
                          <p>{account.username}</p>
                          <p>{account.followers} seguidores</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Não conectado</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {account.connected && (
                      <Badge variant="default">Conectado</Badge>
                    )}
                    <Button
                      variant={account.connected ? 'outline' : 'default'}
                      size="sm"
                    >
                      {account.connected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>
            Escolha como e quando receber notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries({
            email: 'Notificações por Email',
            push: 'Notificações Push',
            marketing: 'Emails de Marketing',
            security: 'Alertas de Segurança'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">
                  {key === 'email' && 'Receba atualizações importantes por email'}
                  {key === 'push' && 'Notificações em tempo real no navegador'}
                  {key === 'marketing' && 'Dicas, novidades e ofertas especiais'}
                  {key === 'security' && 'Alertas sobre atividades suspeitas'}
                </p>
              </div>
              <Button
                variant={notifications[key] ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
              >
                {notifications[key] ? 'Ativado' : 'Desativado'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>
            Personalize a aparência da interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {['Escuro', 'Claro', 'Sistema'].map((theme) => (
              <div
                key={theme}
                className="p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded mb-2"></div>
                <p className="text-sm font-medium text-center">{theme}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Exportar Dados</CardTitle>
          <CardDescription>
            Baixe uma cópia dos seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Exportar Dados</Button>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
          <CardDescription>
            Ações irreversíveis que afetam sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-red-800">Excluir Conta</p>
              <p className="text-sm text-red-600">
                Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'security': return renderSecurityTab();
      case 'integrations': return renderIntegrationsTab();
      case 'notifications': return renderNotificationsTab();
      case 'appearance': return renderAppearanceTab();
      case 'advanced': return renderAdvancedTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;

