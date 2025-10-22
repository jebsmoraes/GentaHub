import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  Users,
  Clock,
  MapPin,
  Edit3,
  Trash2,
  Copy,
  Eye,
  X,
  Save
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // month, week, day, list
  const [filter, setFilter] = useState('all');

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Instagram Post - Product Launch',
      type: 'post',
      platform: 'instagram',
      date: '2024-01-15',
      time: '14:30',
      status: 'scheduled',
      assignee: 'John Doe',
      description: 'Launch announcement for new product line'
    },
    {
      id: 2,
      title: 'Blog Article - SEO Tips',
      type: 'content',
      platform: 'blog',
      date: '2024-01-16',
      time: '09:00',
      status: 'draft',
      assignee: 'Jane Smith',
      description: 'Complete guide to SEO optimization'
    },
    {
      id: 3,
      title: 'Facebook Campaign Review',
      type: 'meeting',
      platform: 'facebook',
      date: '2024-01-17',
      time: '15:00',
      status: 'confirmed',
      assignee: 'Team',
      description: 'Review Q1 Facebook advertising performance'
    },
    {
      id: 4,
      title: 'LinkedIn Article',
      type: 'post',
      platform: 'linkedin',
      date: '2024-01-18',
      time: '11:00',
      status: 'scheduled',
      assignee: 'Sarah Wilson',
      description: 'Thought leadership piece on industry trends'
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'post',
    platform: 'instagram',
    date: '',
    time: '',
    assignee: '',
    description: ''
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      case 'confirmed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return 'text-pink-400';
      case 'facebook': return 'text-blue-400';
      case 'linkedin': return 'text-blue-600';
      case 'twitter': return 'text-sky-400';
      case 'blog': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleCreateEvent = () => {
    const event = {
      ...newEvent,
      id: events.length + 1,
      status: 'scheduled'
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      type: 'post',
      platform: 'instagram',
      date: '',
      time: '',
      assignee: '',
      description: ''
    });
    setShowEventModal(false);
  };

  const EventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Create Event</h3>
          <button 
            onClick={() => setShowEventModal(false)}
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
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Event title..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="post">Post</option>
                <option value="content">Content</option>
                <option value="meeting">Meeting</option>
                <option value="campaign">Campaign</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
              <select
                value={newEvent.platform}
                onChange={(e) => setNewEvent({...newEvent, platform: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="blog">Blog</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Assignee</label>
            <input
              type="text"
              value={newEvent.assignee}
              onChange={(e) => setNewEvent({...newEvent, assignee: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Assign to team member..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Event description..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCreateEvent}
            disabled={!newEvent.title || !newEvent.date}
            className="flex-1 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Create Event
          </button>
          <button
            onClick={() => setShowEventModal(false)}
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
            <h1 className="text-3xl font-bold text-white">Calendar</h1>
            <p className="text-gray-400 mt-1">Plan and schedule your content and campaigns</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Events</option>
                <option value="post">Posts</option>
                <option value="content">Content</option>
                <option value="meeting">Meetings</option>
                <option value="campaign">Campaigns</option>
              </select>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={() => setShowEventModal(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Event
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              Today
            </button>
            <div className="flex bg-gray-700 rounded-lg p-1">
              {['month', 'week', 'day', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
                    viewMode === mode 
                      ? 'bg-pink-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-gray-400 font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4">
            {getDaysInMonth(currentDate).map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isToday = day && 
                new Date().getDate() === day && 
                new Date().getMonth() === currentDate.getMonth() && 
                new Date().getFullYear() === currentDate.getFullYear();

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-700 rounded-lg ${
                    day ? 'bg-gray-700 hover:bg-gray-600 cursor-pointer' : 'bg-transparent'
                  } ${isToday ? 'ring-2 ring-pink-500' : ''} transition-colors`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${
                        isToday ? 'text-pink-400' : 'text-white'
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${getStatusColor(event.status)} text-white`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-400">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white">{event.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(event.status)} text-white`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.assignee}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{event.description}</p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-white transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Team Members</h3>
          <div className="flex items-center gap-4">
            {['John Doe', 'Jane Smith', 'Sarah Wilson', 'Mike Johnson'].map((member, index) => (
              <div key={member} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {member.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-gray-300 text-sm">{member}</span>
              </div>
            ))}
            <button className="w-8 h-8 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showEventModal && <EventModal />}
    </DashboardLayout>
  );
};

export default Calendar;

