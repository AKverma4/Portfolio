import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Code, Briefcase, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Profile, Project } from '../types';
import Ajay from '../assets/Ajaypic.png';

export default function Home() {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [featuredProjects, setFeaturedProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      // Fetch profile data - handle case when no profile exists
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .maybeSingle(); // Use maybeSingle() instead of single()

      if (!profileError && profileData) {
        setProfile(profileData);
      }

      // Fetch featured projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });

      if (projectsData) {
        setFeaturedProjects(projectsData);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-500 text-white relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <motion.h1 
              initial={{ x: -1320 }}
              animate={{ 
                x: 200,
                transition: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 whitespace-nowrap"
            >
              Welcome to My Portfolio
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 3, type: "spring" }}
              className="mb-6 flex justify-center"
            >
              <div className="relative group">
                <img
                  src={Ajay}
                  alt="Ajay Kumar"
                  className="w-56 h-56 rounded-full border-4 border-white shadow-2xl transform transition-all duration-300 group-hover:scale-105 object-cover"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            >
              {profile?.full_name || 'AJAY KUMAR'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed"
            >
              {profile?.bio || 'Full-stack developer passionate about creating beautiful and functional web applications'}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4 }}
              className="flex justify-center space-x-6"
            >
              {profile?.social_links?.github && (
                <a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-all duration-300"
                >
                  <Github className="h-8 w-8 hover:text-blue-300" />
                </a>
              )}
              {profile?.social_links?.linkedin && (
                <a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="h-8 w-8 hover:text-blue-300" />
                </a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" />
          </motion.div>
        </div>
      </section>
       {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                alt="Developer workspace"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
              <p className="text-lg text-gray-600">
                I'm a passionate developer with expertise in building modern web applications. 
                With a strong foundation in both frontend and backend development, I create 
                seamless digital experiences that solve real-world problems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Code className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Development</h3>
                    <p className="text-sm text-gray-600">Clean, modern code</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Projects</h3>
                    <p className="text-sm text-gray-600">Proven track record</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Learning</h3>
                    <p className="text-sm text-gray-600">Always growing</p>
                  </div>
                </div>
              </div>
              {profile?.skills && profile.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-600">Check out some of my recent work</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={project.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        View Project <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's Work Together</h2>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Mail className="mr-2 h-5 w-5" />
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}