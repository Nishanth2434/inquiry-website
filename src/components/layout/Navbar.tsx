import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const NavLink = ({ 
  to, 
  children, 
  isActive 
}: { 
  to: string; 
  children: React.ReactNode; 
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-4 py-2 text-[15px] font-medium transition-all duration-300 inline-block",
        isActive ? "text-brand-950" : "text-brand-700 hover:text-brand-950"
      )}
    >
      <motion.span 
        className="relative z-10 inline-block"
        animate={{ y: isHovered ? -1.5 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
      
      {/* Active Indicator */}
      {isActive && (
        <motion.div 
          layoutId="active-nav-indicator" 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent-500 rounded-full" 
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      {/* Hover Underline */}
      <motion.div 
        className="absolute bottom-1.5 left-4 right-4 h-[1.5px] bg-brand-950/20 origin-center"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered && !isActive ? 1 : 0, opacity: isHovered && !isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </Link>
  );
};

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
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-[0.16,1,0.3,1]"
      initial={{ paddingTop: 0 }}
      animate={{ paddingTop: isScrolled ? 16 : 0 }}
    >
      <nav 
        className={cn(
          "pointer-events-auto w-full flex items-center justify-between transition-all duration-500 ease-[0.16,1,0.3,1]",
          isScrolled 
            ? "max-w-5xl mx-4 bg-[#FDFBF7]/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-brand-950/10 rounded-[20px] px-6 py-2.5" 
            : "max-w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-brand-950/5 px-4 sm:px-8 py-4"
        )}
      >
        
        {/* Logo Lockup */}
        <Link to="/" className="flex items-center group relative shrink-0">
          {!logoError ? (
            <div className="flex items-center gap-4">
              <img 
                src="/gsp-logo.jpg" 
                alt="GSP Constructions Logo" 
                className={cn(
                  "w-auto mix-blend-multiply contrast-125 brightness-105 transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:scale-105",
                  isScrolled ? "h-10" : "h-12"
                )} 
                onError={() => setLogoError(true)}
              />
              
              <div className={cn(
                "w-[1px] bg-brand-200 hidden sm:block transition-all duration-500",
                isScrolled ? "h-8" : "h-10"
              )}></div>
              
              <div className="flex flex-col items-start justify-center hidden sm:flex">
                <span className="font-bold text-[22px] tracking-[0.2em] text-brand-950 leading-none mb-1.5 transition-colors duration-300 group-hover:text-brand-800">
                  TEJ<span className="text-accent-500 transition-colors">A</span>SHWI
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
        <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
          <NavLink to="/about" isActive={isActive('/about')}>About</NavLink>

          {/* Services Dropdown */}
          <div 
            className="relative px-1"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={cn(
              "relative flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium transition-all duration-300 group",
              isActive('/services') || servicesOpen ? "text-brand-950" : "text-brand-700 hover:text-brand-950"
            )}>
              <motion.span 
                className="relative z-10 flex items-center gap-1"
                animate={{ y: servicesOpen ? -1.5 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Services
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", servicesOpen && "rotate-180")} />
              </motion.span>
              
              {isActive('/services') && !servicesOpen && (
                <motion.div 
                  layoutId="active-nav-indicator" 
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent-500 rounded-full" 
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
            
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[280px] bg-[#FDFBF7]/95 backdrop-blur-xl rounded-[16px] shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-brand-950/5 overflow-hidden p-2"
                >
                  <div className="flex flex-col">
                    {servicesLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="group/link relative flex items-center px-4 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:bg-brand-50"
                      >
                        <div className="absolute left-0 w-1 h-full bg-accent-500 scale-y-0 origin-left group-hover/link:scale-y-100 transition-transform duration-300 ease-[0.16,1,0.3,1] rounded-r-full" />
                        <span className="text-sm font-medium text-brand-800 group-hover/link:text-brand-950 transition-colors z-10 group-hover/link:translate-x-1 transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/projects" isActive={isActive('/projects')}>Projects</NavLink>
          <NavLink to="/equipment" isActive={isActive('/equipment')}>Equipment</NavLink>
          <NavLink to="/gallery" isActive={isActive('/gallery')}>Gallery</NavLink>
        </div>

        {/* CTA Area */}
        <div className="hidden lg:flex items-center pl-6 ml-6 border-l border-brand-200/60 shrink-0">
          <Link to="/contact">
            <button className="group relative overflow-hidden rounded-[12px] bg-brand-950 px-6 py-2.5 transition-all duration-300 hover:shadow-[0_8px_20px_rgb(3,7,18,0.15)] hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center gap-2 text-[14px] font-semibold text-[#FDFBF7] transition-colors duration-300 group-hover:text-white">
                Get a Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 z-0 h-full w-full bg-accent-500 translate-y-[101%] transition-transform duration-300 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full bg-brand-50 text-brand-950 focus:outline-none transition-colors hover:bg-brand-100"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation (Slide Down) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#FDFBF7] z-40 lg:hidden overflow-y-auto pt-28"
          >
            <div className="px-6 pb-12 flex flex-col space-y-6">
              <Link to="/about" className="text-3xl font-bold text-brand-950 hover:text-brand-600 transition-colors">
                About
              </Link>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center justify-between w-full text-3xl font-bold text-brand-950"
                >
                  Services
                  <ChevronDown className={cn("h-8 w-8 transition-transform duration-300", servicesOpen && "rotate-180")} />
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

              <div className="pt-10 mt-6 border-t border-brand-950/10 flex flex-col gap-4">
                <Link to="/contact">
                  <button className="w-full text-lg py-5 rounded-[16px] font-semibold bg-brand-950 text-white shadow-xl shadow-brand-950/20 active:scale-95 transition-all">
                    Get a Quote
                  </button>
                </Link>
                <a href="tel:+15551234567" className="flex items-center justify-center gap-2 text-brand-700 py-4 font-medium hover:text-brand-950 transition-colors">
                  <Phone className="h-5 w-5" /> Call Us Today
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

