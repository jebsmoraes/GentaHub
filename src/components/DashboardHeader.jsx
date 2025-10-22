import React, { useState } from 'react';
import { 
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Plus,
  ChevronDown,
  LogOut,
  CreditCard,
  HelpCircle
} from 'lucide-react';

const DashboardHeader = () => {
  const [isDark, setIsDark] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const notifications = [
    {
      id: 1,
      title: "Nova campanha criada",
      message: "Sua campanha 'Lançamento Produto X' foi criada com sucesso",
      time: "2 min atrás",
      unread: true
    },
    {
      id: 2,
      title: "Relatório disponível",
      message: "Relatório mensal de performance está pronto para download",
      time: "1 hora atrás",
      unread: true
    },
    {
      id: 3,
      title: "Limite de IA atingido",
      message: "Você usou 90% do seu limite mensal de geração de conteúdo",
      time: "3 horas atrás",
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar campanhas, conteúdos, analytics..."
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary focus:bg-background transition-colors text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Criar Conteúdo</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">2</span>
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notificações</h3>
                    <button className="text-xs text-primary hover:underline">
                      Marcar todas como lidas
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-accent/50 transition-colors ${
                        notification.unread ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`h-2 w-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <button className="w-full text-center text-sm text-primary hover:underline">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">JS</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-card border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">JS</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">João Silva</p>
                      <p className="text-xs text-muted-foreground">joao@empresa.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Meu Perfil</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Faturamento</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Configurações</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">Ajuda</span>
                  </button>
                </div>
                
                <div className="p-2 border-t">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left">
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

