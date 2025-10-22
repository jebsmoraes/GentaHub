import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  Users, 
  Calendar,
  Download,
  Filter,
  Search,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminFinancial = () => {
  const [financialData, setFinancialData] = useState({
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

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      setFinancialData({
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
          },
          {
            id: 3,
            user_email: 'carlos@agencia.com',
            amount: 49.00,
            status: 'failed',
            description: 'Plano Pro - Mensal',
            created_at: '2025-09-14T14:20:00Z'
          },
          {
            id: 4,
            user_email: 'ana@consultoria.com',
            amount: 49.00,
            status: 'succeeded',
            description: 'Plano Pro - Mensal',
            created_at: '2025-09-14T11:45:00Z'
          },
          {
            id: 5,
            user_email: 'pedro@freelance.com',
            amount: 149.00,
            status: 'pending',
            description: 'Plano Master - Mensal',
            created_at: '2025-09-13T16:30:00Z'
          }
        ]
      });

      setSubscriptions([
        {
          id: 1,
          user: { id: 1, name: 'João Silva', email: 'joao@empresa.com' },
          plan_name: 'Pro',
          status: 'active',
          amount: 49.00,
          billing_cycle: 'monthly',
          current_period_start: '2025-09-15T10:30:00Z',
          current_period_end: '2025-10-15T10:30:00Z',
          cancel_at_period_end: false,
          created_at: '2025-01-15T10:30:00Z',
          stripe_subscription_id: 'sub_1234567890'
        },
        {
          id: 2,
          user: { id: 2, name: 'Maria Santos', email: 'maria@startup.com' },
          plan_name: 'Master',
          status: 'active',
          amount: 149.00,
          billing_cycle: 'monthly',
          current_period_start: '2025-09-20T09:15:00Z',
          current_period_end: '2025-10-20T09:15:00Z',
          cancel_at_period_end: false,
          created_at: '2025-02-20T09:15:00Z',
          stripe_subscription_id: 'sub_0987654321'
        },
        {
          id: 3,
          user: { id: 3, name: 'Ana Costa', email: 'ana@consultoria.com' },
          plan_name: 'Pro',
          status: 'active',
          amount: 49.00,
          billing_cycle: 'monthly',
          current_period_start: '2025-09-05T14:30:00Z',
          current_period_end: '2025-10-05T14:30:00Z',
          cancel_at_period_end: true,
          created_at: '2025-03-05T14:30:00Z',
          stripe_subscription_id: 'sub_1122334455'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [dateRange]);

  // Chart data
  const revenueData = [
    { month: 'Jan', mrr: 38500, new_customers: 45, churn: 8 },
    { month: 'Fev', mrr: 41200, new_customers: 52, churn: 12 },
    { month: 'Mar', mrr: 43800, new_customers: 48, churn: 9 },
    { month: 'Abr', mrr: 42100, new_customers: 38, churn: 15 },
    { month: 'Mai', mrr: 44900, new_customers: 61, churn: 11 },
    { month: 'Jun', mrr: 45250, new_customers: 58, churn: 10 }
  ];

  const planRevenueData = [
    { name: 'Free', value: 0, customers: 355, color: '#6B7280' },
    { name: 'Pro', value: 32450, customers: 662, color: '#FF0090' },
    { name: 'Master', value: 12800, customers: 230, color: '#8B5CF6' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'succeeded': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'active': 'bg-green-100 text-green-800',
      'canceled': 'bg-red-100 text-red-800',
      'past_due': 'bg-orange-100 text-orange-800'
    };

    const labels = {
      'succeeded': 'Sucesso',
      'failed': 'Falhou',
      'pending': 'Pendente',
      'active': 'Ativo',
      'canceled': 'Cancelado',
      'past_due': 'Em Atraso'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

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
              <DollarSign className="h-6 w-6 text-pink-500" />
              Controle Financeiro
            </h1>
            <p className="text-gray-400 mt-1">Métricas financeiras, receitas e assinaturas</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
                { id: 'subscriptions', label: 'Assinaturas', icon: CreditCard },
                { id: 'transactions', label: 'Transações', icon: DollarSign }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-pink-500 text-pink-500'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">MRR (Receita Mensal)</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(financialData.metrics.mrr)}
                    </p>
                    <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12.5% vs mês anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ARR (Receita Anual)</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(financialData.metrics.arr)}
                    </p>
                    <p className="text-blue-400 text-sm mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +18.3% vs ano anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ARPU (Receita/Usuário)</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(financialData.metrics.arpu)}
                    </p>
                    <p className="text-purple-400 text-sm mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8.2% vs mês anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Taxa de Churn</p>
                    <p className="text-2xl font-bold text-white">{financialData.metrics.churn_rate}%</p>
                    <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      -0.3% vs mês anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-red-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Evolução da Receita</h3>
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
                      dataKey="mrr" 
                      stroke="#FF0090" 
                      fill="#FF0090" 
                      fillOpacity={0.2}
                      name="MRR (R$)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue by Plan */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Receita por Plano</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={planRevenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {planRevenueData.map((entry, index) => (
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
                      formatter={(value) => [formatCurrency(value), 'Receita']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Growth */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Crescimento de Clientes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
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
                  <Bar dataKey="new_customers" fill="#10B981" name="Novos Clientes" />
                  <Bar dataKey="churn" fill="#EF4444" name="Churn" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* Subscription Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Assinaturas Ativas</p>
                    <p className="text-2xl font-bold text-white">{subscriptions.filter(s => s.status === 'active').length}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-400" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Cancelamentos Pendentes</p>
                    <p className="text-2xl font-bold text-white">{subscriptions.filter(s => s.cancel_at_period_end).length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Receita Total</p>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(subscriptions.reduce((sum, sub) => sum + sub.amount, 0))}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-pink-400" />
                </div>
              </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Assinaturas Ativas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Plano
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Próxima Cobrança
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {subscription.user.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {subscription.user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.plan_name === 'Pro' ? 'bg-pink-100 text-pink-800' :
                            subscription.plan_name === 'Master' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {subscription.plan_name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {formatCurrency(subscription.amount)}
                          <span className="text-gray-400 text-xs ml-1">
                            /{subscription.billing_cycle === 'monthly' ? 'mês' : 'ano'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(subscription.status)}
                          {subscription.cancel_at_period_end && (
                            <div className="text-xs text-yellow-400 mt-1">
                              Cancelamento pendente
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(subscription.current_period_end)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors mr-3">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-300 transition-colors">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Transaction Filters */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar transações..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option value="all">Todos os Status</option>
                  <option value="succeeded">Sucesso</option>
                  <option value="failed">Falhou</option>
                  <option value="pending">Pendente</option>
                </select>
                <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option value="all">Todos os Planos</option>
                  <option value="Pro">Pro</option>
                  <option value="Master">Master</option>
                </select>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors">
                  Limpar Filtros
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Transações Recentes</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {financialData.recent_transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {transaction.user_email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(transaction.status)}
                            {getStatusBadge(transaction.status)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(transaction.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFinancial;

