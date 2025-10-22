import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, MoreVertical, UserPlus, Settings, Shield, Crown, User } from 'lucide-react';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@gentahub.com',
      role: 'Owner',
      avatar: 'JD',
      status: 'online',
      joinDate: '2023-01-15',
      lastActive: 'Agora',
      permissions: ['admin', 'billing', 'content', 'analytics']
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@gentahub.com',
      role: 'Admin',
      avatar: 'MS',
      status: 'online',
      joinDate: '2023-02-20',
      lastActive: '5 min atrás',
      permissions: ['content', 'analytics', 'social']
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@gentahub.com',
      role: 'Editor',
      avatar: 'PC',
      status: 'offline',
      joinDate: '2023-03-10',
      lastActive: '2 horas atrás',
      permissions: ['content', 'social']
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana@gentahub.com',
      role: 'Viewer',
      avatar: 'AO',
      status: 'online',
      joinDate: '2023-04-05',
      lastActive: '1 min atrás',
      permissions: ['analytics']
    }
  ];

  const roles = [
    { value: 'all', label: 'Todos os Papéis' },
    { value: 'Owner', label: 'Proprietário' },
    { value: 'Admin', label: 'Administrador' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Viewer', label: 'Visualizador' }
  ];

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Owner': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'Admin': return <Shield className="w-4 h-4 text-red-500" />;
      case 'Editor': return <Settings className="w-4 h-4 text-blue-500" />;
      case 'Viewer': return <User className="w-4 h-4 text-gray-500" />;
      default: return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Owner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'Editor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Viewer': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Equipe
          </h1>
          <p className="text-gray-400 mt-2">Gerencie membros da equipe e permissões</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Convidar Membro
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total de Membros</p>
              <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Membros Online</p>
              <p className="text-2xl font-bold text-white">
                {teamMembers.filter(m => m.status === 'online').length}
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Administradores</p>
              <p className="text-2xl font-bold text-white">
                {teamMembers.filter(m => m.role === 'Admin' || m.role === 'Owner').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Novos este mês</p>
              <p className="text-2xl font-bold text-white">2</p>
            </div>
            <UserPlus className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar membros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 bg-card border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {roles.map(role => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>
      </div>

      {/* Team Members List */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">Membro</th>
                <th className="text-left p-4 text-gray-300 font-medium">Papel</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Última Atividade</th>
                <th className="text-left p-4 text-gray-300 font-medium">Data de Entrada</th>
                <th className="text-right p-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-t border-gray-700 hover:bg-gray-800/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-gray-400 text-sm">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(member.role)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span className="text-gray-300 capitalize">{member.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{member.lastActive}</td>
                  <td className="p-4 text-gray-300">{new Date(member.joinDate).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-white p-1 rounded">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Convidar Novo Membro</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@exemplo.com"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Papel</label>
                <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Viewer">Visualizador</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Administrador</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Enviar Convite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
