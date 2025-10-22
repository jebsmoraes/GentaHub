import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  Target,
  Zap,
  Eye
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const Dashboard = () => {
  // Dados mock para os gráficos
  const engagementData = [
    { name: 'Jan', engajamento: 4000, alcance: 2400, conversoes: 240 },
    { name: 'Fev', engajamento: 3000, alcance: 1398, conversoes: 221 },
    { name: 'Mar', engajamento: 2000, alcance: 9800, conversoes: 229 },
    { name: 'Abr', engajamento: 2780, alcance: 3908, conversoes: 200 },
    { name: 'Mai', engajamento: 1890, alcance: 4800, conversoes: 218 },
    { name: 'Jun', engajamento: 2390, alcance: 3800, conversoes: 250 },
    { name: 'Jul', engajamento: 3490, alcance: 4300, conversoes: 210 }
  ];

  const platformData = [
    { name: 'Instagram', value: 35, color: '#E1306C' },
    { name: 'Facebook', value: 25, color: '#1877F2' },
    { name: 'LinkedIn', value: 20, color: '#0A66C2' },
    { name: 'Twitter', value: 15, color: '#1DA1F2' },
    { name: 'TikTok', value: 5, color: '#000000' }
  ];

  const contentData = [
    { name: 'Seg', posts: 12, stories: 8, videos: 3 },
    { name: 'Ter', posts: 15, stories: 12, videos: 5 },
    { name: 'Qua', posts: 8, stories: 6, videos: 2 },
    { name: 'Qui', posts: 18, stories: 15, videos: 7 },
    { name: 'Sex', posts: 22, stories: 18, videos: 9 },
    { name: 'Sab', posts: 25, stories: 20, videos: 12 },
    { name: 'Dom', posts: 20, stories: 16, videos: 8 }
  ];

  const kpis = [
    {
      title: "Total de Seguidores",
      value: "127.5K",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Engajamento Médio",
      value: "8.4%",
      change: "+2.1%",
      changeType: "positive",
      icon: MessageSquare,
      color: "text-green-500"
    },
    {
      title: "Alcance Total",
      value: "2.1M",
      change: "+18.2%",
      changeType: "positive",
      icon: Eye,
      color: "text-purple-500"
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "-0.5%",
      changeType: "negative",
      icon: Target,
      color: "text-orange-500"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Lançamento do novo produto",
      platform: "Instagram",
      status: "Publicado",
      engagement: "1.2K",
      date: "2 horas atrás",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=64&h=64&fit=crop"
    },
    {
      id: 2,
      title: "Dicas de marketing digital",
      platform: "LinkedIn",
      status: "Agendado",
      engagement: "856",
      date: "Amanhã às 14h",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop"
    },
    {
      id: 3,
      title: "Behind the scenes",
      platform: "Stories",
      status: "Publicado",
      engagement: "2.1K",
      date: "5 horas atrás",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das suas campanhas e performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-background border border-border rounded-lg px-4 py-2 text-sm">
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Último ano</option>
          </select>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${
                  kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change} em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Performance Geral</span>
            </CardTitle>
            <CardDescription>
              Engajamento, alcance e conversões nos últimos 7 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="engajamento" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Engajamento"
                />
                <Line 
                  type="monotone" 
                  dataKey="alcance" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Alcance"
                />
                <Line 
                  type="monotone" 
                  dataKey="conversoes" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Conversões"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Distribuição por Plataforma</span>
            </CardTitle>
            <CardDescription>
              Percentual de engajamento por rede social
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance and Recent Posts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Content Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Performance de Conteúdo</span>
            </CardTitle>
            <CardDescription>
              Posts, stories e vídeos publicados na última semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="posts" fill="hsl(var(--primary))" name="Posts" />
                <Bar dataKey="stories" fill="#10B981" name="Stories" />
                <Bar dataKey="videos" fill="#F59E0B" name="Vídeos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Posts Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas publicações e agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{post.platform}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full ${
                      post.status === 'Publicado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs font-medium">{post.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

