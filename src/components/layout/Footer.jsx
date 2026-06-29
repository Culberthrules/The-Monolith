import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="border-t border-dark-border bg-dark-light pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-serif tracking-tighter text-white hover:text-accent transition-colors block mb-6">
              THE MONOLITHS<span className="text-accent text-3xl leading-none">.</span>
            </Link>
            <p className="text-text-secondary font-light max-w-sm">
              An award-winning architecture and design studio crafting environments that inspire connection and elevate the human experience.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Studio</h4>
            <ul className="space-y-4">
              <li><a href="/#about" className="text-text-secondary hover:text-accent transition-colors text-sm">About Us</a></li>
              <li><a href="/#projects" className="text-text-secondary hover:text-accent transition-colors text-sm">Selected Work</a></li>
              <li><a href="/#contact" className="text-text-secondary hover:text-accent transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Portal */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Client Portal</h4>
            <ul className="space-y-4">
              {user ? (
                <li><Link to="/dashboard" className="text-text-secondary hover:text-accent transition-colors text-sm">Dashboard</Link></li>
              ) : (
                <>
                  <li><Link to="/login" className="text-text-secondary hover:text-accent transition-colors text-sm">Client Login</Link></li>
                  <li><Link to="/signup" className="text-text-secondary hover:text-accent transition-colors text-sm">Request Access</Link></li>
                </>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-dark-border text-xs text-text-muted">
          <p>© {new Date().getFullYear()} The Monoliths Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
