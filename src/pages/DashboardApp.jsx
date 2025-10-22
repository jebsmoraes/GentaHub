import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Dashboard from './Dashboard';
import ContentCreator from './ContentCreator';
import Calendar from './Calendar';
import Analytics from './Analytics';
import SocialMedia from './SocialMedia';
import ProjectManagement from './ProjectManagement';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminFinancial from './AdminFinancial';
import Billing from './Billing';
import Settings from './Settings';
import Team from './Team';
import Help from './Help';

const DashboardApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  // Sincronizar activeTab com a URL
  useEffect(() => {
    const path = location.pathname.split('/dashboard/')[1] || 'dashboard';
    const tabMap = {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'content-creator': 'content',
      'calendar': 'calendar',
      'analytics': 'analytics',
      'social': 'social',
      'projects': 'projects',
      'admin': 'admin',
      'admin-users': 'admin',
      'admin-financial': 'admin',
      'team': 'team',
      'billing': 'billing',
      'settings': 'settings',
      'help': 'help'
    };
    setActiveTab(tabMap[path] || 'dashboard');
  }, [location]);

  // Função para navegar entre tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
    navigate(routeMap[tab] || '/dashboard');
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={handleTabChange}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content-creator" element={<ContentCreator />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/social" element={<SocialMedia />} />
        <Route path="/projects" element={<ProjectManagement />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-financial" element={<AdminFinancial />} />
        <Route path="/team" element={<Team />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardApp;
