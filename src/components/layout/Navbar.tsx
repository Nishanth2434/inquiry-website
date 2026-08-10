import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HardHat, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const servicesLinks = [
    { name: 'Road Construction', path: '/services/road-construction' },
    { name: 'Asphalt Paving', path: '/services/asphalt-paving' },
    { name: 'Road Maintenance', path: '/services/road-maintenance' },
    { name: 'Infrastructure Development', path: '/services/infrastructure' }
  ];

  return (
    <nav className="fixed w-full z-50 bg-white border-b border-brand-100 shadow-sm py-3 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo Lockup */}
          <Link to="/" className="flex items-center group z-50 relative">
            {!logoError ? (
              <div className="flex items-center gap-4">
                <img 
                  src="/gsp-logo.jpg" 
                  alt="GSP Constructions Logo" 
                  className="h-12 w-auto transition-transform hover:scale-105 mix-blend-multiply contrast-125 brightness-105" 
                  onError={() => setLogoError(true)}
                />
                
                <div className="h-10 w-[1px] bg-brand-200 hidden sm:block"></div>
                
                <div className="flex flex-col items-start justify-center hidden sm:flex">
                  <span className="font-bold text-[22px] tracking-[0.2em] text-brand-950 leading-none mb-1.5">
                    TEJ<span className="text-accent-500">A</span>SHWI
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-[1px] w-3 bg-accent-500/70"></div>
                    <span className="text-[9px] font-semibold tracking-[0.2em] text-brand-600 uppercase">
                      Asphalt & Constructions
                    </span>
                    <div className="h-[1px] w-3 bg-accent-500/70"></div>
                  </div>
                </div>
              </div>
            ) : (
              <span className="font-bold text-2xl tracking-tight transition-colors text-brand-950">
                TEJASHWI<span className="text-accent-500 text-lg ml-1">Constructions</span>
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/about" className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-brand-50 hover:text-brand-700 relative text-brand-800",
              isActive('/about') && "text-brand-600 bg-brand-50"
            )}>
              About
              {isActive('/about') && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full" />}
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative group px-1"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={cn(
                "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-brand-50 hover:text-brand-700 text-brand-800",
                isActive('/services') && "text-brand-600"
              )}>
                Services
                <ChevronDown className="h-4 w-4" />
                {isActive('/services') && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full" />}
              </button>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-brand-100 overflow-hidden"
                  >
                    <div className="py-2">
                      {servicesLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="block px-6 py-3 text-sm font-medium text-brand-800 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/projects" className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-brand-50 hover:text-brand-700 relative text-brand-800"
            )}>
              Projects
              {isActive('/projects') && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full" />}
            </Link>

            <Link to="/equipment" className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-brand-50 hover:text-brand-700 relative text-brand-800"
            )}>
              Equipment
              {isActive('/equipment') && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full" />}
            </Link>

            <Link to="/gallery" className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-brand-50 hover:text-brand-700 relative text-brand-800"
            )}>
              Gallery
              {isActive('/gallery') && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-current rounded-full" />}
            </Link>
          </div>

          <div className="hidden lg:flex items-center pl-4 ml-4 border-l border-brand-100">
            <Link to="/contact">
              <Button className="rounded-full px-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full focus:outline-none transition-colors text-brand-900 hover:bg-brand-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (Slide Down) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto pt-24"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              <Link to="/about" className="text-3xl font-bold text-brand-950 hover:text-brand-600 transition-colors">
                About
              </Link>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-3xl font-bold text-brand-950"
                >
                  Services
                  <ChevronDown className={cn("h-8 w-8 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 flex flex-col space-y-4 overflow-hidden"
                    >
                      {servicesLinks.map(link => (
                        <Link key={link.name} to={link.path} className="text-xl font-medium text-brand-700 hover:text-brand-600">
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/projects" className="text-3xl font-bold text-brand-950 hover:text-brand-600 transition-colors">
                Projects
              </Link>
              <Link to="/equipment" className="text-3xl font-bold text-brand-950 hover:text-brand-600 transition-colors">
                Equipment
              </Link>
              <Link to="/gallery" className="text-3xl font-bold text-brand-950 hover:text-brand-600 transition-colors">
                Gallery
              </Link>

              <div className="pt-8 mt-4 border-t border-brand-100 flex flex-col gap-4">
                <Link to="/contact">
                  <Button size="lg" className="w-full text-lg py-6 rounded-xl">Get a Quote</Button>
                </Link>
                <a href="tel:+15551234567" className="flex items-center justify-center gap-2 text-brand-700 py-4 font-medium">
                  <Phone className="h-5 w-5" /> Call Us Today
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
