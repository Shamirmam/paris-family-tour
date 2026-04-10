/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Fragment } from 'react';
import { 
  Camera, 
  Car, 
  Baby, 
  Star, 
  Check, 
  ChevronDown, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Wifi, 
  Zap,
  ArrowRight,
  MessageCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12 md:mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-poppins font-black italic text-3xl md:text-5xl uppercase tracking-tighter mb-4 ${light ? 'text-white' : 'text-orange-primary'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-base md:text-lg max-w-2xl mx-auto font-medium ${light ? 'text-white/80' : 'text-text-secondary'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const AccordionItem = ({ question, answer }: { question: string; answer: string; key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 border-b border-orange-pale pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-poppins font-semibold text-lg py-2 hover:text-orange-primary transition-colors"
      >
        <span>{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary py-2 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TourCard = ({ image, title, duration, type, tag, rating, reviews, price, onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={onClick}
    className="bg-white rounded-3xl shadow-soft overflow-hidden border border-orange-soft hover:shadow-hover transition-all group cursor-pointer w-[90vw] max-w-xs sm:w-[340px] sm:max-w-sm md:w-[400px] md:max-w-md"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Clock className="w-3 h-3 text-orange-primary" />
          <span className="text-[10px] font-bold text-text-main">{duration}</span>
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
          <Users className="w-3 h-3 text-orange-primary" />
          <span className="text-[10px] font-bold text-text-main">Private</span>
        </div>
        {tag && (
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
            <Star className="w-3 h-3 text-orange-primary fill-current" />
            <span className="text-[10px] font-bold text-text-main">{tag}</span>
          </div>
        )}
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-poppins font-bold italic text-lg mb-4 leading-tight text-text-main min-h-[3rem]">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex text-orange-primary">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-sm text-text-main">{rating}</span>
          <span className="text-text-secondary text-xs">({reviews})</span>
        </div>
        <div className="text-right">
          <div className="text-orange-primary font-poppins font-black text-lg">
            €{price}
          </div>
          <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
            per family (max 7)
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  useEffect(() => {
    if (selectedTour) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedTour]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-orange-cream selection:text-orange-primary">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <a href="#" className="flex items-center justify-center space-x-2 w-full md:w-auto mb-2 md:mb-0">
            <img src="/logo-pft.png" alt="Paris Family Tour Logo" className="h-10 md:h-12 w-auto mx-auto" />
          </a>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-8 mr-4">
              {['Tours', 'How it Works', 'Reviews'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-dmsans font-bold text-text-main hover:text-orange-primary transition-colors text-sm uppercase tracking-wider"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-orange-primary">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="font-poppins font-black italic text-4xl md:text-7xl mb-4 leading-[0.9] text-white uppercase tracking-tighter text-center"
            >
              LIVE THE <br />
              <span className="text-white/80">PARISIAN</span> <br />
              EXPERIENCE
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 mb-12 w-full"
            >
              <p className="font-poppins font-bold text-white text-xl text-center w-full">Unforgettable Family Tours</p>
              <div className="h-0.5 w-20 bg-white/60 hidden md:block"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-row justify-center items-center gap-4 md:gap-8 mb-12 flex-wrap"
            >
              {[
                { icon: "😊", text: "Stress-Free" },
                { icon: "🤝", text: "Local Guides" },
                { icon: "🧘", text: "Relax" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center min-w-[90px]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm border border-white/30 mb-2">
                    {item.icon}
                  </div>
                  <span className="font-poppins font-bold text-white text-xs md:text-sm leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center w-full"
            >
              <a 
                href="#contact" 
                className="inline-flex items-center bg-white text-orange-primary px-10 py-4 rounded-2xl font-nunito font-black text-xl shadow-xl hover:scale-105 transition-transform group border-2 border-white hover:bg-orange-cream hover:text-orange-primary"
              >
                Book a tour →
              </a>
            </motion.div>
          </div>
          
          {/* Right Column: Overlapping Images */}
          <div className="relative">
            {/* Background Shape */}
            <div className="absolute -bottom-10 -left-10 w-64 h-24 bg-orange-primary rounded-3xl -z-10"></div>
            <div className="absolute top-1/2 -right-10 w-20 h-20 bg-orange-primary rounded-full -z-10"></div>
            
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl z-10 aspect-[4/3] w-full"
            >
              <img 
                src="/paris-family.png" 
                alt="Family in Paris" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Overlapping Foreground Image supprimée */}
          </div>
          
        </div>
      </section>

      {/* 2.5 SECTION "OUR TOP TOURS" */}
      <section id="tours" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-black italic text-4xl md:text-7xl text-orange-primary leading-[0.8] uppercase tracking-tighter mb-12 text-center"
          >
            OUR <br />
            TOP <br />
            TOURS
          </motion.h2>
          
          <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                id: 'signature',
                image: "/paris-day.jpg",
                title: "The Signature Tour: Paris Icons for Families",
                duration: "3h",
                type: "Private",
                tag: "Best Seller",
                rating: "5.0",
                reviews: "124",
                price: "499"
              },
              {
                id: 'night',
                image: "/paris-night.png",
                title: "Paris By Night: The City of Lights Sparkle",
                duration: "2h",
                type: "Private",
                tag: "Magical",
                rating: "4.9",
                reviews: "86",
                price: "349"
              }
            ].map((tour, i) => (
              <TourCard key={i} {...tour} onClick={() => setSelectedTour(tour)} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION "AVOID THE CROWDS" */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row bg-orange-primary rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
          >
            {/* Left: Image */}
            <div className="md:w-1/2 h-[250px] md:h-auto overflow-hidden">
              <img 
                src="/paris-libre.jpg" 
                alt="Avoid the crowds" 
                className="w-full h-full object-cover"
              />
            </div>
            
        </div>
      </section>

      {/* 4. SECTION "HOW IT WORKS" */}
      <section id="how-it-works" className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="How It Works" 
            subtitle="Simple, stress-free, and designed for families. Here is how we make your Paris trip unforgettable."
          />
          
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line for Mobile, Horizontal for Desktop */}
            <div className="absolute left-8 md:left-0 md:top-12 md:w-full h-full md:h-0.5 bg-orange-primary/20 z-0"></div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
              {[
                { 
                  icon: "🏨",
                  title: "Doorstep Pickup", 
                  desc: "We meet you at your hotel or Airbnb. No navigating, no getting lost." 
                },
                { 
                  icon: "🚐",
                  title: "The V-Class Experience", 
                  desc: "Relax in a premium Mercedes van with A/C, water, and car seats ready." 
                },
                { 
                  icon: "🗺️",
                  title: "Expert Guiding", 
                  desc: "We know the best angles, the shortest walks, and the most engaging stories for kids." 
                },
                { 
                  icon: "✨",
                  title: "Fully Customizable", 
                  desc: "Want to swap a stop or take a break? We adapt the rhythm and route to your family's needs." 
                }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-20 md:pl-0 md:text-center"
                >
                  <div className="absolute left-0 md:relative md:mx-auto w-16 h-16 rounded-2xl gradient-main text-white flex items-center justify-center text-2xl shadow-lg mb-6">
                    {step.icon}
                  </div>
                  <h3 className="font-poppins font-bold text-xl mb-3 text-text-main">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <a href="#tours" className="inline-flex items-center text-orange-primary font-bold hover:scale-105 transition-transform">
              See the full itinerary <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. SECTION "THEY TRUST US" */}
      <section id="reviews" className="py-16 bg-orange-cream overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="They Trust Us" 
            subtitle="Join the 500+ families who have explored Paris with us."
          />
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 mb-20 opacity-40 grayscale">
            {/* Placeholder Logos */}
            {['Viator', 'TripAdvisor', 'Google', 'GetYourGuide'].map((brand) => (
              <div key={brand} className="font-poppins font-black text-xl md:text-2xl tracking-tighter">{brand}</div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                text: "The BEST decision of our Paris trip. Our 3-year-old was happy the whole time, and we finally got to see the city without the stress of the metro.", 
                author: "Sarah M.", 
                location: "Texas, USA 🇺🇸",
                image: "https://picsum.photos/seed/sarah/100/100"
              },
              { 
                text: "The best way to see Paris with kids. Masso was so patient with our crying toddler and knew exactly where to go. Worth every euro.", 
                author: "Emma L.", 
                location: "London, UK 🇬🇧",
                image: "https://picsum.photos/seed/emma/100/100"
              },
              { 
                text: "We did a walking tour the day before and it was a disaster. THIS is how you visit Paris with kids. Stress-free and fun.", 
                author: "Anna K.", 
                location: "Sydney, AU 🇦🇺",
                image: "https://picsum.photos/seed/anna/100/100"
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-soft flex flex-col justify-between relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 gradient-main rounded-full flex items-center justify-center text-white text-2xl font-serif">
                  “
                </div>
                <div>
                  <div className="flex text-orange-primary mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-text-main text-lg italic mb-8 leading-relaxed">"{review.text}"</p>
                </div>
                <div className="flex items-center space-x-4">
                  <img src={review.image} alt={review.author} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-text-main">{review.author}</p>
                    <p className="text-xs text-text-secondary uppercase tracking-wider">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-orange-primary font-bold hover:underline">
              Read all 150+ reviews on TripAdvisor <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. SECTION "ABOUT / MEET YOUR DRIVER" */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-sm mx-auto"
            >
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/masso/800/1000" 
                  alt="Masso - Your Guide" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-orange-primary text-white p-4 rounded-2xl shadow-xl">
                <p className="font-poppins font-bold text-lg">Masso</p>
                <p className="text-[10px] opacity-90 uppercase tracking-wider">Founder & Dad</p>
              </div>
              <div className="absolute top-10 -right-10 w-32 h-32 bg-orange-primary/10 rounded-full -z-10 blur-xl"></div>
            </motion.div>
            
            <div>
              <div className="inline-block bg-orange-cream text-orange-primary px-4 py-1 rounded-full text-sm font-bold mb-6">
                👋 Nice to meet you!
              </div>
              <h2 className="font-poppins font-black italic text-3xl md:text-5xl mb-6 leading-tight text-orange-primary uppercase tracking-tighter">Meet Your Driver & Local Expert</h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Hi! I'm <span className="text-orange-primary font-bold">Masso</span>. As a Parisian, a dad of three, and a professional driver with over 20 years of experience, I'm not a traditional tour guide—I'm your local expert behind the wheel.
              </p>
              <p className="text-base text-text-secondary leading-relaxed mb-8">
                I created <span className="font-bold">Paris Family Tour</span> to offer a real alternative to exhausting walking tours. No metro stairs with strollers, no "I'm tired" meltdowns. Just a comfortable, private van ride where we go at your family's rhythm.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { icon: "🇫🇷", label: "Born in Paris" },
                  { icon: "👨‍👩‍👧‍👦", label: "Dad of 3" },
                  { icon: "🚗", label: "20y+ Experience" }
                ].map((item, i) => (
                  <div key={i} className={`bg-orange-cream p-4 md:p-6 rounded-3xl text-center border border-orange-primary/20 shadow-sm ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                    <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION FAQ */}
      <section className="py-16 bg-orange-cream">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionTitle title="Frequently Asked Questions" />
          
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-soft">
            {[
              { q: "What ages is this tour suitable for?", a: "All ages! From newborns to teenagers. We provide car seats for babies (0-12 months), toddler seats (1-4 years), and booster seats (4-10 years) — all free of charge." },
              { q: "What happens if it rains?", a: "We never cancel! Since this is a private van tour, you'll stay dry and comfortable while admiring the monuments. Paris is beautiful in the rain, and we'll adjust the stops so you can enjoy the views from the comfort of the van." },
              { q: "Can we customize the itinerary?", a: "Absolutely! This is our recommended itinerary — but the tour is fully customizable. Want to swap a stop? Add extra time at the Eiffel Tower? Skip Montmartre and go to Le Marais instead? Just tell us and we'll adjust." },
              { q: "What's your cancellation policy?", a: "Free cancellation up to 48 hours before the tour. Full refund, no questions asked." },
              { q: "Do you offer other tours?", a: "We focus on our two most popular experiences: The Signature Tour and Paris By Night. However, if you have a special request, feel free to ask!" }
            ].map((item, i) => (
              <AccordionItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. SECTION CONTACT / BOOKING */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Let's Plan Your Perfect Day" 
            subtitle="Fill out the form below and Masso will get back to you personally within 2 hours."
          />
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Left: Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-orange-cream p-10 rounded-[40px] shadow-soft border border-orange-primary/20"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-text-secondary uppercase tracking-widest">Your Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-orange-primary outline-none transition-colors text-sm" placeholder="e.g. Sarah Miller" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-text-secondary uppercase tracking-widest">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-orange-primary outline-none transition-colors text-sm" placeholder="sarah@example.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-text-secondary uppercase tracking-widest">Preferred Date</label>
                    <input type="date" className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-orange-primary outline-none transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-text-secondary uppercase tracking-widest">Kids' Ages</label>
                    <input type="text" className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-orange-primary outline-none transition-colors text-sm" placeholder="e.g. 2 and 5 years old" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 text-text-secondary uppercase tracking-widest">Tell us about your family</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-orange-primary outline-none transition-colors text-sm" placeholder="Any special requests? Favorite spots?"></textarea>
                </div>
                <button type="submit" className="w-full gradient-main text-white py-4 rounded-xl font-nunito font-black text-lg shadow-lg hover:scale-[1.02] transition-transform">
                  Check Availability
                </button>
                <p className="text-center text-xs text-text-secondary">
                  🔒 No payment required now. We'll confirm availability first.
                </p>
              </form>
            </motion.div>
            
            {/* Right: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-12"
            >
              <div className="space-y-10">
                <div className="bg-orange-cream p-8 rounded-[40px] border border-orange-primary/20 shadow-sm">
                  <h4 className="font-poppins font-bold text-2xl mb-6 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-orange-primary text-white flex items-center justify-center mr-4 text-sm">✨</span>
                    The "No-Stress" Guarantee
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Free cancellation up to 48h before",
                      "No deposit required to book",
                      "Car seats provided for all ages",
                      "Weather-proof (Private Van comfort)",
                      "100% kid-friendly pace"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-text-secondary">
                        <Check className="w-5 h-5 text-orange-primary mr-3" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center">
                  <a href="https://wa.me/33600000000" className="bg-white p-6 rounded-3xl border border-orange-primary/20 shadow-sm hover:shadow-md transition-shadow text-center group w-full max-w-[240px]">
                    <div className="w-12 h-12 rounded-2xl bg-orange-primary/10 text-orange-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-text-main">WhatsApp</p>
                    <p className="text-xs text-text-secondary">Instant Chat</p>
                  </a>
                </div>
              </div>
              
              {/* Removed Masso quote block */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-text-main text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
            <div className="col-span-2 md:col-span-3">
              <a href="#" className="mb-6 block">
                <img src="/logo-pft.png" alt="Paris Family Tour Logo" className="h-12 w-auto" />
              </a>
              <p className="text-white/60 max-w-sm leading-relaxed">
                The most stress-free way to visit Paris with your family. Private Mercedes tours designed for kids and parents.
              </p>
            </div>
            <div>
              <h4 className="font-poppins font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/60">
                <li><a href="#tours" className="hover:text-orange-primary transition-colors">Tours</a></li>
                <li><a href="#about" className="hover:text-orange-primary transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-orange-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-orange-primary transition-colors">Legal Mentions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-white/40">
            <p>© 2026 Paris Family Tour — All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/33600000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-orange-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-20 bg-white text-text-main px-4 py-2 rounded-xl shadow-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us!
        </span>
      </a>

      {/* Tour Highlights Marquee */}
      <div className="bg-orange-cream py-16 overflow-hidden">
        <div className="flex space-x-6 animate-marquee whitespace-nowrap">
          {[
            { seed: "paris-family-eiffel", alt: "Family at Eiffel Tower" },
            { seed: "paris-kids-louvre", alt: "Kids at Louvre" },
            { seed: "paris-family-cafe", alt: "Family at Paris Cafe" },
            { seed: "paris-family-seine", alt: "Family by the Seine" },
            { seed: "paris-kids-carousel", alt: "Kids on Carousel" },
            { seed: "paris-family-montmartre", alt: "Family in Montmartre" },
            { seed: "paris-kids-crepe", alt: "Kids eating crepes" },
            { seed: "paris-family-notredame", alt: "Family at Notre Dame" },
            { seed: "paris-kids-park", alt: "Kids in Tuileries Garden" },
            { seed: "paris-family-arc", alt: "Family at Arc de Triomphe" }
          ].map((img, i) => (
            <div key={i} className="inline-block w-80 h-60 rounded-3xl overflow-hidden bg-white flex-shrink-0 shadow-soft border border-orange-primary/10">
              <img 
                src={`https://picsum.photos/seed/${img.seed}/400/300`} 
                alt={img.alt} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            { seed: "paris-family-eiffel", alt: "Family at Eiffel Tower" },
            { seed: "paris-kids-louvre", alt: "Kids at Louvre" },
            { seed: "paris-family-cafe", alt: "Family at Paris Cafe" },
            { seed: "paris-family-seine", alt: "Family by the Seine" },
            { seed: "paris-kids-carousel", alt: "Kids on Carousel" },
            { seed: "paris-family-montmartre", alt: "Family in Montmartre" },
            { seed: "paris-kids-crepe", alt: "Kids eating crepes" },
            { seed: "paris-family-notredame", alt: "Family at Notre Dame" },
            { seed: "paris-kids-park", alt: "Kids in Tuileries Garden" },
            { seed: "paris-family-arc", alt: "Family at Arc de Triomphe" }
          ].map((img, i) => (
            <div key={`dup-${i}`} className="inline-block w-80 h-60 rounded-3xl overflow-hidden bg-white flex-shrink-0 shadow-soft border border-orange-primary/10">
              <img 
                src={`https://picsum.photos/seed/${img.seed}/400/300`} 
                alt={img.alt} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTour && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-orange-primary/10 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSelectedTour(null)}
                  className="p-2 hover:bg-orange-cream rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-text-main" />
                </button>
                <h2 className="font-poppins font-bold text-xl text-text-main">{selectedTour.title}</h2>
              </div>
              {/* Book Now button supprimé */}
            </div>

            <div className="container mx-auto px-6 py-12">
              {(() => {
                const tourData: Record<string, any> = {
                  signature: {
                    subtitle: "Your 3-Hour Paris Family Experience",
                    price: "499",
                    itinerary: [
                      { spot: "⛪ Notre Dame", desc: "The heart of Paris. Admire the grand cathedral and its famous gargoyles." },
                      { spot: "⛪ Sacré-Coeur", desc: "A white castle on a hill! Enjoy the best panoramic view of the whole city." },
                      { spot: "🏛️ Arc de Triomphe", desc: "A massive arch at the top of the Champs-Élysées. A true symbol of French pride." },
                      { spot: "🗼 Trocadéro", desc: "The ultimate photo spot! The best view of the Eiffel Tower across the river." },
                      { spot: "🗼 Tour Eiffel", desc: "The Iron Lady herself. A must-see that sparkles and towers over the city." },
                      { spot: "🌉 Pont Alexandre III", desc: "The most beautiful bridge in the world, decorated with golden statues and lamps." },
                      { spot: "🖼️ Musée du Louvre", desc: "Home to the Mona Lisa and the famous glass pyramid. A palace of art and history." }
                    ],
                    included: [
                      "Private Mercedes V-Class",
                      "Car seats for all ages — FREE",
                      "Expert local driver",
                      "Kid-friendly approach (No walking)",
                      "Kids activity kit",
                      "Hotel pickup & drop-off",
                      "WiFi, A/C, phone chargers"
                    ]
                  },
                  night: {
                    subtitle: "2 Hours of Paris Night Magic",
                    price: "349",
                    itinerary: [
                      { spot: "🌙 Montmartre", desc: "The Sacré-Cœur glowing white against the night sky with a breathtaking view of the city lights." },
                      { spot: "💎 Musée du Louvre", desc: "The glass pyramid glowing at night is a magical sight that feels like a movie set." },
                      { spot: "🏎️ Champs-Élysées", desc: "A cruise down the world's most famous avenue, beautifully illuminated and full of life." },
                      { spot: "🏛️ Arc de Triomphe", desc: "Admire the monumental arch standing tall under the golden city lights." },
                      { spot: "✨ Tour Eiffel Sparkle", desc: "The grand finale! Witness the hourly light show from the best secret vantage point." }
                    ],
                    included: [
                      "Private Mercedes V-Class",
                      "Expert local driver & guide",
                      "Sparkling juice for kids",
                      "Hotel pickup & drop-off",
                      "WiFi, A/C, phone chargers"
                    ]
                  }
                };

                const details = tourData[selectedTour.id];

                if (!details) return (
                  <div className="max-w-4xl mx-auto text-center py-20">
                    <h3 className="font-poppins font-bold text-3xl mb-6">Details for {selectedTour.title} coming soon!</h3>
                    <p className="text-text-secondary text-xl mb-12">We are currently refining the itinerary for this magical experience.</p>
                    <button 
                      onClick={() => setSelectedTour(null)}
                      className="bg-orange-primary text-white px-10 py-4 rounded-xl font-nunito font-black text-lg"
                    >
                      Back to Tours
                    </button>
                  </div>
                );

                return (
                  <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative mb-8 lg:mb-0"
                      >
                        <img src={selectedTour.image} alt={selectedTour.title} className="w-full aspect-video object-cover rounded-3xl shadow-2xl" />
                        {/* Safety First card supprimée */}
                      </motion.div>
                      
                      <div className="space-y-6 md:space-y-8">
                        <h3 className="font-poppins font-black italic text-3xl md:text-4xl text-text-main leading-tight">
                          {details.subtitle.split(' ').map((word: string, i: number) => (
                            <Fragment key={i}>
                              {i === 2 ? <br className="hidden md:block" /> : null}
                              {i === 0 ? word : ` ${word}`}
                            </Fragment>
                          ))}
                        </h3>
                        <div className="space-y-6">
                          {details.itinerary.map((item: any, i: number) => (
                            <div key={i} className="flex items-start space-x-4">
                              <div className="bg-orange-cream p-2 rounded-lg">
                                <Check className="text-orange-primary w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-poppins font-bold text-lg">{item.spot}</h4>
                                <p className="text-text-secondary">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-10 p-6 bg-orange-cream rounded-3xl border border-orange-primary/20">
                          <p className="text-text-main font-medium leading-relaxed italic">
                            "This is our recommended itinerary — but the tour is fully customizable. Want to swap a stop? Add extra time at the Eiffel Tower? Skip Montmartre and go to Le Marais instead? Just tell us and we'll adjust."
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div className="bg-orange-cream p-6 md:p-10 rounded-3xl">
                        <h4 className="font-poppins font-bold text-xl md:text-2xl mb-6 md:mb-8">What's included:</h4>
                        <div className="grid gap-3 md:gap-4">
                          {details.included.map((item: string, i: number) => (
                            <div key={i} className="flex items-center space-x-3 text-text-secondary">
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-orange-primary" />
                              <span className="font-medium text-sm md:text-base">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-text-main p-6 md:p-10 rounded-3xl text-white">
                        <h4 className="font-poppins font-bold text-xl md:text-2xl mb-6 md:mb-8">Pricing:</h4>
                        <div className="flex items-baseline mb-4">
                          <span className="text-4xl md:text-6xl font-black">€{details.price}</span>
                          <span className="ml-2 opacity-60 text-sm md:text-base">per family</span>
                        </div>
                        <p className="opacity-80 mb-6 md:mb-8 text-sm md:text-base">Up to 7 passengers. All taxes and fees included.</p>
                        <a 
                          href={`https://wa.me/33600000000?text=I'd like to book the ${selectedTour.title}`}
                          className="block w-full bg-orange-primary text-white text-center py-3 md:py-4 rounded-xl font-nunito font-black text-base md:text-lg hover:scale-105 transition-transform"
                        >
                          Book via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
}
