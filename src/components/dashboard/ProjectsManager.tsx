import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../types';

export default function ProjectsManager() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState<Partial<Project>>({});

  React.useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setProjects(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (currentProject.id) {
      await supabase
        .from('projects')
        .update({ ...currentProject, user_id: user.id })
        .eq('id', currentProject.id);
    } else {
      await supabase
        .from('projects')
        .insert([{ ...currentProject, user_id: user.id }]);
    }

    setIsEditing(false);
    setCurrentProject({});
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      fetchProjects();
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentProject({});
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={currentProject.title || ''}
              onChange={e => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={currentProject.description || ''}
              onChange={e => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={currentProject.image_url || ''}
              onChange={e => setCurrentProject(prev => ({ ...prev, image_url: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Technologies (comma-separated)</label>
            <input
              type="text"
              value={currentProject.technologies?.join(', ') || ''}
              onChange={e => setCurrentProject(prev => ({ 
                ...prev, 
                technologies: e.target.value.split(',').map(t => t.trim()) 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentProject({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentProject.id ? 'Update' : 'Create'} Project
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentProject(project);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}