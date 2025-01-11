import React from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { BlogPost } from '../../types';

export default function BlogManager() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPost, setCurrentPost] = React.useState<Partial<BlogPost>>({});

  React.useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (data) {
      setPosts(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (currentPost.id) {
      await supabase
        .from('posts')
        .update({ ...currentPost, user_id: user.id })
        .eq('id', currentPost.id);
    } else {
      await supabase
        .from('posts')
        .insert([{ ...currentPost, user_id: user.id }]);
    }

    setIsEditing(false);
    setCurrentPost({});
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      fetchPosts();
    }
  }

  async function togglePublished(post: BlogPost) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('posts')
      .update({ published: !post.published, user_id: user.id })
      .eq('id', post.id);
    fetchPosts();
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <button
          onClick={() => {
            setIsEditing(true);
            setCurrentPost({});
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Post
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={currentPost.title || ''}
              onChange={e => setCurrentPost(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={currentPost.content || ''}
              onChange={e => setCurrentPost(prev => ({ ...prev, content: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={10}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea
              value={currentPost.excerpt || ''}
              onChange={e => setCurrentPost(prev => ({ ...prev, excerpt: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={currentPost.published || false}
              onChange={e => setCurrentPost(prev => ({ ...prev, published: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Published</label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentPost({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentPost.id ? 'Update' : 'Create'} Post
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                    <button
                      onClick={() => togglePublished(post)}
                      className={`ml-2 p-1 rounded-full ${
                        post.published ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {post.published ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">{post.excerpt || post.content.substring(0, 150)}...</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentPost(post);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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