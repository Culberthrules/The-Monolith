import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    // Prevent scrolling when menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [location.pathname, menuOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Portal', to: '/login', hide: !!user },
    { label: 'Dashboard', to: '/dashboard', hide: !user },
  ].filter((l) => !l.hide);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-dark/80 backdrop-blur-md border-b border-dark-border shadow-lg shadow-black/20' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="relative z-50 text-xl md:text-2xl font-serif tracking-tighter text-white hover:text-accent transition-colors">
            THE MONOLITHS<span className="text-accent text-3xl leading-none">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm tracking-widest uppercase transition-colors relative ${
                    isActive ? 'text-accent font-medium' : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
            
            {user && (
              <button onClick={logout} className="btn-ghost py-2 px-5 text-xs tracking-widest uppercase">
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 -mr-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5 items-end">
              <span className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-6'}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-dark z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {navLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-3xl font-serif transition-all duration-500 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${location.pathname === link.to ? 'text-accent italic' : 'text-white'}`}
              style={{ transitionDelay: menuOpen ? `${(idx + 1) * 100}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          
          {user && (
            <button 
              onClick={logout}
              className={`mt-4 btn-outline transition-all duration-500 delay-400 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
