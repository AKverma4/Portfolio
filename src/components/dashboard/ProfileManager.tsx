import React from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Profile } from '../../types';

export default function ProfileManager() {
  const [profile, setProfile] = React.useState<Partial<Profile>>({});
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

    setIsSaving(false);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={profile.full_name || ''}
            onChange={e => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={profile.bio || ''}
            onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            type="url"
            value={profile.avatar_url || ''}
            onChange={e => setProfile(prev => ({ ...prev, avatar_url: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
          <input
            type="text"
            value={profile.skills?.join(', ') || ''}
            onChange={e => setProfile(prev => ({ 
              ...prev, 
              skills: e.target.value.split(',').map(s => s.trim()) 
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Social Links</label>
          <div>
            <label className="block text-sm text-gray-600">GitHub</label>
            <input
              type="url"
              value={profile.social_links?.github || ''}
              onChange={e => setProfile(prev => ({ 
                ...prev, 
                social_links: { ...prev.social_links, github: e.target.value } 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">LinkedIn</label>
            <input
              type="url"
              value={profile.social_links?.linkedin || ''}
              onChange={e => setProfile(prev => ({ 
                ...prev, 
                social_links: { ...prev.social_links, linkedin: e.target.value } 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}