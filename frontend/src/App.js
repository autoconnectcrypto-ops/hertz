import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Phone, Mail, MapPin, Menu, X, ChevronLeft, ChevronRight, Check, Shield, Award, Clock, ArrowRight, Settings, FileText, Wrench, ChevronDown, Car, CreditCard, Key, Truck, HelpCircle, Scale, BookOpen } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Scroll Animation Hook
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Header Component
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0A0A0A] sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo">
            <span className="text-[#FFD100] text-2xl md:text-3xl font-bold tracking-tight" style={{fontFamily: 'Oswald, sans-serif'}}>
              HERTZ
            </span>
            <span className="text-white text-2xl md:text-3xl font-bold tracking-tight" style={{fontFamily: 'Oswald, sans-serif'}}>
              PRO
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/catalogue" className="nav-link">Catalogue</Link>
            <Link to="/qui-sommes-nous" className="nav-link">Qui sommes-nous</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <a href="tel:+33000000000" className="bg-[#FFD100] text-black font-semibold uppercase tracking-wider text-sm px-6 py-3 hover:bg-white transition-colors">
              Nous Appeler
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-btn"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden py-6 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-white/80 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link to="/catalogue" className="text-white/80 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>Catalogue</Link>
              <Link to="/qui-sommes-nous" className="text-white/80 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>Qui sommes-nous</Link>
              <Link to="/contact" className="text-white/80 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
              <a href="tel:+33000000000" className="bg-[#FFD100] text-black font-semibold text-center py-3 mt-4">Nous Appeler</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-[#0A0A0A] text-white py-16" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#FFD100] text-3xl font-bold" style={{fontFamily: 'Oswald, sans-serif'}}>HERTZ</span>
            <span className="text-white text-3xl font-bold" style={{fontFamily: 'Oswald, sans-serif'}}>PRO</span>
          </div>
          <p className="text-white/60 leading-relaxed max-w-md">
            Spécialiste de la vente de véhicules d'occasion premium issus de notre flotte. 
            Qualité certifiée, historique transparent, prix compétitifs.
          </p>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Navigation</h4>
          <div className="space-y-3 text-white/60">
            <Link to="/" className="block hover:text-[#FFD100] transition-colors">Accueil</Link>
            <Link to="/catalogue" className="block hover:text-[#FFD100] transition-colors">Catalogue</Link>
            <Link to="/qui-sommes-nous" className="block hover:text-[#FFD100] transition-colors">Qui sommes-nous</Link>
            <Link to="/contact" className="block hover:text-[#FFD100] transition-colors">Contact</Link>
            <Link to="/faq" className="block hover:text-[#FFD100] transition-colors">FAQ</Link>
          </div>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Informations</h4>
          <div className="space-y-3 text-white/60">
            <Link to="/cgv" className="block hover:text-[#FFD100] transition-colors">Conditions de Vente</Link>
            <Link to="/mentions-legales" className="block hover:text-[#FFD100] transition-colors">Mentions Légales</Link>
          </div>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Contact</h4>
          <div className="space-y-4 text-white/60">
            <p className="flex items-center gap-3"><Phone size={16} className="text-[#FFD100]" /> +33 6 00 00 00 00</p>
            <p className="flex items-center gap-3"><Mail size={16} className="text-[#FFD100]" /> contact@hertz-pro.fr</p>
            <p className="flex items-center gap-3"><MapPin size={16} className="text-[#FFD100]" /> Paris, France</p>
          </div>
          <div className="mt-6 space-y-2 text-white/60 text-sm">
            <p>Lun - Ven : 9h - 19h</p>
            <p>Samedi : 10h - 18h</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
        <p>© 2024 HERTZ-PRO. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/cgv" className="hover:text-[#FFD100] transition-colors">CGV</Link>
          <Link to="/mentions-legales" className="hover:text-[#FFD100] transition-colors">Mentions légales</Link>
          <Link to="/faq" className="hover:text-[#FFD100] transition-colors">FAQ</Link>
        </div>
      </div>
    </div>
  </footer>
);

// Home Page
const Home = () => {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [processRef, processVisible] = useScrollAnimation();
  const [brandsRef, brandsVisible] = useScrollAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/vehicles`);
        setVehicleCount(response.data.length);
        setFeaturedVehicles(response.data.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div data-testid="home-page">
      {/* Hero Section - Light Theme */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden" data-testid="hero-section">
        {/* Background Image - Right Side */}
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-full lg:w-3/5 h-full">
            <img 
              src="https://images.unsplash.com/photo-1616322956650-f5314607332a?auto=format&fit=crop&w=1920&q=80"
              alt="Intérieur automobile luxe"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 lg:from-white lg:via-white/80 lg:to-transparent"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-32 right-1/4 w-72 h-72 bg-[#FFD100]/10 rounded-full blur-3xl hidden lg:block"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#FFD100]/5 rounded-full blur-2xl hidden lg:block"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-8 animate-fade-in-up animate-pulse-slow">
              Véhicules de Flotte Premium
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-8 text-[#0A0A0A] animate-fade-in-up animation-delay-100" style={{fontFamily: 'Oswald, sans-serif'}}>
              Hertz Pro<br />
              <span className="text-[#0A0A0A] border-b-4 border-[#FFD100]">Jusqu'à -20%</span>
            </h1>
            
            <p className="text-lg text-[#555] mb-6 max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
              Accédez à une sélection de véhicules issus de la flotte Hertz Pro, <strong className="text-[#0A0A0A]">récents et rigoureusement entretenus</strong>.
            </p>
            
            <p className="text-lg text-[#555] mb-8 max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
              <strong className="text-[#0A0A0A]">Berlines, SUV, utilitaires</strong> : une gamme adaptée aux besoins des professionnels, alliant fiabilité et disponibilité immédiate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Link to="/catalogue" className="bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center gap-3 hover:bg-[#FFD100] hover:text-black transition-all hover:scale-105" data-testid="cta-catalogue">
                Découvrir le Catalogue
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-all">
                Nous Contacter
              </Link>
            </div>

            {/* Stats inline for desktop */}
            <div className="hidden lg:flex gap-12 mt-12 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>{vehicleCount}+</div>
                <div className="text-sm text-[#666] uppercase tracking-wider mt-1">Véhicules</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFD100]" style={{fontFamily: 'Oswald, sans-serif'}}>-20%</div>
                <div className="text-sm text-[#666] uppercase tracking-wider mt-1">De Remise</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>100%</div>
                <div className="text-sm text-[#666] uppercase tracking-wider mt-1">Révisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>12</div>
                <div className="text-sm text-[#666] uppercase tracking-wider mt-1">Mois Garantie</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-[#0A0A0A]/40" />
        </div>
      </section>

      {/* Stats Section - Mobile */}
      <section className="bg-[#FFD100] py-12 lg:hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>{vehicleCount}+</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">Véhicules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>-20%</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">De Remise</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>100%</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">Révisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>12</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">Mois Garantie</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
              Pourquoi <span className="text-[#0A0A0A]">Hertz</span> <span className="text-[#FFD100]">Pro</span> ?
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto text-lg">
              Des véhicules premium à prix destockage, avec la garantie de qualité Hertz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card group text-center hover-lift">
              <div className="w-16 h-16 bg-[#FFD100] flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Shield className="text-black" size={32} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                Qualité Certifiée
              </h3>
              <p className="text-[#666666] leading-relaxed">
                Chaque véhicule est inspecté selon 150 points de contrôle. 
                Historique d'entretien complet et transparent.
              </p>
            </div>

            <div className="feature-card group text-center hover-lift">
              <div className="w-16 h-16 bg-[#FFD100] flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Award className="text-black" size={32} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                Prix Destockage
              </h3>
              <p className="text-[#666666] leading-relaxed">
                Jusqu'à 20% de remise sur le prix du marché. Des véhicules récents 
                à des tarifs imbattables.
              </p>
            </div>

            <div className="feature-card group text-center hover-lift">
              <div className="w-16 h-16 bg-[#FFD100] flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Clock className="text-black" size={32} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                Entretien Pro
              </h3>
              <p className="text-[#666666] leading-relaxed">
                Tous nos véhicules sont entretenus en concession officielle. 
                Carnet d'entretien à jour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-24 bg-[#F5F5F5]" data-testid="process-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
              Comment ça <span className="text-[#FFD100]">marche</span> ?
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto text-lg">
              Un processus simple et transparent pour acquérir vos véhicules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className={`process-step ${processVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
              <div className="process-step-number">1</div>
              <Car className="mx-auto mb-4 text-[#0A0A0A]" size={32} />
              <h3 className="text-lg font-bold uppercase mb-3 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>Sélectionnez</h3>
              <p className="text-[#666666] text-sm">Parcourez notre catalogue et sélectionnez les véhicules qui vous correspondent.</p>
            </div>

            <div className={`process-step ${processVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <div className="process-step-number">2</div>
              <Phone className="mx-auto mb-4 text-[#0A0A0A]" size={32} />
              <h3 className="text-lg font-bold uppercase mb-3 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>Contactez</h3>
              <p className="text-[#666666] text-sm">Appelez nos commerciaux ou envoyez un email.</p>
            </div>

            <div className={`process-step ${processVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="process-step-number">3</div>
              <FileText className="mx-auto mb-4 text-[#0A0A0A]" size={32} />
              <h3 className="text-lg font-bold uppercase mb-3 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>Commandez</h3>
              <p className="text-[#666666] text-sm">Édition du bon de commande et paiement.</p>
            </div>

            <div className={`process-step ${processVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <div className="process-step-number">4</div>
              <Truck className="mx-auto mb-4 text-[#0A0A0A]" size={32} />
              <h3 className="text-lg font-bold uppercase mb-3 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>Livraison</h3>
              <p className="text-[#666666] text-sm">Livraison des véhicules via transporteur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      {featuredVehicles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                  Véhicules <span className="text-[#FFD100]">à la une</span>
                </h2>
                <p className="text-[#666666] text-lg">Découvrez notre sélection du moment.</p>
              </div>
              <Link to="/catalogue" className="hidden md:flex items-center gap-2 text-[#0A0A0A] font-semibold uppercase tracking-wider hover:text-[#FFD100] transition-colors">
                Voir tout <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/catalogue" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-8 py-4 hover:bg-[#FFD100] hover:text-black transition-colors">
                Voir tout le catalogue <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Brands Section */}
      <section ref={brandsRef} className="py-16 bg-[#F5F5F5] border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <p className="text-[#666] uppercase tracking-widest text-sm">Nos marques disponibles</p>
          </div>
          <div className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 ${brandsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {['AUDI', 'BMW', 'MERCEDES', 'VOLKSWAGEN', 'PEUGEOT', 'RENAULT', 'FIAT', 'KIA'].map((brand, index) => (
              <span key={brand} className="text-[#999] hover:text-[#0A0A0A] transition-colors text-xl font-bold tracking-wider" style={{fontFamily: 'Oswald, sans-serif', animationDelay: `${index * 0.1}s`}}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#FFD100]" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
            Prêt à trouver votre véhicule ?
          </h2>
          <p className="text-[#0A0A0A]/70 max-w-2xl mx-auto mb-10 text-lg">
            Parcourez notre catalogue de {vehicleCount} véhicules disponibles. 
            Essai et livraison possibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogue" className="bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all hover:scale-105">
              Voir le Catalogue
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+33600000000" className="border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center gap-3 hover:bg-[#0A0A0A] hover:text-white transition-colors">
              <Phone size={18} />
              Appeler
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Vehicle Card Component
const VehicleCard = ({ vehicle }) => {
  const discount = vehicle.prix_original 
    ? Math.round((1 - vehicle.prix / vehicle.prix_original) * 100) 
    : 20;

  return (
    <Link to={`/vehicule/${vehicle.id}`} className="block group" data-testid={`vehicle-card-${vehicle.id}`}>
      <div className="vehicle-card">
        <div className="relative image-zoom aspect-[16/10]">
          {discount > 0 && (
            <span className="badge-discount absolute top-4 left-4 z-10">-{discount}%</span>
          )}
          <img 
            src={vehicle.images[0]?.url || 'https://via.placeholder.com/400x250'} 
            alt={`${vehicle.marque} ${vehicle.modele}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
              {vehicle.marque} <span className="text-[#0A0A0A]">{vehicle.modele}</span>
            </h3>
            {vehicle.reference && (
              <span className="text-xs font-bold text-[#0A0A0A] uppercase">
                {vehicle.reference}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-[#0A0A0A] mb-4">
            <span>{vehicle.annee}</span>
            <span className="w-1 h-1 bg-[#0A0A0A] rounded-full"></span>
            <span>{vehicle.km?.toLocaleString('fr-FR')} km</span>
            <span className="w-1 h-1 bg-[#0A0A0A] rounded-full"></span>
            <span>{vehicle.specs?.carburant}</span>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-[#E5E5E5]">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-[#333] line-through opacity-70">
                {vehicle.prix?.toLocaleString('fr-FR')} €
              </span>
              <span className="text-xl font-bold text-[#0A0A0A] border-b-4 border-[#FFD100] pb-0.5" style={{fontFamily: 'Oswald, sans-serif'}}>
                {Math.round(vehicle.prix * 0.8).toLocaleString('fr-FR')} €
              </span>
            </div>
            <span className="text-[#0A0A0A] group-hover:text-[#FFD100] group-hover:translate-x-1 transition-all">
              <ArrowRight size={20} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Catalogue Page
const Catalogue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${API}/vehicles`);
        setVehicles(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="bg-[#F5F5F5] min-h-screen" data-testid="catalogue-page">
      {/* Header with Background Image */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
            Flotte Hertz Pro
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
            Notre <span className="border-b-4 border-[#FFD100]">Catalogue</span>
          </h1>
          <p className="text-[#555] max-w-2xl text-lg">
            {vehicles.length} véhicules premium disponibles. 
            Tous entretenus en concession avec historique complet.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="vehicles-grid">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Vehicle Detail Page
const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${API}/vehicles/${id}`);
        setVehicle(response.data);
        // Set default image to photo 2 (index 1) or use defaultImageIndex from DB
        setActiveImage(response.data.defaultImageIndex || 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#0A0A0A]">Véhicule non trouvé</h2>
          <button onClick={() => navigate('/catalogue')} className="bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-6 py-3 hover:bg-[#FFD100] hover:text-black transition-colors">
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  const discount = vehicle.prix_original 
    ? Math.round((1 - vehicle.prix / vehicle.prix_original) * 100) 
    : 20;

  return (
    <div className="bg-[#F5F5F5] min-h-screen" data-testid="vehicle-detail-page">
      {/* Back navigation */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <button 
            onClick={() => navigate('/catalogue')} 
            className="flex items-center gap-2 text-[#666] hover:text-[#0A0A0A] transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Retour au catalogue</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] bg-white border border-[#E5E5E5] shadow-sm">
              {discount > 0 && (
                <span className="badge-discount absolute top-4 left-4 z-10">-{discount}%</span>
              )}
              <img 
                src={vehicle.images[activeImage]?.url || 'https://via.placeholder.com/800x500'} 
                alt={`${vehicle.marque} ${vehicle.modele}`}
                className="w-full h-full object-cover"
              />
              
              {vehicle.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-[#FFD100] text-white hover:text-black flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setActiveImage((prev) => (prev + 1) % vehicle.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-[#FFD100] text-white hover:text-black flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {vehicle.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {vehicle.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`gallery-thumb aspect-square border-2 ${index === activeImage ? 'border-[#FFD100] opacity-100' : 'border-[#E5E5E5] opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Title Card */}
            <div className="bg-white border border-[#E5E5E5] p-6 shadow-sm">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                {vehicle.marque} {vehicle.specs?.modele_court || vehicle.modele?.split(' ')[0]}
              </h1>
              <p className="text-[#666] text-sm mt-2">{vehicle.modele}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-[#FFD100] text-black text-xs font-bold px-3 py-1 uppercase">Première main</span>
                <span className="bg-[#FFD100] text-[#0A0A0A] text-xs font-bold px-3 py-1 uppercase">-20%</span>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white border border-[#E5E5E5] shadow-sm">
              <div className="bg-[#F8F8F8] px-6 py-3 border-b border-[#E5E5E5]">
                <h3 className="font-bold text-[#0A0A0A] uppercase text-sm tracking-wider">Informations</h3>
              </div>
              <div className="divide-y divide-[#E5E5E5]">
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">Localisation</span>
                  <span className="text-[#0A0A0A] font-semibold">Paris</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">1ère immatriculation</span>
                  <span className="text-[#0A0A0A] font-semibold">{vehicle.specs?.date_immat || '-'}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">Kilométrage</span>
                  <span className="text-[#0A0A0A] font-semibold">{vehicle.km?.toLocaleString('fr-FR')} km</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">Numéro d'offre</span>
                  <span className="text-[#0A0A0A] font-semibold">{vehicle.reference}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">Carburant</span>
                  <span className="text-[#0A0A0A] font-semibold">{vehicle.specs?.carburant}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">Puissance</span>
                  <span className="text-[#0A0A0A] font-semibold">{vehicle.specs?.puissance}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-[#666] text-sm">Transmission</span>
                  <span className="text-[#0A0A0A] font-semibold">{vehicle.specs?.boite}</span>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-white border border-[#E5E5E5] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#666] text-sm">Prix du marché</span>
                <span className="text-xl font-semibold text-[#333] line-through opacity-70">{vehicle.prix?.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
                <span className="text-[#0A0A0A] font-bold">Votre prix HERTZ-PRO</span>
                <span className="text-3xl font-bold text-[#0A0A0A] border-b-4 border-[#FFD100] pb-1" style={{fontFamily: 'Oswald, sans-serif'}}>
                  {Math.round(vehicle.prix * 0.8).toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-[#10B981]">
                <Check size={18} />
                <span className="font-semibold">Économisez {Math.round(vehicle.prix * 0.2).toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+33600000000" className="bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-6 py-4 flex-1 text-center hover:bg-[#FFD100] hover:text-black transition-colors">
                <Phone size={18} className="inline mr-2" />
                Appeler
              </a>
              <Link to="/contact" className="border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold uppercase tracking-wider px-6 py-4 flex-1 text-center hover:bg-[#0A0A0A] hover:text-white transition-colors">
                <Mail size={18} className="inline mr-2" />
                Nous écrire
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 pt-16 border-t border-[#E5E5E5]">
          <div className="flex gap-2 mb-8 overflow-x-auto border-b border-[#E5E5E5]">
            <button onClick={() => setActiveTab('specs')} className={`px-6 py-3 font-semibold uppercase text-sm tracking-wider transition-colors ${activeTab === 'specs' ? 'text-[#0A0A0A] border-b-2 border-[#FFD100]' : 'text-[#999] hover:text-[#0A0A0A]'}`}>
              <Settings size={16} className="inline mr-2" />Caractéristiques
            </button>
            <button onClick={() => setActiveTab('options')} className={`px-6 py-3 font-semibold uppercase text-sm tracking-wider transition-colors ${activeTab === 'options' ? 'text-[#0A0A0A] border-b-2 border-[#FFD100]' : 'text-[#999] hover:text-[#0A0A0A]'}`}>
              <FileText size={16} className="inline mr-2" />Équipements ({vehicle.options?.length || 0})
            </button>
            <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-semibold uppercase text-sm tracking-wider transition-colors ${activeTab === 'history' ? 'text-[#0A0A0A] border-b-2 border-[#FFD100]' : 'text-[#999] hover:text-[#0A0A0A]'}`}>
              <Wrench size={16} className="inline mr-2" />Entretien ({vehicle.historique?.length || 0})
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="animate-fade-in">
              <div className="bg-white border border-[#E5E5E5] shadow-sm">
                <h4 className="text-[#0A0A0A] font-bold uppercase tracking-wider p-6 border-b border-[#E5E5E5]" style={{fontFamily: 'Oswald, sans-serif'}}>
                  Données techniques
                </h4>
                <div className="divide-y divide-[#E5E5E5]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Numéro VIN</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.vin || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Nombre de propriétaires précédents</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.proprietaires || '-'}</span>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Fabricant</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.marque || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Modèle</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.modele_court || vehicle.modele || '-'}</span>
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Type de véhicule</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.type_vehicule || 'Voitures d\'occasion'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Forme de construction</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.categorie || '-'}</span>
                    </div>
                  </div>
                  {/* Row 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Date de première immatriculation</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.date_immat || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Kilométrage</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.km?.toLocaleString('fr-FR')} KM</span>
                    </div>
                  </div>
                  {/* Row 5 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Transmission</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.boite || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Carburant</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.carburant || '-'}</span>
                    </div>
                  </div>
                  {/* Row 6 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Performance</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.puissance || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Cylindrée</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.cylindree || '-'}</span>
                    </div>
                  </div>
                  {/* Row 7 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Portes</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.portes || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Sièges</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.sieges || '-'}</span>
                    </div>
                  </div>
                  {/* Row 8 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Couleur extérieur</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.couleur || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Couleur intérieure</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.couleur_interieur || '-'}</span>
                    </div>
                  </div>
                  {/* Row 9 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Disponible à partir de</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.disponibilite || 'Immédiatement'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-[#666] text-sm">Pays d'origine</span>
                      <span className="text-[#0A0A0A] font-medium">{vehicle.specs?.pays_origine || 'France'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'options' && (
            <div className="animate-fade-in">
              {vehicle.options?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicle.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-4 border border-[#E5E5E5] shadow-sm">
                      <Check size={16} className="text-[#10B981] flex-shrink-0" />
                      <span className="text-sm text-[#0A0A0A]">{option}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#999] text-center py-12">Aucune option renseignée</p>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-fade-in">
              {vehicle.historique?.length > 0 ? (
                <div className="space-y-4">
                  {vehicle.historique.map((entry, index) => (
                    <div key={index} className="flex gap-6 bg-white p-6 border border-[#E5E5E5] shadow-sm border-l-4 border-l-[#FFD100]">
                      <div className="text-center min-w-[100px]">
                        <div className="text-xl font-bold text-[#0A0A0A]">{entry.date}</div>
                        <div className="text-sm text-[#999]">{entry.km}</div>
                      </div>
                      <div className="border-l border-[#E5E5E5] pl-6">
                        <p className="text-[#666]">{entry.interventions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#999] text-center py-12">Aucun historique disponible</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Contact Page
const Contact = () => {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      setFormData({ nom: '', email: '', telephone: '', message: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen" data-testid="contact-page">
      {/* Header with Background Image */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
            Hertz Pro
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
            Contactez<span className="border-b-4 border-[#FFD100]">-nous</span>
          </h1>
          <p className="text-[#555] mt-4 max-w-xl text-lg">
            Une question ? Besoin d'informations sur un véhicule ? Notre équipe est à votre disposition.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 border border-[#E5E5E5] shadow-sm">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                  Nos Coordonnées
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                      <Phone className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-1">Téléphone</h4>
                      <a href="tel:+33600000000" className="text-[#666] hover:text-[#0A0A0A]">+33 6 00 00 00 00</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                      <Mail className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-1">Email</h4>
                      <a href="mailto:contact@hertz-pro.fr" className="text-[#666] hover:text-[#0A0A0A]">contact@hertz-pro.fr</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-1">Adresse</h4>
                      <p className="text-[#666]">123 Rue de la Vente<br />75000 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0A0A0A] p-8 text-white">
                <h4 className="font-bold uppercase tracking-wider mb-6">Horaires d'ouverture</h4>
                <div className="space-y-3 text-white/70">
                  <div className="flex justify-between"><span>Lundi - Vendredi</span><span className="text-[#FFD100] font-bold">9h - 19h</span></div>
                  <div className="flex justify-between"><span>Samedi</span><span className="text-[#FFD100] font-bold">10h - 18h</span></div>
                  <div className="flex justify-between"><span>Dimanche</span><span className="text-white/50">Fermé</span></div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 border border-[#E5E5E5] shadow-sm">
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-8 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <Check size={48} className="mx-auto text-[#10B981] mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-[#0A0A0A]">Message envoyé !</h3>
                  <p className="text-[#666]">Nous vous répondrons rapidement.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold uppercase tracking-wider px-6 py-3 hover:bg-[#0A0A0A] hover:text-white transition-colors">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" placeholder="Votre nom *" required value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} className="w-full px-4 py-4 bg-[#F5F5F5] border border-[#E5E5E5] text-[#0A0A0A] placeholder-[#999] focus:border-[#FFD100] focus:outline-none transition-colors" />
                  <input type="email" placeholder="Votre email *" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-4 bg-[#F5F5F5] border border-[#E5E5E5] text-[#0A0A0A] placeholder-[#999] focus:border-[#FFD100] focus:outline-none transition-colors" />
                  <input type="tel" placeholder="Votre téléphone *" required value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} className="w-full px-4 py-4 bg-[#F5F5F5] border border-[#E5E5E5] text-[#0A0A0A] placeholder-[#999] focus:border-[#FFD100] focus:outline-none transition-colors" />
                  <textarea placeholder="Votre message *" required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-4 bg-[#F5F5F5] border border-[#E5E5E5] text-[#0A0A0A] placeholder-[#999] focus:border-[#FFD100] focus:outline-none transition-colors resize-none" />
                  <button type="submit" className="w-full bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-8 py-4 hover:bg-[#FFD100] hover:text-black transition-colors" disabled={submitting}>
                    {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// CGV Page - Conditions Générales de Vente
const CGV = () => (
  <div data-testid="cgv-page">
    <section className="relative py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
          Informations Légales
        </div>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
          Conditions Générales <span className="text-[#FFD100]">de Vente</span>
        </h1>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 legal-content">
        <p className="text-[#666] mb-8">Dernière mise à jour : Janvier 2024</p>

        <h2>Article 1 - Objet</h2>
        <p>Les présentes conditions générales de vente régissent les relations contractuelles entre HERTZ-PRO et ses clients dans le cadre de la vente de véhicules d'occasion.</p>

        <h2>Article 2 - Prix</h2>
        <p>Les prix affichés sur notre site sont exprimés en euros TTC. Ils incluent la TVA applicable au jour de la commande. HERTZ-PRO se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix affiché le jour de la commande sera le seul applicable à l'acheteur.</p>
        <p>La remise de 20% affichée correspond à la différence entre le prix de vente public conseillé et notre prix de vente.</p>

        <h2>Article 3 - Caractéristiques des véhicules</h2>
        <p>Tous nos véhicules proviennent de la flotte HERTZ et bénéficient :</p>
        <ul>
          <li>D'un entretien régulier en concession officielle</li>
          <li>D'un carnet d'entretien à jour</li>
          <li>D'un contrôle technique de moins de 6 mois</li>
          <li>D'une garantie constructeur ou HERTZ-PRO de 12 mois minimum</li>
        </ul>

        <h2>Article 4 - Réservation et acompte</h2>
        <p>La réservation d'un véhicule est effective après versement d'un acompte de 10% du prix de vente. Cet acompte n'est remboursable qu'en cas d'annulation de la vente par HERTZ-PRO.</p>

        <h2>Article 5 - Livraison</h2>
        <p>La livraison du véhicule s'effectue dans nos locaux à Paris, sauf accord contraire. Une livraison à domicile peut être organisée moyennant des frais supplémentaires à définir selon la distance.</p>

        <h2>Article 6 - Garantie</h2>
        <p>Tous nos véhicules bénéficient d'une garantie minimale de 12 mois couvrant les organes mécaniques principaux. Cette garantie peut être étendue sur demande.</p>
        <h3>La garantie couvre :</h3>
        <ul>
          <li>Le moteur et ses composants</li>
          <li>La boîte de vitesses</li>
          <li>La direction</li>
          <li>Le système de freinage</li>
          <li>Les trains roulants</li>
        </ul>
        <h3>La garantie ne couvre pas :</h3>
        <ul>
          <li>Les pièces d'usure (pneumatiques, plaquettes, disques, etc.)</li>
          <li>L'entretien courant</li>
          <li>Les dommages causés par une mauvaise utilisation</li>
        </ul>

        <h2>Article 7 - Droit de rétractation</h2>
        <p>Conformément au Code de la consommation, l'acheteur dispose d'un délai de 14 jours pour exercer son droit de rétractation dans le cas d'un achat à distance, sans avoir à justifier de motifs ni à payer de pénalités.</p>

        <h2>Article 8 - Litiges</h2>
        <p>En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux de Paris seront seuls compétents.</p>

        <div className="mt-12 p-6 bg-[#F5F5F5] border-l-4 border-[#FFD100]">
          <p className="font-semibold text-[#0A0A0A]">Pour toute question concernant nos CGV :</p>
          <p className="text-[#666] mt-2">Email : contact@hertz-pro.fr | Tél : +33 6 00 00 00 00</p>
        </div>
      </div>
    </section>
  </div>
);

// Qui sommes-nous Page
const QuiSommesNous = () => (
  <div data-testid="qui-sommes-nous-page">
    <section className="relative py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
          Notre Société
        </div>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
          Qui <span className="text-[#FFD100]">sommes-nous</span> ?
        </h1>
        <p className="text-white/60 mt-4 max-w-xl text-lg">
          Découvrez Hertz France, votre partenaire pour l'achat de véhicules professionnels.
        </p>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Company Presentation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
            <span className="text-[#FFD100]">Hertz</span> France
          </h2>
          <p className="text-[#666] text-lg leading-relaxed mb-6">
            <strong className="text-[#0A0A0A]">HERTZ-PRO</strong> est la branche professionnelle de Hertz France, 
            spécialisée dans la vente de véhicules d'occasion issus de notre flotte de location.
          </p>
          <p className="text-[#666] text-lg leading-relaxed mb-6">
            Nous proposons aux professionnels une sélection de véhicules récents, rigoureusement entretenus 
            en concession officielle, avec un historique d'entretien complet et transparent.
          </p>
          <p className="text-[#666] text-lg leading-relaxed">
            Grâce à nos volumes de déstockage, nous offrons des remises allant jusqu'à <strong className="text-[#0A0A0A]">20%</strong> sur 
            le prix du marché, tout en garantissant la qualité et la fiabilité de chaque véhicule.
          </p>
        </div>

        {/* Company Info Card */}
        <div className="bg-[#F5F5F5] p-8 border-l-4 border-[#FFD100]">
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-8 text-[#0A0A0A]" style={{fontFamily: 'Oswald, sans-serif'}}>
            Informations de la société
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                <Award className="text-black" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-1">Raison sociale</h4>
                <p className="text-[#666]">Hertz France</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                <MapPin className="text-black" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-1">Siège social</h4>
                <p className="text-[#666]">
                  Bâtiment A1, Immeuble Diagonale Sud<br />
                  6 Avenue Gustave Eiffel<br />
                  78180 Montigny-le-Bretonneux
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                <FileText className="text-black" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-1">N° SIRET</h4>
                <p className="text-[#666]">377 839 667 01946</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                <Phone className="text-black" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-1">Téléphone</h4>
                <a href="tel:+33000000000" className="text-[#666] hover:text-[#0A0A0A]">00 00 00 00</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                <Mail className="text-black" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-[#0A0A0A] mb-1">Email</h4>
                <a href="mailto:contact@hertz-pro.fr" className="text-[#666] hover:text-[#0A0A0A]">contact@hertz-pro.fr</a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#666] mb-6">Une question ? Besoin d'un renseignement ?</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-8 py-4 hover:bg-[#FFD100] hover:text-black transition-colors">
            Nous Contacter <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

// FAQ Page
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "D'où proviennent vos véhicules ?",
      answer: "Tous nos véhicules proviennent directement de la flotte HERTZ. Ce sont des véhicules de location récents, rigoureusement entretenus en concession officielle tout au long de leur utilisation."
    },
    {
      question: "Quelle est la garantie offerte sur les véhicules ?",
      answer: "Chaque véhicule bénéficie d'une garantie minimale de 12 mois couvrant les organes mécaniques principaux (moteur, boîte de vitesses, direction, freinage, trains roulants). Des extensions de garantie sont disponibles sur demande."
    },
    {
      question: "Puis-je essayer un véhicule avant l'achat ?",
      answer: "Absolument ! Nous encourageons nos clients à essayer le véhicule avant tout engagement. Contactez-nous pour prendre rendez-vous et organiser un essai."
    },
    {
      question: "Comment fonctionne la remise de 20% ?",
      answer: "La remise de 20% correspond à la différence entre le prix de vente public conseillé (argus) et notre prix de vente. Cette remise est possible grâce à nos volumes de déstockage et à notre statut de vendeur professionnel."
    },
    {
      question: "Proposez-vous des solutions de financement ?",
      answer: "Oui, nous travaillons avec plusieurs partenaires financiers pour vous proposer des solutions de crédit adaptées à votre situation. N'hésitez pas à nous contacter pour une étude personnalisée."
    },
    {
      question: "La livraison est-elle possible ?",
      answer: "Oui, nous pouvons organiser la livraison de votre véhicule à domicile. Les frais de livraison dépendent de la distance et seront établis sur devis."
    },
    {
      question: "Les véhicules sont-ils révisés avant la vente ?",
      answer: "Oui, chaque véhicule subit une révision complète avant la mise en vente : vidange, filtres, niveaux, contrôle des freins, pneumatiques, etc. Un contrôle technique de moins de 6 mois est également fourni."
    },
    {
      question: "Puis-je reprendre mon ancien véhicule ?",
      answer: "Oui, nous proposons un service de reprise de votre ancien véhicule. Contactez-nous avec les détails de votre véhicule pour obtenir une estimation."
    }
  ];

  return (
    <div data-testid="faq-page">
      <section className="relative py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
            Aide & Support
          </div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
            Questions <span className="text-[#FFD100]">Fréquentes</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-xl text-lg">
            Retrouvez les réponses aux questions les plus courantes sur nos véhicules et services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-[#FFD100] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  />
                </div>
                {openIndex === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#0A0A0A] p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4" style={{fontFamily: 'Oswald, sans-serif'}}>
              Vous avez d'autres questions ?
            </h3>
            <p className="text-white/60 mb-6">Notre équipe est à votre disposition pour répondre à toutes vos interrogations.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#FFD100] text-black font-semibold uppercase tracking-wider px-6 py-3 hover:bg-white transition-colors">
              Nous Contacter <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Mentions Légales Page
const MentionsLegales = () => (
  <div data-testid="mentions-legales-page">
    <section className="relative py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6">
          Informations Légales
        </div>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
          Mentions <span className="text-[#FFD100]">Légales</span>
        </h1>
      </div>
    </section>

    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 legal-content">
        
        <h2>Éditeur du site</h2>
        <p><strong>HERTZ-PRO</strong><br />
        Société par actions simplifiée au capital de [Capital] euros<br />
        Siège social : 123 Rue de la Vente, 75000 Paris<br />
        RCS Paris [Numéro RCS]<br />
        N° TVA Intracommunautaire : FR [Numéro TVA]</p>
        
        <p><strong>Directeur de la publication :</strong> [Nom du Directeur]</p>
        
        <h2>Contact</h2>
        <p>Téléphone : +33 6 00 00 00 00<br />
        Email : contact@hertz-pro.fr</p>

        <h2>Hébergement</h2>
        <p>Ce site est hébergé par :<br />
        [Nom de l'hébergeur]<br />
        [Adresse de l'hébergeur]</p>

        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, sont la propriété exclusive de HERTZ-PRO ou de ses partenaires.</p>
        <p>Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite sans l'autorisation écrite préalable de HERTZ-PRO.</p>

        <h2>Protection des données personnelles</h2>
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.</p>
        <p>Pour exercer ces droits, vous pouvez nous contacter :</p>
        <ul>
          <li>Par email : contact@hertz-pro.fr</li>
          <li>Par courrier : HERTZ-PRO - Service RGPD, 123 Rue de la Vente, 75000 Paris</li>
        </ul>

        <h3>Données collectées</h3>
        <p>Les données personnelles collectées sur ce site sont :</p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
          <li>Données de navigation (cookies)</li>
        </ul>

        <h3>Finalités du traitement</h3>
        <p>Ces données sont collectées pour :</p>
        <ul>
          <li>Répondre à vos demandes de contact</li>
          <li>Vous informer sur nos véhicules et services</li>
          <li>Améliorer notre site et nos services</li>
        </ul>

        <h2>Cookies</h2>
        <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite. Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur.</p>

        <h2>Liens hypertextes</h2>
        <p>Ce site peut contenir des liens vers d'autres sites. HERTZ-PRO n'est pas responsable du contenu de ces sites externes.</p>

        <h2>Crédits</h2>
        <p>Conception et développement : HERTZ-PRO<br />
        Photographies : HERTZ-PRO / Unsplash</p>

        <div className="mt-12 p-6 bg-[#F5F5F5] border-l-4 border-[#FFD100]">
          <p className="font-semibold text-[#0A0A0A]">Pour toute question concernant ces mentions légales :</p>
          <p className="text-[#666] mt-2">Email : contact@hertz-pro.fr | Tél : +33 6 00 00 00 00</p>
        </div>
      </div>
    </section>
  </div>
);

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/vehicule/:id" element={<VehicleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
