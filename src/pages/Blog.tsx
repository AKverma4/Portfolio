import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (data) {
      setPosts(data);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedPost ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 flex items-center"
            >
              ← Back to all posts
            </button>
            <article className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
              <div className="text-gray-600 mb-8">
                {format(new Date(selectedPost.created_at), 'MMMM d, yyyy')}
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </article>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
              <p className="text-lg text-gray-600">
                Thoughts, tutorials, and insights about web development and technology.
              </p>
            </div>
            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedPost(post)}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <div className="text-gray-600 mb-4">
                    {format(new Date(post.created_at), 'MMMM d, yyyy')}
                  </div>
                  <p className="text-gray-600">{post.excerpt || post.content.substring(0, 200)}...</p>
                  <div className="mt-4 text-blue-600 hover:text-blue-700">Read more →</div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}