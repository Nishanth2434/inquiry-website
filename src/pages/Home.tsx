import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView, type Variants, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Award, HardHat, TrendingUp, ShieldCheck, 
  MapPin, Clock, Settings, ChevronRight, Star, Quote
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

// Asset Imports
import carousel1 from '../assets/images/hero/carousel_1.jpg';
import carousel2 from '../assets/images/hero/carousel_2.jpg';
import carousel3 from '../assets/images/hero/carousel_3.jpg';
import carousel6 from '../assets/images/hero/carousel_6.jpg';

import aboutImg from '../assets/images/about/about_team.jpg';
import projectHighway from '../assets/images/projects/project_highway.jpg';
import projectDowntown from '../assets/images/projects/project_downtown.jpg';
import servicePaving from '../assets/images/services/service_paving.jpg';
import serviceConst from '../assets/images/services/service_construction.jpg';
import eqPaver from '../assets/images/equipment/eq_paver.jpg';
import eqRoller from '../assets/images/equipment/eq_roller.jpg';
import ctaBg from '../assets/images/hero/cta_bg.jpg';

const heroImages = [carousel1, carousel2, carousel3, carousel6];

// Reusable Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
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
    <div ref={ref} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-brand-100">
      <div className="text-5xl md:text-6xl font-bold text-brand-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-brand-900 font-medium text-lg">{title}</div>
    </div>
  );
};

