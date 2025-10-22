import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Calendar,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  FolderKanban,
  Shield
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mapear IDs para rotas
  const routeMap = {
    'dashboard': '/dashboard',
    'content': '/dashboard/content-creator',
    'calendar': '/dashboard/calendar',
    'analytics': '/dashboard/analytics',
    'social': '/dashboard/social',
    'projects': '/dashboard/projects',
    'admin': '/dashboard/admin',
    'team': '/dashboard/team',
    'billing': '/dashboard/billing',
    'settings': '/dashboard/settings',
    'help': '/dashboard/help'
  };

  // Função para navegar
  const handleNavigation = (itemId) => {
    const route = routeMap[itemId];
    if (route) {
      navigate(route);
    }
    if (setActiveTab) {
      setActiveTab(itemId);
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral'
    },
    {
      id: 'content',
      label: 'Criador de Conteúdo',
      icon: Sparkles,
      description: 'IA Generativa',
      badge: 'IA'
    },
    {
      id: 'calendar',
      label: 'Calendário',
      icon: Calendar,
      description: 'Agendamentos'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Relatórios'
    },
    {
      id: 'social',
      label: 'Redes Sociais',
      icon: MessageSquare,
      description: 'Gerenciamento'
    },
    {
      id: 'projects',
      label: 'Projetos',
      icon: FolderKanban,
      description: 'Gestão de projetos'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Shield,
      description: 'Dashboard administrativo',
      badge: 'ADM'
    },
    {
      id: 'team',
      label: 'Equipe',
      icon: Users,
      description: 'Colaboradores'
    }
  ];

  const bottomItems = [
    {
      id: 'billing',
      label: 'Faturamento',
      icon: CreditCard,
      description: 'Planos e pagamentos'
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      description: 'Preferências'
    },
    {
      id: 'help',
      label: 'Ajuda',
      icon: HelpCircle,
      description: 'Suporte'
    }
  ];

  const MenuItem = ({ item, isBottom = false }) => {
    const IconComponent = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        onClick={() => handleNavigation(item.id)}
        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 transform scale-[1.02]' 
            : 'hover:bg-accent text-muted-foreground hover:text-foreground transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-md'
        }`}
      >
        <div className={`flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
          <IconComponent className="h-5 w-5" />
        </div>
        
        {!isCollapsed && (
          <>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${isActive ? 'text-primary-foreground' : ''}`}>
                {item.label}
              </div>
              <div className={`text-xs ${
                isActive 
                  ? 'text-primary-foreground/80' 
                  : 'text-muted-foreground group-hover:text-muted-foreground'
              }`}>
                {item.description}
              </div>
            </div>
            
            {item.badge && (
              <div className="flex-shrink-0">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isActive 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {item.badge}
                </span>
              </div>
            )}
          </>
        )}
      </button>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-card border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">G</span>
            </div>
            <span className="text-xl font-bold">GentaHub</span>
          </div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-accent transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">João Silva</div>
              <div className="text-xs text-muted-foreground">Plano Professional</div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t space-y-1">
        {bottomItems.map((item) => (
          <MenuItem key={item.id} item={item} isBottom />
        ))}
        
        {/* Logout */}
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 hover:bg-red-50 hover:text-red-600 text-muted-foreground transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-md">
          <LogOut className="h-5 w-5" />
          {!isCollapsed && (
            <span className="text-sm font-medium">Sair</span>
          )}
        </button>
      </div>

      {/* Usage Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="bg-accent/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Uso da IA</span>
              <Zap className="h-3 w-3 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>750 / 1000</span>
                <span className="text-muted-foreground">75%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <button className="text-xs text-primary hover:underline">
              Fazer upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
