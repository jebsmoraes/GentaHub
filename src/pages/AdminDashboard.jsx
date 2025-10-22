import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  UserCheck,
  UserX,
  CreditCard,
  Activity,
  Shield,
  Settings,
  FileText,
  Bell
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      mrr: 0,
      arr: 0,
      active_users: 0,
      arpu: 0,
      new_subscriptions: 0,
      cancelled_subscriptions: 0,
      churn_rate: 0
    },
    revenue_by_plan: {},
    recent_transactions: []
  });

  const [systemStats, setSystemStats] = useState({
    users: {
      total: 0,
      active: 0,
      new_today: 0,
      activation_rate: 0
    },
    subscriptions: {
      active: 0,
      trial: 0,
      conversion_rate: 0
    },
    system: {
      active_alerts: 0,
      critical_alerts: 0,
      uptime: '99.9%',
      response_time: '150ms'
    }
  });

  const [loading, setLoading] = useState(true);

  // Mock data for development
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDashboardData({
        metrics: {
          mrr: 45250.00,
          arr: 543000.00,
          active_users: 1247,
          arpu: 36.30,
          new_subscriptions: 89,
          cancelled_subscriptions: 12,
          churn_rate: 2.1
        },
        revenue_by_plan: {
          'Free': 0,
          'Pro': 32450.00,
          'Master': 12800.00
        },
        recent_transactions: [
          {
            id: 1,
            user_email: 'joao@empresa.com',
            amount: 49.00,
            status: 'succeeded',
            description: 'Plano Pro - Mensal',
            created_at: '2025-09-15T10:30:00Z'
          },
          {
            id: 2,
            user_email: 'maria@startup.com',
            amount: 149.00,
            status: 'succeeded',
            description: 'Plano Master - Mensal',
            created_at: '2025-09-15T09:15:00Z'
          }
        ]
      });

      setSystemStats({
        users: {
          total: 1247,
          active: 1089,
          new_today: 23,
          activation_rate: 87.3
        },
        subscriptions: {
          active: 892,
          trial: 156,
          conversion_rate: 71.5
        },
        system: {
          active_alerts: 3,
          critical_alerts: 0,
          uptime: '99.97%',
          response_time: '142ms'
        }
      });

      setLoading(false);
    }, 1000);
  }, []);

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 38500, users: 980 },
    { month: 'Fev', revenue: 41200, users: 1050 },
    { month: 'Mar', revenue: 43800, users: 1120 },
    { month: 'Abr', revenue: 42100, users: 1095 },
    { month: 'Mai', revenue: 44900, users: 1180 },
    { month: 'Jun', revenue: 45250, users: 1247 }
  ];

  const planDistribution = [
    { name: 'Free', value: 355, color: '#6B7280' },
    { name: 'Pro', value: 662, color: '#FF0090' },
    { name: 'Master', value: 230, color: '#8B5CF6' }
  ];

  const userGrowthData = [
    { date: '01/09', new: 15, active: 1180 },
    { date: '02/09', new: 22, active: 1195 },
    { date: '03/09', new: 18, active: 1208 },
    { date: '04/09', new: 28, active: 1230 },
    { date: '05/09', new: 19, active: 1242 },
    { date: '06/09', new: 23, active: 1247 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-pink-500" />
              Dashboard Administrativo
            </h1>
            <p className="text-gray-400 mt-1">Visão geral e controle da plataforma GentaHub</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">AD</span>
              </div>
              <span className="text-sm text-gray-300">Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">MRR (Receita Mensal)</p>
                <p className="text-2xl font-bold text-white">
                  R$ {dashboardData.metrics.mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-green-400 text-sm mt-1">+12.5% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Usuários Ativos</p>
                <p className="text-2xl font-bold text-white">{systemStats.users.active.toLocaleString('pt-BR')}</p>
                <p className="text-blue-400 text-sm mt-1">+{systemStats.users.new_today} hoje</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">ARPU (Receita/Usuário)</p>
                <p className="text-2xl font-bold text-white">
                  R$ {dashboardData.metrics.arpu.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-purple-400 text-sm mt-1">+8.2% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Taxa de Churn</p>
                <p className="text-2xl font-bold text-white">{dashboardData.metrics.churn_rate}%</p>
                <p className="text-red-400 text-sm mt-1">-0.3% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Receita e Crescimento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#FF0090" 
                  fill="#FF0090" 
                  fillOpacity={0.2}
                  name="Receita (R$)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Distribution */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Distribuição por Planos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Transações Recentes</h3>
            <div className="space-y-4">
              {dashboardData.recent_transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.user_email}</p>
                      <p className="text-gray-400 text-sm">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-green-400 text-sm capitalize">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Status do Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">Uptime</span>
                </div>
                <span className="text-green-400 font-semibold">{systemStats.system.uptime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">Tempo Resposta</span>
                </div>
                <span className="text-blue-400 font-semibold">{systemStats.system.response_time}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-300">Alertas Ativos</span>
                </div>
                <span className="text-yellow-400 font-semibold">{systemStats.system.active_alerts}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-400" />
                  <span className="text-gray-300">Alertas Críticos</span>
                </div>
                <span className="text-red-400 font-semibold">{systemStats.system.critical_alerts}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3">Ações Rápidas</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Users className="h-4 w-4 inline mr-2" />
                  Gerenciar Usuários
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <FileText className="h-4 w-4 inline mr-2" />
                  Ver Logs de Auditoria
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="h-4 w-4 inline mr-2" />
                  Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

