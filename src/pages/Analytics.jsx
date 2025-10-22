import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Settings,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetrics, setSelectedMetrics] = useState(['engagement', 'reach', 'conversions']);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for analytics
  const [analyticsData] = useState({
    kpis: {
      totalReach: { value: 12450, change: 15.3, trend: 'up' },
      engagement: { value: 1202, change: -2.1, trend: 'down' },
      conversions: { value: 89, change: 8.7, trend: 'up' },
      revenue: { value: 32560, change: 12.4, trend: 'up' }
    },
    chartData: {
      engagement: [
        { date: '2024-01-01', value: 850 },
        { date: '2024-01-02', value: 920 },
        { date: '2024-01-03', value: 1100 },
        { date: '2024-01-04', value: 980 },
        { date: '2024-01-05', value: 1250 },
        { date: '2024-01-06', value: 1180 },
        { date: '2024-01-07', value: 1320 }
      ],
      revenue: [
        { month: 'Jan', value: 28000 },
        { month: 'Feb', value: 31000 },
        { month: 'Mar', value: 29500 },
        { month: 'Apr', value: 34000 },
        { month: 'May', value: 32560 },
        { month: 'Jun', value: 36000 }
      ]
    },
    topContent: [
      {
        id: 1,
        title: 'AI Marketing Revolution Post',
        platform: 'instagram',
        engagement: 2340,
        reach: 15600,
        clicks: 234
      },
      {
        id: 2,
        title: 'SEO Tips Blog Article',
        platform: 'blog',
        engagement: 1890,
        reach: 8900,
        clicks: 456
      },
      {
        id: 3,
        title: 'Product Launch Video',
        platform: 'youtube',
        engagement: 3200,
        reach: 22000,
        clicks: 678
      }
    ],
    trafficSources: [
      { source: 'Organic Search', percentage: 45, value: 18500 },
      { source: 'Social Media', percentage: 30, value: 12300 },
      { source: 'Direct', percentage: 15, value: 6150 },
      { source: 'Referral', percentage: 10, value: 4100 }
    ]
  });

  const KPICard = ({ title, value, change, trend, icon: Icon, format = 'number' }) => {
    const formatValue = (val) => {
      if (format === 'currency') return `$${val.toLocaleString()}`;
      if (format === 'percentage') return `${val}%`;
      return val.toLocaleString();
    };

    const getTrendIcon = () => {
      if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-400" />;
      if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-400" />;
      return <Minus className="w-4 h-4 text-gray-400" />;
    };

    const getTrendColor = () => {
      if (trend === 'up') return 'text-green-400';
      if (trend === 'down') return 'text-red-400';
      return 'text-gray-400';
    };

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Icon className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">{formatValue(value)}</div>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm ${getTrendColor()}`}>
              {Math.abs(change)}% from last period
            </span>
          </div>
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title, color = '#FF0090' }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
        <div className="relative h-64">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="0"
                y1={i * 40}
                x2="400"
                y2={i * 40}
                stroke="#374151"
                strokeWidth="1"
              />
            ))}
            
            {/* Data line */}
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="3"
              points={data.map((point, index) => 
                `${(index * 400) / (data.length - 1)},${200 - (point.value / maxValue) * 180}`
              ).join(' ')}
            />
            
            {/* Data points */}
            {data.map((point, index) => (
              <circle
                key={index}
                cx={(index * 400) / (data.length - 1)}
                cy={200 - (point.value / maxValue) * 180}
                r="4"
                fill={color}
              />
            ))}
          </svg>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
            {data.map((point, index) => (
              <span key={index}>{point.date || point.month}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const BarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{item.month}</span>
                <span className="text-white font-medium">${item.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DonutChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = -cumulativePercentage;
                cumulativePercentage += percentage;
                
                const colors = ['#FF0090', '#8B5CF6', '#06B6D4', '#10B981'];
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={colors[index % colors.length]}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Visits</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {data.map((item, index) => {
            const colors = ['bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-green-500'];
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                  <span className="text-gray-300 text-sm">{item.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{item.percentage}%</div>
                  <div className="text-gray-400 text-xs">{item.value.toLocaleString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const TopContentTable = () => (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Top Performing Content</h3>
        <button className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Content</th>
              <th className="text-left text-gray-400 text-sm font-medium pb-3">Platform</th>
              <th className="text-right text-gray-400 text-sm font-medium pb-3">Engagement</th>
              <th className="text-right text-gray-400 text-sm font-medium pb-3">Reach</th>
              <th className="text-right text-gray-400 text-sm font-medium pb-3">Clicks</th>
            </tr>
          </thead>
          <tbody className="space-y-3">
            {analyticsData.topContent.map((content, index) => (
              <tr key={content.id} className="border-b border-gray-700/50">
                <td className="py-3">
                  <div className="text-white font-medium">{content.title}</div>
                </td>
                <td className="py-3">
                  <span className="text-gray-300 capitalize">{content.platform}</span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-white">{content.engagement.toLocaleString()}</span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-white">{content.reach.toLocaleString()}</span>
                </td>
                <td className="py-3 text-right">
                  <span className="text-white">{content.clicks}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 mt-1">Track your performance and optimize your strategy</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Reach"
            value={analyticsData.kpis.totalReach.value}
            change={analyticsData.kpis.totalReach.change}
            trend={analyticsData.kpis.totalReach.trend}
            icon={Users}
          />
          <KPICard
            title="Engagement"
            value={analyticsData.kpis.engagement.value}
            change={analyticsData.kpis.engagement.change}
            trend={analyticsData.kpis.engagement.trend}
            icon={Heart}
          />
          <KPICard
            title="Conversions"
            value={analyticsData.kpis.conversions.value}
            change={analyticsData.kpis.conversions.change}
            trend={analyticsData.kpis.conversions.trend}
            icon={TrendingUp}
          />
          <KPICard
            title="Revenue"
            value={analyticsData.kpis.revenue.value}
            change={analyticsData.kpis.revenue.change}
            trend={analyticsData.kpis.revenue.trend}
            icon={DollarSign}
            format="currency"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart 
            data={analyticsData.chartData.engagement}
            title="Engagement Over Time"
            color="#FF0090"
          />
          <BarChart 
            data={analyticsData.chartData.revenue}
            title="Revenue by Month"
          />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DonutChart 
            data={analyticsData.trafficSources}
            title="Traffic Sources"
          />
          <div className="lg:col-span-2">
            <TopContentTable />
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Real-time Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">1,234</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-sm text-gray-400">New Comments</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
                <Share2 className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-sm text-gray-400">Shares Today</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">+12%</div>
              <div className="text-sm text-gray-400">Growth Rate</div>
            </div>
          </div>
        </div>

        {/* Custom Widgets */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Custom Widgets</h3>
            <button className="text-pink-400 hover:text-pink-300 text-sm transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Customize Dashboard
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <BarChart3 className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-gray-400 text-sm">Add Custom Chart</div>
            </div>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <TrendingUp className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-gray-400 text-sm">Add KPI Widget</div>
            </div>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Calendar className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-gray-400 text-sm">Add Report Widget</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

