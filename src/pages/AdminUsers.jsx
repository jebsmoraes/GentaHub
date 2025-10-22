import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  UserCheck, 
  UserX,
  Mail,
  Calendar,
  Building,
  CreditCard,
  Activity,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          first_name: 'João',
          last_name: 'Silva',
          email: 'joao@empresa.com',
          company: 'Tech Solutions',
          is_verified: true,
          created_at: '2025-01-15T10:30:00Z',
          last_login: '2025-09-15T14:20:00Z',
          subscription: {
            plan_name: 'Pro',
            status: 'active',
            current_period_end: '2025-10-15T10:30:00Z'
          }
        },
        {
          id: 2,
          first_name: 'Maria',
          last_name: 'Santos',
          email: 'maria@startup.com',
          company: 'Digital Startup',
          is_verified: true,
          created_at: '2025-02-20T09:15:00Z',
          last_login: '2025-09-14T16:45:00Z',
          subscription: {
            plan_name: 'Master',
            status: 'active',
            current_period_end: '2025-11-20T09:15:00Z'
          }
        },
        {
          id: 3,
          first_name: 'Carlos',
          last_name: 'Oliveira',
          email: 'carlos@agencia.com',
          company: 'Marketing Agency',
          is_verified: false,
          created_at: '2025-09-10T11:00:00Z',
          last_login: null,
          subscription: null
        },
        {
          id: 4,
          first_name: 'Ana',
          last_name: 'Costa',
          email: 'ana@consultoria.com',
          company: 'Business Consulting',
          is_verified: true,
          created_at: '2025-03-05T14:30:00Z',
          last_login: '2025-09-15T08:30:00Z',
          subscription: {
            plan_name: 'Pro',
            status: 'active',
            current_period_end: '2025-10-05T14:30:00Z'
          }
        },
        {
          id: 5,
          first_name: 'Pedro',
          last_name: 'Mendes',
          email: 'pedro@freelance.com',
          company: 'Freelancer',
          is_verified: true,
          created_at: '2025-08-01T16:20:00Z',
          last_login: '2025-09-13T12:15:00Z',
          subscription: {
            plan_name: 'Free',
            status: 'active',
            current_period_end: null
          }
        }
      ];

      setUsers(mockUsers);
      setTotalPages(1);
      setLoading(false);
    }, 1000);
  }, [currentPage, searchTerm, statusFilter, planFilter]);

  const handleUserAction = (userId, action) => {
    // Mock action handling
    console.log(`Action ${action} for user ${userId}`);
    
    if (action === 'toggle_status') {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, is_verified: !user.is_verified }
          : user
      ));
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isVerified) => {
    return isVerified ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <UserCheck className="h-3 w-3 mr-1" />
        Ativo
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <UserX className="h-3 w-3 mr-1" />
        Inativo
      </span>
    );
  };

  const getPlanBadge = (subscription) => {
    if (!subscription) {
      return <span className="text-gray-400 text-sm">Sem plano</span>;
    }

    const colors = {
      'Free': 'bg-gray-100 text-gray-800',
      'Pro': 'bg-pink-100 text-pink-800',
      'Master': 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[subscription.plan_name] || 'bg-gray-100 text-gray-800'}`}>
        {subscription.plan_name}
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
              <Users className="h-6 w-6 text-pink-500" />
              Gestão de Usuários
            </h1>
            <p className="text-gray-400 mt-1">Gerencie usuários, planos e atividades da plataforma</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">Todos os Planos</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
              <option value="Master">Master</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPlanFilter('all');
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Plano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Último Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Cadastro
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-white">
                            {user.first_name[0]}{user.last_name[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          {user.company && (
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Building className="h-3 w-3" />
                              {user.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.is_verified)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPlanBadge(user.subscription)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(user.last_login)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openUserModal(user)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'toggle_status')}
                          className={`transition-colors ${
                            user.is_verified 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-green-400 hover:text-green-300'
                          }`}
                          title={user.is_verified ? 'Desativar' : 'Ativar'}
                        >
                          {user.is_verified ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-300 transition-colors"
                          title="Mais opções"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-600">
            <div className="text-sm text-gray-300">
              Mostrando {users.length} de {users.length} usuários
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 bg-gray-600 rounded text-sm text-white">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Detalhes do Usuário</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {selectedUser.first_name[0]}{selectedUser.last_name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h3>
                  <p className="text-gray-400">{selectedUser.email}</p>
                  {selectedUser.company && (
                    <p className="text-gray-500 text-sm">{selectedUser.company}</p>
                  )}
                </div>
              </div>

              {/* Status and Plan */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  {getStatusBadge(selectedUser.is_verified)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Plano</label>
                  {getPlanBadge(selectedUser.subscription)}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cadastro</label>
                  <p className="text-white">{formatDate(selectedUser.created_at)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Último Login</label>
                  <p className="text-white">{formatDate(selectedUser.last_login)}</p>
                </div>
              </div>

              {/* Subscription Details */}
              {selectedUser.subscription && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Detalhes da Assinatura</label>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-white capitalize">{selectedUser.subscription.status}</p>
                      </div>
                      {selectedUser.subscription.current_period_end && (
                        <div>
                          <p className="text-sm text-gray-400">Próxima Cobrança</p>
                          <p className="text-white">{formatDate(selectedUser.subscription.current_period_end)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleUserAction(selectedUser.id, 'toggle_status')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedUser.is_verified
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {selectedUser.is_verified ? 'Desativar Usuário' : 'Ativar Usuário'}
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Enviar Email
                </button>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors">
                  Ver Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

