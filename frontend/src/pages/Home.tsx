import { useState } from 'react';
import { Link2, BarChart3, Shield, Zap, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { urlService } from '../services/urlService';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading,setLoading] = useState(false);

   const { isAuthenticated, logout } = useAuth();
   const navigate = useNavigate()

//   const handleShorten = () => {
//     if (url) {
//       // Simulate URL shortening
//       const randomId = Math.random().toString(36).substring(7);
//       setShortUrl(`lnkshrt.co/${randomId}`);
//     }
//   };

const handleShorten = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL.');
      return;
    }

    try {
      setLoading(true);
      const { shortUrl } = await urlService.shortenUrl(url);
      setShortUrl(shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Navbar */}
       <nav className="relative z-10 px-6 py-4 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LinkShort
            </span>
          </div>

          {/* Menu Buttons */}
          <div className="flex items-center space-x-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              About
            </a>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm">
            ✨ Fast, Secure & Reliable
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Shorten Your Links,
          </span>
          <br />
          <span className="text-white">Expand Your Reach</span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Transform long, complex URLs into short, memorable links. Track analytics, customize links, and boost your online presence.
        </p>

        {/* URL Shortener Tool */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
              />
              {/* <button
                onClick={handleShorten}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Shorten URL
              </button> */}
              <button
  onClick={handleShorten}
  disabled={loading}
  className={`bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 whitespace-nowrap
    ${loading ? "opacity-60 cursor-not-allowed hover:translate-y-0" : "hover:shadow-lg hover:shadow-purple-500/50"}
  `}
>
  {loading ? (
    <div className="flex items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
        ></path>
      </svg>
      <span>Shortening...</span>
    </div>
  ) : (
    "Shorten URL"
  )}
</button>

            </div>
            
            {shortUrl && (
              <div className="mt-6 p-4 bg-gray-900/50 border border-gray-700 rounded-lg flex items-center justify-between">
                <span className="text-cyan-400 font-medium">{shortUrl}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  <span className="text-sm text-gray-300">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-cyan-400" />
            <span>No sign-up required</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-cyan-400" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-cyan-400" />
            <span>Unlimited links</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-gray-400 text-lg">Everything you need to manage your links effectively</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Instant URL shortening with zero delays. Get your short link in milliseconds.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-400">Track clicks, locations, devices, and more with detailed analytics dashboard.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all group">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">Enterprise-grade security with SSL encryption and privacy protection.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Custom Links</h3>
            <p className="text-gray-400">Create branded short links with custom domains and memorable aliases.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-12 border border-gray-700/50">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-2">10M+</div>
              <div className="text-gray-400">Links Shortened</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">500K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       {!isAuthenticated && (

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust LinkShort for their URL shortening needs
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
            Create Free Account
          </button>
        </div>
      </section>
      )}


      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">LinkShort</span>
              </div>
              <p className="text-gray-400 text-sm">The fastest way to shorten your URLs and track your links.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 LinkShort. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
