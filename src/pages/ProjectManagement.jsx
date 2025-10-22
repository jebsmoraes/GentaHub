import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Kanban,
  List,
  Calendar,
  BarChart3,
  Plus,
  Search,
  Filter,
  Users,
  Clock,
  Flag,
  MessageCircle,
  Paperclip,
  MoreHorizontal,
  Edit3,
  Trash2,
  Copy,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Send,
  X
} from 'lucide-react';

const ProjectManagement = () => {
  const [viewMode, setViewMode] = useState('kanban'); // kanban, list, timeline, calendar
  const [selectedProject, setSelectedProject] = useState('marketing-campaign');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [projects] = useState([
    {
      id: 'marketing-campaign',
      name: 'Q1 Marketing Campaign',
      description: 'Launch campaign for new product line',
      status: 'active',
      progress: 65,
      dueDate: '2024-03-15',
      team: ['JD', 'SM', 'AR', 'MJ'],
      color: 'bg-pink-500'
    },
    {
      id: 'website-redesign',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      status: 'active',
      progress: 40,
      dueDate: '2024-04-30',
      team: ['SM', 'AR'],
      color: 'bg-blue-500'
    },
    {
      id: 'content-strategy',
      name: 'Content Strategy 2024',
      description: 'Develop comprehensive content strategy',
      status: 'planning',
      progress: 15,
      dueDate: '2024-02-28',
      team: ['JD', 'MJ'],
      color: 'bg-green-500'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design landing page mockups',
      description: 'Create initial mockups for the new product landing page',
      status: 'todo',
      priority: 'high',
      assignee: 'SM',
      dueDate: '2024-01-25',
      project: 'marketing-campaign',
      tags: ['design', 'ui/ux'],
      comments: 3,
      attachments: 2,
      subtasks: [
        { id: 1, title: 'Research competitor designs', completed: true },
        { id: 2, title: 'Create wireframes', completed: true },
        { id: 3, title: 'Design high-fidelity mockups', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Write product copy',
      description: 'Create compelling copy for product descriptions and CTAs',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'JD',
      dueDate: '2024-01-28',
      project: 'marketing-campaign',
      tags: ['copywriting', 'content'],
      comments: 1,
      attachments: 0,
      subtasks: [
        { id: 1, title: 'Research target audience', completed: true },
        { id: 2, title: 'Write headlines', completed: false },
        { id: 3, title: 'Create CTAs', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Set up analytics tracking',
      description: 'Implement Google Analytics and conversion tracking',
      status: 'review',
      priority: 'high',
      assignee: 'AR',
      dueDate: '2024-01-22',
      project: 'marketing-campaign',
      tags: ['analytics', 'technical'],
      comments: 5,
      attachments: 1,
      subtasks: [
        { id: 1, title: 'Install GA4', completed: true },
        { id: 2, title: 'Set up conversion goals', completed: true },
        { id: 3, title: 'Test tracking', completed: true }
      ]
    },
    {
      id: 4,
      title: 'Launch campaign',
      description: 'Go live with the marketing campaign across all channels',
      status: 'done',
      priority: 'high',
      assignee: 'MJ',
      dueDate: '2024-01-20',
      project: 'marketing-campaign',
      tags: ['launch', 'marketing'],
      comments: 8,
      attachments: 3,
      subtasks: [
        { id: 1, title: 'Schedule social media posts', completed: true },
        { id: 2, title: 'Send email campaign', completed: true },
        { id: 3, title: 'Update website', completed: true }
      ]
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    dueDate: '',
    tags: []
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-gray-600' },
    { id: 'in-progress', title: 'In Progress', color: 'border-blue-500' },
    { id: 'review', title: 'Review', color: 'border-yellow-500' },
    { id: 'done', title: 'Done', color: 'border-green-500' }
  ];

  const teamMembers = [
    { id: 'JD', name: 'John Doe', avatar: 'JD', role: 'Project Manager' },
    { id: 'SM', name: 'Sarah Miller', avatar: 'SM', role: 'Designer' },
    { id: 'AR', name: 'Alex Rodriguez', avatar: 'AR', role: 'Developer' },
    { id: 'MJ', name: 'Mike Johnson', avatar: 'MJ', role: 'Marketing Specialist' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case 'review': return <Eye className="w-4 h-4 text-yellow-400" />;
      case 'done': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const TaskCard = ({ task, onEdit, onDelete }) => {
    const assignee = teamMembers.find(member => member.id === task.assignee);
    const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;

    return (
      <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
            <span className="text-xs text-gray-400 uppercase">{task.priority}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h4 className="font-medium text-white mb-2">{task.title}</h4>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{task.description}</p>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {totalSubtasks > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Subtasks</span>
              <span>{completedSubtasks}/{totalSubtasks}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-1">
              <div 
                className="bg-pink-500 h-1 rounded-full transition-all"
                style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {assignee && (
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">{assignee.avatar}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400">
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="text-xs">{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="w-3 h-3" />
                  <span className="text-xs">{task.attachments}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {task.dueDate}
          </div>
        </div>
      </div>
    );
  };

  const KanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map(column => {
        const columnTasks = tasks.filter(task => task.status === column.id && task.project === selectedProject);
        
        return (
          <div key={column.id} className={`bg-gray-800 rounded-lg p-4 border-t-4 ${column.color}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(column.id)}
                <h3 className="font-semibold text-white">{column.title}</h3>
                <span className="bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {columnTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const ListView = () => (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left text-gray-300 text-sm font-medium p-4">Task</th>
              <th className="text-left text-gray-300 text-sm font-medium p-4">Assignee</th>
              <th className="text-left text-gray-300 text-sm font-medium p-4">Status</th>
              <th className="text-left text-gray-300 text-sm font-medium p-4">Priority</th>
              <th className="text-left text-gray-300 text-sm font-medium p-4">Due Date</th>
              <th className="text-left text-gray-300 text-sm font-medium p-4">Progress</th>
              <th className="text-right text-gray-300 text-sm font-medium p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.filter(task => task.project === selectedProject).map(task => {
              const assignee = teamMembers.find(member => member.id === task.assignee);
              const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
              const totalSubtasks = task.subtasks?.length || 0;
              const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

              return (
                <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{task.title}</div>
                      <div className="text-sm text-gray-400 truncate">{task.description}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    {assignee && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{assignee.avatar}</span>
                        </div>
                        <span className="text-gray-300 text-sm">{assignee.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="text-gray-300 text-sm capitalize">{task.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded text-white ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300 text-sm">{task.dueDate}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 justify-end">
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TimelineView = () => (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Project Timeline</h3>
      <div className="space-y-4">
        {tasks.filter(task => task.project === selectedProject).map((task, index) => {
          const assignee = teamMembers.find(member => member.id === task.assignee);
          return (
            <div key={task.id} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-24 text-sm text-gray-400">
                {task.dueDate}
              </div>
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
              </div>
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{task.title}</h4>
                    <p className="text-sm text-gray-400">{task.description}</p>
                  </div>
                  {assignee && (
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{assignee.avatar}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const TaskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Create New Task</h3>
          <button 
            onClick={() => setShowTaskModal(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Task title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Task description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Assignee</label>
              <select
                value={newTask.assignee}
                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select assignee</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              // Add task logic here
              setShowTaskModal(false);
              setNewTask({ title: '', description: '', assignee: '', priority: 'medium', dueDate: '', tags: [] });
            }}
            disabled={!newTask.title}
            className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Create Task
          </button>
          <button
            onClick={() => setShowTaskModal(false)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Project Management</h1>
            <p className="text-gray-400 mt-1">Organize tasks, collaborate with your team, and track progress</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowTaskModal(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        {/* Project Selector & Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* View Mode Selector */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            {[
              { id: 'kanban', icon: Kanban, label: 'Kanban' },
              { id: 'list', icon: List, label: 'List' },
              { id: 'timeline', icon: BarChart3, label: 'Timeline' },
              { id: 'calendar', icon: Calendar, label: 'Calendar' }
            ].map(mode => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                    viewMode === mode.id 
                      ? 'bg-pink-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-gray-800 rounded-lg p-6">
          {(() => {
            const project = projects.find(p => p.id === selectedProject);
            return (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${project?.color}`} />
                  <div>
                    <h2 className="text-xl font-semibold text-white">{project?.name}</h2>
                    <p className="text-gray-400">{project?.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{project?.progress}%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{tasks.filter(t => t.project === selectedProject).length}</div>
                    <div className="text-sm text-gray-400">Tasks</div>
                  </div>
                  <div className="flex -space-x-2">
                    {project?.team.map(memberId => (
                      <div key={memberId} className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-gray-800">
                        <span className="text-white text-xs font-medium">{memberId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Main Content */}
        <div>
          {viewMode === 'kanban' && <KanbanView />}
          {viewMode === 'list' && <ListView />}
          {viewMode === 'timeline' && <TimelineView />}
          {viewMode === 'calendar' && (
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Calendar View</h3>
              <p className="text-gray-400">Calendar view coming soon...</p>
            </div>
          )}
        </div>

        {/* Team Chat */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Team Chat</h3>
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
            {[
              { user: 'Sarah Miller', message: 'Just finished the mockups for review', time: '2 min ago', avatar: 'SM' },
              { user: 'John Doe', message: 'Great work! I\'ll review them this afternoon', time: '5 min ago', avatar: 'JD' },
              { user: 'Alex Rodriguez', message: 'Analytics tracking is now live', time: '1 hour ago', avatar: 'AR' }
            ].map((chat, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{chat.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white text-sm">{chat.user}</span>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showTaskModal && <TaskModal />}
    </DashboardLayout>
  );
};

export default ProjectManagement;

