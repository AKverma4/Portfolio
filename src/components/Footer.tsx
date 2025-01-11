import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub',
      icon: <Github className="h-5 w-5 mr-2" />,
      url: 'https://github.com/AKverma4',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5 mr-2" />,
      url: 'https://www.linkedin.com/in/2002ajaykumar/',
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5 mr-2" />,
      url: 'mailto:ajaykumarverma4@gmail.com',
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // न्यूजलेटर लॉजिक यहाँ जोड़ें
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Building beautiful and functional web experiences with cutting-edge technologies.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Newsletter</h3>
            <p className="mt-4 text-gray-600">Stay updated with our latest developments and insights.</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-r-md border border-l-0 border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}