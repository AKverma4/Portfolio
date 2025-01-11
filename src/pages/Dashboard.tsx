import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, UserCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ProjectsManager from '../components/dashboard/ProjectsManager';
import BlogManager from '../components/dashboard/BlogManager';
import ProfileManager from '../components/dashboard/ProfileManager';
import { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
    });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Overview
              </Link>
              <Link
                to="/dashboard/projects"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FolderOpen className="mr-3 h-5 w-5" />
                Projects
              </Link>
              <Link
                to="/dashboard/posts"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FileText className="mr-3 h-5 w-5" />
                Blog Posts
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <UserCircle className="mr-3 h-5 w-5" />
                Profile
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="posts" element={<BlogManager />} />
              <Route path="profile" element={<ProfileManager />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const [stats, setStats] = React.useState({
    projects: 0,
    posts: 0,
    publishedPosts: 0,
  });

  React.useEffect(() => {
    async function fetchStats() {
      const [projectsData, postsData] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('posts').select('id, published', { count: 'exact' }),
      ]);

      const publishedPosts = postsData.data?.filter(post => post.published).length || 0;

      setStats({
        projects: projectsData.count || 0,
        posts: postsData.count || 0,
        publishedPosts,
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900">Total Projects</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.projects}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-green-900">Total Posts</h3>
          <p className="text-3xl font-bold text-green-600">{stats.posts}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-purple-900">Published Posts</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.publishedPosts}</p>
        </div>
      </div>
    </div>
  );
}