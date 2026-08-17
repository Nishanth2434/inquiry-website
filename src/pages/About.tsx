import React, { useEffect, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, Compass, ShieldCheck, HardHat, TrendingUp,
  Award, Building2, Truck, Ruler
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Asset Imports
import heroBg from '../assets/images/services/service_infra.jpg';
import aboutImg from '../assets/images/about/about_team.jpg';
import ctaBg from '../assets/images/hero/cta_bg.jpg';

// Reusable Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", title }: { end: number, suffix?: string, title: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-brand-300 font-medium text-lg uppercase tracking-wide">{title}</div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* SECTION 1 - HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center bg-brand-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="About Us" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-brand-950/70" />
          {/* Engineering Grid Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        </div>
        
        <div className="container-custom relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="text-brand-400 font-bold tracking-widest uppercase text-sm">Who We Are</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Engineering Roads.<br/>
              <span className="text-brand-400">Delivering Progress.</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 - COMPANY STORY */}
      <section className="section-padding bg-white relative z-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:pr-8">
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Our Story</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-brand-950 mb-8 leading-tight">
                Building the foundations of tomorrow.
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-6 text-lg text-brand-700/80">
                <p>
                  Founded on the principles of precision engineering and uncompromising quality, Apex Infra has grown from a regional contractor into a leading force in national infrastructure development.
                </p>
                <p>
                  We believe that roads are more than just asphalt and concrete—they are the vital arteries of commerce, connection, and progress. Every project we undertake is executed with a profound sense of responsibility towards the communities we serve.
                </p>
                <p>
                  Our legacy is paved into thousands of miles of highways, urban roads, and airport runways, standing as enduring testaments to our expertise and dedication.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img src={aboutImg} alt="Engineering Team" className="w-full h-full object-cover" />
              </div>
              {/* Decorative block */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-50 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brand-100 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - MISSION & VISION */}
      <section className="py-16 md:py-20 bg-brand-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-white p-12 rounded-3xl shadow-sm border border-brand-100 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-brand-950 mb-4">Our Mission</h3>
              <p className="text-brand-700/80 text-lg leading-relaxed">
                To deliver superior infrastructure solutions through innovative engineering, unparalleled craftsmanship, and a steadfast commitment to safety and environmental sustainability.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-brand-950 p-12 rounded-3xl shadow-lg border border-brand-800 hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-brand-800 text-brand-300 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-brand-200 text-lg leading-relaxed">
                To be the undisputed leader in national infrastructure development, setting the global benchmark for quality, durability, and technological advancement in road construction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - OUR EXPERTISE */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Core Competencies</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-950">Our Expertise</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { title: 'Road Construction', icon: <HardHat className="w-8 h-8" />, desc: 'Comprehensive heavy civil construction for highways, bridges, and complex interchanges.' },
              { title: 'Asphalt Technology', icon: <Truck className="w-8 h-8" />, desc: 'Advanced polymer-modified asphalt production and precision paving techniques.' },
              { title: 'Infrastructure', icon: <Building2 className="w-8 h-8" />, desc: 'Large-scale urban and rural connectivity projects designed for the future.' },
              { title: 'Project Management', icon: <TrendingUp className="w-8 h-8" />, desc: 'End-to-end execution, ensuring delivery on time, on budget, and beyond expectations.' },
              { title: 'Quality Control', icon: <Award className="w-8 h-8" />, desc: 'Rigorous testing protocols at every stage to ensure unmatched durability and compliance.' },
              { title: 'Safety Engineering', icon: <ShieldCheck className="w-8 h-8" />, desc: 'A zero-harm safety culture protecting our workforce, partners, and the public.' },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex flex-col gap-4">
                <div className="text-brand-500">{item.icon}</div>
                <h3 className="text-2xl font-bold text-brand-950">{item.title}</h3>
                <p className="text-brand-700/80 leading-relaxed">
                  {item.desc}
                </p>
                <div className="w-12 h-1 bg-brand-100 mt-2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - COMPANY MILESTONES */}
      <section className="section-padding bg-brand-50 overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-950">Journey of Excellence</h2>
          </div>
          
          <div className="relative">
            {/* Horizontal Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-brand-200 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { year: '2010', title: 'Inception', desc: 'Apex Infra founded as a regional paving contractor.' },
                { year: '2015', title: 'Expansion', desc: 'Acquired first asphalt plant and expanded fleet.' },
                { year: '2020', title: 'National Scale', desc: 'Awarded major interstate highway expansion project.' },
                { year: '2025', title: 'Innovation', desc: 'Integrated automated 3D paving and smart infrastructure tech.' },
              ].map((milestone, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100 text-center relative group hover:border-brand-500 transition-colors">
                  <div className="w-4 h-4 bg-brand-500 rounded-full absolute -top-10 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 md:-mt-8 hidden md:block ring-4 ring-white" />
                  <div className="text-3xl font-black text-brand-900 mb-2">{milestone.year}</div>
                  <h4 className="text-lg font-bold text-brand-600 mb-3">{milestone.title}</h4>
                  <p className="text-brand-700/80 text-sm">{milestone.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - LEADERSHIP */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-950">Executive Leadership</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: 'Arjun Sharma', role: 'Chief Executive Officer', initials: 'AS' },
              { name: 'Priya Patel', role: 'Director of Engineering', initials: 'PP' },
              { name: 'Vikram Singh', role: 'Head of Operations', initials: 'VS' },
            ].map((leader, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center group">
                <div className="w-64 h-64 mx-auto bg-brand-50 rounded-full mb-8 flex items-center justify-center border-4 border-brand-100 group-hover:border-brand-500 transition-colors duration-300">
                  <span className="text-6xl font-black text-brand-200 group-hover:text-brand-500 transition-colors">{leader.initials}</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-950 mb-1">{leader.name}</h3>
                <p className="text-brand-600 font-medium">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - NUMBERS */}
      <section className="py-24 bg-brand-950 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-950/90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <AnimatedCounter end={15} suffix="+" title="Years Experience" />
            <AnimatedCounter end={120} suffix="+" title="Projects" />
            <AnimatedCounter end={45} suffix="+" title="Equipment" />
            <AnimatedCounter end={300} suffix="+" title="Team Members" />
          </div>
        </div>
      </section>

      {/* SECTION 6 - CTA */}
      <section className="relative py-16 md:py-32 bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="CTA Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-900/80" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Build your future with Apex.</h2>
            <p className="text-xl md:text-2xl text-brand-200 mb-12 font-light">Partner with the industry leaders for your next major infrastructure development.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
              <Button size="lg" className="bg-accent-500 hover:bg-accent-400 text-brand-950 rounded-xl h-14 px-8 text-[15px] font-bold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto">
                Discuss Your Project
              </Button>
              <Button variant="outline" size="lg" className="border-brand-500 text-brand-200 hover:bg-brand-500/20 hover:text-white rounded-xl h-14 px-8 text-[15px] font-bold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto">
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
