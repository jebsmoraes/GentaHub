import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  Youtube,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  Send,
  Calendar,
  Clock,
  Image,
  Video,
  FileText,
  Plus,
  Filter,
  Search,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Reply,
  Trash2,
  Edit3
} from 'lucide-react';

const SocialMedia = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [newPost, setNewPost] = useState({
    content: '',
    platforms: [],
    scheduleDate: '',
    scheduleTime: '',
    media: null
  });

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500', connected: true },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', connected: true },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', connected: true },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-sky-400', connected: false },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500', connected: false }
  ];

  const [messages] = useState([
    {
      id: 1,
      platform: 'instagram',
      type: 'comment',
      user: 'sarah_marketing',
      avatar: 'SM',
      content: 'Love this content! Can you share more tips about AI marketing?',
      timestamp: '2 min ago',
      status: 'unread',
      post: 'AI Marketing Revolution'
    },
    {
      id: 2,
      platform: 'facebook',
      type: 'message',
      user: 'John Smith',
      avatar: 'JS',
      content: 'Hi! I\'m interested in your services. Can we schedule a call?',
      timestamp: '5 min ago',
      status: 'unread',
      post: null
    },
    {
      id: 3,
      platform: 'linkedin',
      type: 'comment',
      user: 'Maria Rodriguez',
      avatar: 'MR',
      content: 'Great insights! This really helped me understand the market better.',
      timestamp: '15 min ago',
      status: 'read',
      post: 'Market Analysis Report'
    },
    {
      id: 4,
      platform: 'instagram',
      type: 'mention',
      user: 'tech_startup_hub',
      avatar: 'TS',
      content: 'Thanks for the mention @gentahub! Amazing platform for marketing automation.',
      timestamp: '1 hour ago',
      status: 'read',
      post: null
    }
  ]);

  const [scheduledPosts] = useState([
    {
      id: 1,
      content: '🚀 Exciting news! Our new AI-powered feature is launching next week...',
      platforms: ['instagram', 'facebook', 'linkedin'],
      scheduledFor: '2024-01-20 14:30',
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 2,
      content: 'Check out our latest blog post about marketing automation trends...',
      platforms: ['linkedin', 'twitter'],
      scheduledFor: '2024-01-21 09:00',
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0 }
    },
    {
      id: 3,
      content: 'Behind the scenes: How we built our AI content generator...',
      platforms: ['instagram'],
      scheduledFor: '2024-01-19 16:00',
      status: 'published',
      engagement: { likes: 234, comments: 18, shares: 12 }
    }
  ]);

  const [engagementStats] = useState({
    instagram: { followers: 12500, engagement: 4.2, posts: 156 },
    facebook: { followers: 8900, engagement: 3.8, posts: 89 },
    linkedin: { followers: 5600, engagement: 6.1, posts: 67 },
    twitter: { followers: 3400, engagement: 2.9, posts: 234 },
    youtube: { followers: 1200, engagement: 8.5, posts: 23 }
  });

  const getPlatformIcon = (platform) => {
    const platformData = platforms.find(p => p.id === platform);
    if (!platformData) return MessageCircle;
    return platformData.icon;
  };

  const getPlatformColor = (platform) => {
    const platformData = platforms.find(p => p.id === platform);
    if (!platformData) return 'text-gray-400';
    return platformData.color;
  };

  const UnifiedInbox = () => {
    const filteredMessages = selectedPlatform === 'all' 
      ? messages 
      : messages.filter(msg => msg.platform === selectedPlatform);

    return (
      <div className="space-y-6">
        {/* Inbox Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-white">Unified Inbox</h2>
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
              {messages.filter(m => m.status === 'unread').length} unread
            </span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Platforms</option>
              {platforms.filter(p => p.connected).map(platform => (
                <option key={platform.id} value={platform.id}>{platform.name}</option>
              ))}
            </select>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-gray-800 rounded-lg">
          {filteredMessages.map(message => {
            const PlatformIcon = getPlatformIcon(message.platform);
            return (
              <div key={message.id} className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                message.status === 'unread' ? 'bg-gray-750' : ''
              }`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{message.avatar}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <PlatformIcon className={`w-4 h-4 ${getPlatformColor(message.platform)}`} />
                      <span className="font-medium text-white">{message.user}</span>
                      <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded capitalize">
                        {message.type}
                      </span>
                      {message.status === 'unread' && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{message.content}</p>
                    {message.post && (
                      <p className="text-gray-400 text-xs mb-2">On post: {message.post}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{message.timestamp}</span>
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <Reply className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const PostScheduler = () => (
    <div className="space-y-6">
      {/* Scheduler Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Schedule Posts</h2>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Post Composer */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Create New Post</h3>
        
        {/* Platform Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Platforms</label>
          <div className="flex gap-3">
            {platforms.filter(p => p.connected).map(platform => {
              const Icon = platform.icon;
              const isSelected = newPost.platforms.includes(platform.id);
              return (
                <button
                  key={platform.id}
                  onClick={() => {
                    const platforms = isSelected 
                      ? newPost.platforms.filter(p => p !== platform.id)
                      : [...newPost.platforms, platform.id];
                    setNewPost({...newPost, platforms});
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isSelected 
                      ? 'border-pink-500 bg-pink-500/20 text-pink-400' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{platform.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            placeholder="What's on your mind?"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows={4}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Image className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <FileText className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-400">{newPost.content.length}/280</span>
          </div>
        </div>

        {/* Schedule Options */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={newPost.scheduleDate}
              onChange={(e) => setNewPost({...newPost, scheduleDate: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
            <input
              type="time"
              value={newPost.scheduleTime}
              onChange={(e) => setNewPost({...newPost, scheduleTime: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Send className="w-4 h-4" />
            Post Now
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors">
            Save Draft
          </button>
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Scheduled Posts</h3>
        <div className="space-y-4">
          {scheduledPosts.map(post => (
            <div key={post.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-white text-sm mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.scheduledFor}
                    </div>
                    <div className="flex items-center gap-1">
                      {post.platforms.map(platform => {
                        const Icon = getPlatformIcon(platform);
                        return <Icon key={platform} className={`w-3 h-3 ${getPlatformColor(platform)}`} />;
                      })}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.status === 'scheduled' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {post.status === 'published' && (
                <div className="flex gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.engagement.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.engagement.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    {post.engagement.shares}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EngagementOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Engagement Overview</h2>
      
      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.filter(p => p.connected).map(platform => {
          const Icon = platform.icon;
          const stats = engagementStats[platform.id];
          return (
            <div key={platform.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gray-700`}>
                  <Icon className={`w-6 h-6 ${platform.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{platform.name}</h3>
                  <p className="text-sm text-gray-400">{stats.followers.toLocaleString()} followers</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Engagement Rate</span>
                  <span className="text-white font-medium">{stats.engagement}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Total Posts</span>
                  <span className="text-white font-medium">{stats.posts}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${(stats.engagement / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New follower on Instagram', time: '2 min ago', type: 'follow' },
            { action: 'Comment on Facebook post', time: '5 min ago', type: 'comment' },
            { action: 'Post shared on LinkedIn', time: '15 min ago', type: 'share' },
            { action: 'Mention on Twitter', time: '1 hour ago', type: 'mention' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'follow' ? 'bg-green-400' :
                activity.type === 'comment' ? 'bg-blue-400' :
                activity.type === 'share' ? 'bg-purple-400' : 'bg-yellow-400'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-gray-400 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
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
            <h1 className="text-3xl font-bold text-white">Social Media</h1>
            <p className="text-gray-400 mt-1">Manage all your social media accounts in one place</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Platform Connection Status */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Connected Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {platforms.map(platform => {
              const Icon = platform.icon;
              return (
                <div key={platform.id} className={`p-4 rounded-lg border-2 transition-colors ${
                  platform.connected 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-gray-600 bg-gray-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-6 h-6 ${platform.color}`} />
                    {platform.connected ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-white">{platform.name}</div>
                  <div className={`text-xs ${platform.connected ? 'text-green-400' : 'text-yellow-400'}`}>
                    {platform.connected ? 'Connected' : 'Not Connected'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {[
            { id: 'inbox', label: 'Unified Inbox', icon: MessageCircle },
            { id: 'scheduler', label: 'Post Scheduler', icon: Calendar },
            { id: 'engagement', label: 'Engagement', icon: Heart }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'inbox' && <UnifiedInbox />}
          {activeTab === 'scheduler' && <PostScheduler />}
          {activeTab === 'engagement' && <EngagementOverview />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SocialMedia;