export const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[100vh] flex items-center bg-brand-950 overflow-hidden">
        {/* Cinematic Carousel Background */}
        <div className="absolute inset-0 z-0 bg-brand-950">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.04 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 6, ease: "linear" }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={heroImages[currentImage]} 
                alt="Construction background" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </AnimatePresence>
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/50 to-transparent z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent z-10" />
        </div>
        
        <div className="container-custom relative z-20 w-full pt-32 pb-20">
          <div className="max-w-4xl">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-accent-500" />
                <span className="text-accent-500 font-bold tracking-[0.25em] uppercase text-sm">
                  Premium Infrastructure Solutions
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[84px] font-bold text-white mb-8 leading-[1.05] tracking-tight">
                Building Roads.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-100 to-brand-300">Connecting Progress.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-brand-100/90 mb-14 max-w-2xl font-light leading-relaxed border-l-[3px] border-accent-500 pl-6">
                Delivering premium asphalt paving, structural road construction, and comprehensive infrastructure solutions engineered for durability and scale.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6">
                <Link to="/projects">
                  <button className="group relative overflow-hidden rounded-[8px] bg-accent-500 px-10 h-16 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(217,119,6,0.3)] hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto">
                    <span className="relative z-10 flex items-center gap-3 text-[15px] font-bold tracking-wider text-brand-950 uppercase transition-colors duration-500 group-hover:text-white">
                      Explore Projects
                      <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 z-0 h-full w-full bg-brand-950 translate-y-[101%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="group relative overflow-hidden rounded-[8px] border border-white/20 bg-white/5 backdrop-blur-md px-10 h-16 transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto">
                    <span className="relative z-10 text-[15px] font-bold tracking-wider text-white uppercase transition-colors duration-500 group-hover:text-accent-100">
                      Request a Quote
                    </span>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - COMPANY INTRODUCTION */}
      <section className="py-32 bg-[#FDFBF7] relative z-20 overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center relative">
            
            {/* Left: Immersive Image Canvas (60% width) */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[60%] relative z-0"
            >
              <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.12)]">
                <img src={aboutImg} alt="Engineering Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-brand-950/10 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 border border-brand-950/10 rounded-[24px]" />
              </div>
              
              {/* Image Annotation */}
              <div className="absolute bottom-8 left-8 bg-[#FDFBF7]/90 backdrop-blur-md px-5 py-3 rounded-[8px] shadow-lg border border-brand-950/5 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-950 uppercase">
                  TEJASHWI / Field Operations
                </span>
              </div>
            </motion.div>
            
            {/* Right: Editorial Text Composition (45% width, overlapping left by 5%) */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={staggerContainer} 
              className="w-full lg:w-[45%] lg:-ml-[5%] relative z-10 mt-12 lg:mt-0"
            >
              <div className="bg-[#FDFBF7] p-10 md:p-14 rounded-[20px] shadow-[0_30px_80px_rgb(0,0,0,0.08)] border border-brand-950/5">
                
                {/* Section Label */}
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="flex items-center gap-4 mb-8">
                  <span className="text-[12px] font-bold tracking-[0.2em] text-brand-400 uppercase">01</span>
                  <div className="h-[1px] w-12 bg-brand-200" />
                  <span className="text-[12px] font-bold tracking-[0.2em] text-brand-950 uppercase">Our Legacy</span>
                </motion.div>
                
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-4xl md:text-5xl lg:text-[52px] font-bold text-brand-950 mb-8 leading-[1.1] tracking-tight">
                  Engineering <br/>
                  <span className="text-brand-600 font-light italic">excellence.</span>
                </motion.h2>
                
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="space-y-6 text-[17px] text-brand-700/80 mb-12 font-light leading-relaxed">
                  <p>
                    TEJASHWI stands at the forefront of modern infrastructure development. We specialize in heavy civil construction, delivering robust road networks that power economies and connect communities.
                  </p>
                  <p>
                    Our commitment to utilizing cutting-edge machinery and premium materials ensures that every project, from vast highways to intricate urban developments, is engineered for generations.
                  </p>
                </motion.div>
                
                {/* Staggered Statistics */}
                <div className="grid grid-cols-2 gap-8 mb-12 border-t border-brand-950/10 pt-8">
                  {[
                    { label: 'Years Experience', val: '15+' },
                    { label: 'Projects Completed', val: '120+' },
                    { label: 'Heavy Machines', val: '40+' },
                    { label: 'Regions Served', val: 'Multiple' },
                  ].map((m, i) => (
                    <motion.div 
                      key={i} 
                      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                      className="relative pl-5"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-brand-100 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-accent-500 rounded-full" />
                      </div>
                      <div className="text-3xl font-bold text-brand-950 mb-1 tracking-tight">{m.val}</div>
                      <div className="text-[11px] text-brand-500 font-bold tracking-widest uppercase">{m.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
                  <Link to="/about" className="group inline-flex items-center gap-4">
                    <span className="text-[13px] font-bold tracking-[0.15em] text-brand-950 uppercase group-hover:text-accent-600 transition-colors">
                      Discover Our Story
                    </span>
                    <div className="w-10 h-10 rounded-full border border-brand-200 flex items-center justify-center group-hover:border-accent-500 group-hover:bg-accent-500 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-brand-950 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - SERVICES */}
      <section className="section-padding bg-brand-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-950 mb-6">Advanced Infrastructure Solutions</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Road Construction', img: serviceConst, link: '/services/road-construction' },
              { title: 'Asphalt Paving', img: servicePaving, link: '/services/asphalt-paving' },
              { title: 'Road Maintenance', img: projectDowntown, link: '/services/road-maintenance' },
              { title: 'Infrastructure', img: projectHighway, link: '/services/infrastructure' },
              { title: 'Site Preparation', img: eqPaver, link: '/services' },
              { title: 'Road Resurfacing', img: servicePaving, link: '/services' },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              >
                <Link to={service.link} className="block group relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-brand-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      <div className="w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - FEATURED PROJECTS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-4 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-950">Featured Projects</h2>
            </div>
            <Link to="/projects">
              <Button variant="outline" className="border-brand-950 text-brand-950 hover:bg-brand-950 hover:text-white rounded-none px-8">
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-8 group relative overflow-hidden rounded-2xl h-[500px]">
              <img src={projectHighway} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Highway" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <Badge variant="accent" className="mb-4 bg-brand-500 text-white border-none">Completed</Badge>
                <h3 className="text-3xl font-bold mb-2">Interstate 95 Expansion</h3>
                <div className="flex gap-4 text-brand-200 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> North Region</span>
                  <span className="flex items-center gap-1"><HardHat className="w-4 h-4"/> Highway Construction</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="md:col-span-4 flex flex-col gap-8">
              {[
                { img: projectDowntown, title: 'Downtown Resurfacing', loc: 'City Center', type: 'Asphalt Paving' },
                { img: serviceConst, title: 'Airport Runway Alpha', loc: 'Regional Airport', type: 'Infrastructure' }
              ].map((proj, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl h-[234px]">
                  <img src={proj.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={proj.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{proj.title}</h3>
                    <div className="text-brand-200 text-sm">{proj.loc} &bull; {proj.type}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - WHY CHOOSE US */}
      <section className="section-padding bg-brand-950 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Apex Advantage</h2>
            <p className="text-xl text-brand-200 font-light">Uncompromising standards. Precision engineering. Superior results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: 'Experienced Team', icon: <HardHat className="w-10 h-10" /> },
              { title: 'Modern Equipment', icon: <Settings className="w-10 h-10" /> },
              { title: 'Quality Materials', icon: <Award className="w-10 h-10" /> },
              { title: 'Safety First', icon: <ShieldCheck className="w-10 h-10" /> },
              { title: 'On-Time Delivery', icon: <Clock className="w-10 h-10" /> },
              { title: 'Engineering Expertise', icon: <TrendingUp className="w-10 h-10" /> },
            ].map((feature, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex gap-6">
                <div className="text-brand-500 shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-brand-300 leading-relaxed text-sm">
                    Leveraging industry best practices to deliver outstanding results that exceed client expectations every time.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - EQUIPMENT */}
      <section className="py-24 bg-brand-50 overflow-hidden">
        <div className="container-custom mb-12">
          <h2 className="text-4xl font-bold text-brand-950">Our Heavy Machinery</h2>
        </div>
        
        <div className="flex gap-6 px-4 md:px-8 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {[
            { img: eqPaver, name: 'Asphalt Paver' },
            { img: eqRoller, name: 'Road Roller' },
            { img: eqPaver, name: 'Excavator' },
            { img: eqRoller, name: 'Motor Grader' },
            { img: eqPaver, name: 'Tipper Truck' },
          ].map((eq, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center group">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-100 transition-all hover:shadow-xl">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gray-100">
                  <img src={eq.img} alt={eq.name} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="text-xl font-bold text-brand-950 text-center">{eq.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 - PROCESS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-950">Our Construction Process</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Site Survey', 'Planning', 'Site Preparation', 'Base Construction',
              'Asphalt Paving', 'Compaction', 'Quality Inspection', 'Completion'
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative group">
                <div className="text-6xl font-black text-brand-50 mb-4 transition-colors group-hover:text-brand-100">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold text-brand-950 mb-2">{step}</h3>
                <div className="w-12 h-1 bg-brand-500 transition-all group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - PROJECT STATISTICS */}
      <section className="py-20 bg-brand-50 border-y border-brand-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCounter end={120} suffix="+" title="Completed Projects" />
            <AnimatedCounter end={15} suffix="+" title="Years Experience" />
            <AnimatedCounter end={40} suffix="+" title="Heavy Machines" />
            <AnimatedCounter end={98} suffix="%" title="On-Time Completion" />
          </div>
        </div>
      </section>

      {/* SECTION 9 - TESTIMONIALS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-950 text-center mb-16">Client Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-soft bg-brand-50 hover:-translate-y-2 transition-transform duration-300">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-brand-300 mb-6" />
                  <p className="text-brand-800 mb-8 italic leading-relaxed">
                    "Apex Infra delivered exceptional results on our regional highway project. Their engineering expertise and commitment to timelines were truly impressive. Highly recommended."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center font-bold text-brand-700">
                      JD
                    </div>
                    <div>
                      <div className="font-bold text-brand-950">John Doe {i}</div>
                      <div className="text-sm text-brand-600">Sample Client Role</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 - CTA */}
      <section className="relative py-32 bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="CTA Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-brand-950/80" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Have a Road Construction Project?</h2>
            <p className="text-xl md:text-2xl text-brand-200 mb-12 font-light">Let's discuss your next infrastructure project and build something lasting.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-400 text-white rounded-none h-14 px-10 text-lg">
                Get a Quote
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-brand-950 rounded-none h-14 px-10 text-lg">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* SECTION 11 - Footer is managed in PageLayout */}

    </div>
  );
};
