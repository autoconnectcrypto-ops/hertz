import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Phone, Mail, MapPin, Menu, X, ChevronLeft, ChevronRight, Check, Shield, Award, Clock, ArrowRight, Settings, FileText, Wrench } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
            <Link to="/contact" className="nav-link">Contact</Link>
            <a href="tel:+33600000000" className="bg-[#FFD100] text-black font-semibold uppercase tracking-wider text-sm px-6 py-3 hover:bg-white transition-colors">
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
              <Link to="/contact" className="text-white/80 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
              <a href="tel:+33600000000" className="bg-[#FFD100] text-black font-semibold text-center py-3 mt-4">Nous Appeler</a>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
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
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Contact</h4>
          <div className="space-y-4 text-white/60">
            <p className="flex items-center gap-3"><Phone size={16} className="text-[#FFD100]" /> +33 6 00 00 00 00</p>
            <p className="flex items-center gap-3"><Mail size={16} className="text-[#FFD100]" /> contact@hertz-pro.fr</p>
            <p className="flex items-center gap-3"><MapPin size={16} className="text-[#FFD100]" /> Paris, France</p>
          </div>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Horaires</h4>
          <div className="space-y-3 text-white/60">
            <p>Lun - Ven : 9h - 19h</p>
            <p>Samedi : 10h - 18h</p>
            <p className="text-red-400">Dimanche : Fermé</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
        © 2024 HERTZ-PRO. Tous droits réservés.
      </div>
    </div>
  </footer>
);

// Home Page
const Home = () => {
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get(`${API}/vehicles`);
        setVehicleCount(response.data.length);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCount();
  }, []);

  return (
    <div data-testid="home-page">
      {/* Hero Section - Light Theme with Background */}
      <section className="relative min-h-[90vh] flex items-center bg-white" data-testid="hero-section">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1920&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
          <div className="max-w-3xl">
            <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-8 animate-fade-in-up">
              Véhicules de Flotte
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none mb-8 text-[#0A0A0A] animate-fade-in-up animation-delay-100" style={{fontFamily: 'Oswald, sans-serif'}}>
              Hertz Pro<br />
              <span className="text-[#0A0A0A] border-b-4 border-[#FFD100]">Jusqu'à -20%</span>
            </h1>
            
            <p className="text-lg text-[#444] mb-6 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
              Accédez à une sélection de véhicules issus de la flotte Hertz Pro, <strong className="text-[#0A0A0A]">récents et rigoureusement entretenus</strong>.
            </p>
            
            <p className="text-lg text-[#444] mb-6 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
              Bénéficiez de remises allant jusqu'à <strong className="text-[#0A0A0A] bg-[#FFD100] px-1">20%</strong>, d'un suivi d'entretien complet et de véhicules contrôlés selon les standards Hertz.
            </p>
            
            <p className="text-lg text-[#444] mb-6 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
              <strong className="text-[#0A0A0A]">Berlines, SUV, utilitaires</strong> : une gamme adaptée aux besoins des professionnels, alliant fiabilité, maîtrise des coûts et disponibilité immédiate.
            </p>
            
            <p className="text-lg text-[#444] mb-10 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
              Avec <strong className="text-[#0A0A0A]">Hertz Pro</strong>, choisissez une solution automobile simple, transparente et performante.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Link to="/catalogue" className="bg-[#0A0A0A] text-white font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center gap-3 hover:bg-[#FFD100] hover:text-black transition-colors" data-testid="cta-catalogue">
                Découvrir le Catalogue
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="border-2 border-[#0A0A0A] text-[#0A0A0A] font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-colors">
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#FFD100] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>{vehicleCount}+</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">Véhicules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>-20%</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">De Remise</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>100%</div>
              <div className="text-black/70 uppercase tracking-wider text-sm mt-2">Révisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>12</div>
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
            <div className="feature-card group text-center">
              <div className="w-16 h-16 bg-[#FFD100] flex items-center justify-center mx-auto mb-6">
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

            <div className="feature-card group text-center">
              <div className="w-16 h-16 bg-[#FFD100] flex items-center justify-center mx-auto mb-6">
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

            <div className="feature-card group text-center">
              <div className="w-16 h-16 bg-[#FFD100] flex items-center justify-center mx-auto mb-6">
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

      {/* CTA Section */}
      <section className="py-24 bg-[#0A0A0A]" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
            Prêt à trouver votre <span className="text-[#FFD100]">véhicule</span> ?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">
            Parcourez notre catalogue de {vehicleCount} véhicules disponibles. 
            Essai et livraison possibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogue" className="bg-[#FFD100] text-black font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center gap-3 hover:bg-white transition-colors">
              Voir le Catalogue
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+33600000000" className="border-2 border-white text-white font-semibold uppercase tracking-wider px-8 py-4 inline-flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors">
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
              <span className="text-lg text-[#0A0A0A] line-through">
                {vehicle.prix?.toLocaleString('fr-FR')} €
              </span>
              <span className="text-lg font-bold text-[#0A0A0A] border-b-4 border-[#FFD100]">
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
            <div className="relative aspect-[16/10] bg-[#1A1A1A] border border-[#333]">
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
                    className={`gallery-thumb aspect-square border-2 ${index === activeImage ? 'border-[#FFD100] opacity-100' : 'border-[#333] opacity-60 hover:opacity-100'}`}
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
            <div className="bg-[#1A1A1A] border border-[#333] p-6">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
                {vehicle.marque} {vehicle.specs?.modele_court || vehicle.modele?.split(' ')[0]}
              </h1>
              <p className="text-white/60 text-sm mt-2">{vehicle.modele}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-[#FFD100] text-black text-xs font-bold px-3 py-1 uppercase">Première main</span>
                <span className="bg-[#FFD100] text-[#0A0A0A] text-xs font-bold px-3 py-1 uppercase">-20%</span>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#1A1A1A] border border-[#333]">
              <div className="bg-[#252525] px-6 py-3 border-b border-[#333]">
                <h3 className="font-bold text-white uppercase text-sm tracking-wider">Informations</h3>
              </div>
              <div className="divide-y divide-[#333]">
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Localisation</span>
                  <span className="text-white font-semibold">Paris</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">1ère immatriculation</span>
                  <span className="text-white font-semibold">{vehicle.specs?.date_immat || '-'}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Kilométrage</span>
                  <span className="text-white font-semibold">{vehicle.km?.toLocaleString('fr-FR')} km</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Numéro d'offre</span>
                  <span className="text-white font-semibold">{vehicle.reference}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Carburant</span>
                  <span className="text-white font-semibold">{vehicle.specs?.carburant}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Puissance</span>
                  <span className="text-white font-semibold">{vehicle.specs?.puissance}</span>
                </div>
                <div className="px-6 py-3 flex justify-between items-center">
                  <span className="text-white/60 text-sm">Transmission</span>
                  <span className="text-white font-semibold">{vehicle.specs?.boite}</span>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-[#FFD100] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-black/60 text-sm">Prix du marché</span>
                <span className="text-xl text-black/50 line-through">{vehicle.prix?.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-black/20">
                <span className="text-black font-bold">Votre prix HERTZ-PRO</span>
                <span className="text-3xl font-bold text-black" style={{fontFamily: 'Oswald, sans-serif'}}>
                  {Math.round(vehicle.prix * 0.8).toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-black">
                <Check size={18} />
                <span className="font-semibold">Économisez {Math.round(vehicle.prix * 0.2).toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+33600000000" className="bg-[#FFD100] text-black font-semibold uppercase tracking-wider px-6 py-4 flex-1 text-center hover:bg-white transition-colors">
                <Phone size={18} className="inline mr-2" />
                Appeler
              </a>
              <Link to="/contact" className="border-2 border-white text-white font-semibold uppercase tracking-wider px-6 py-4 flex-1 text-center hover:bg-white hover:text-black transition-colors">
                <Mail size={18} className="inline mr-2" />
                Nous écrire
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 pt-16 border-t border-[#333]">
          <div className="flex gap-2 mb-8 overflow-x-auto border-b border-[#333]">
            <button onClick={() => setActiveTab('specs')} className={`px-6 py-3 font-semibold uppercase text-sm tracking-wider transition-colors ${activeTab === 'specs' ? 'text-[#FFD100] border-b-2 border-[#FFD100]' : 'text-white/60 hover:text-white'}`}>
              <Settings size={16} className="inline mr-2" />Caractéristiques
            </button>
            <button onClick={() => setActiveTab('options')} className={`px-6 py-3 font-semibold uppercase text-sm tracking-wider transition-colors ${activeTab === 'options' ? 'text-[#FFD100] border-b-2 border-[#FFD100]' : 'text-white/60 hover:text-white'}`}>
              <FileText size={16} className="inline mr-2" />Équipements ({vehicle.options?.length || 0})
            </button>
            <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-semibold uppercase text-sm tracking-wider transition-colors ${activeTab === 'history' ? 'text-[#FFD100] border-b-2 border-[#FFD100]' : 'text-white/60 hover:text-white'}`}>
              <Wrench size={16} className="inline mr-2" />Entretien ({vehicle.historique?.length || 0})
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="animate-fade-in">
              <div className="bg-[#1A1A1A] border border-[#333]">
                <h4 className="text-white font-bold uppercase tracking-wider p-6 border-b border-[#333]" style={{fontFamily: 'Oswald, sans-serif'}}>
                  Données techniques
                </h4>
                <div className="divide-y divide-[#333]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Numéro VIN</span>
                      <span className="text-white font-medium">{vehicle.specs?.vin || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Nombre de propriétaires précédents</span>
                      <span className="text-white font-medium">{vehicle.specs?.proprietaires || '-'}</span>
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Fabricant</span>
                      <span className="text-white font-medium">{vehicle.marque || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Modèle</span>
                      <span className="text-white font-medium">{vehicle.specs?.modele_court || vehicle.modele || '-'}</span>
                    </div>
                  </div>
                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Type de véhicule</span>
                      <span className="text-white font-medium">{vehicle.specs?.type_vehicule || 'Voitures d\'occasion'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Forme de construction</span>
                      <span className="text-white font-medium">{vehicle.specs?.categorie || '-'}</span>
                    </div>
                  </div>
                  {/* Row 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Date de première immatriculation</span>
                      <span className="text-white font-medium">{vehicle.specs?.date_immat || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Kilométrage</span>
                      <span className="text-white font-medium">{vehicle.km?.toLocaleString('fr-FR')} KM</span>
                    </div>
                  </div>
                  {/* Row 5 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Transmission</span>
                      <span className="text-white font-medium">{vehicle.specs?.boite || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Carburant</span>
                      <span className="text-white font-medium">{vehicle.specs?.carburant || '-'}</span>
                    </div>
                  </div>
                  {/* Row 6 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Performance</span>
                      <span className="text-white font-medium">{vehicle.specs?.puissance || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Cylindrée</span>
                      <span className="text-white font-medium">{vehicle.specs?.cylindree || '-'}</span>
                    </div>
                  </div>
                  {/* Row 7 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Portes</span>
                      <span className="text-white font-medium">{vehicle.specs?.portes || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Sièges</span>
                      <span className="text-white font-medium">{vehicle.specs?.sieges || '-'}</span>
                    </div>
                  </div>
                  {/* Row 8 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Couleur extérieur</span>
                      <span className="text-white font-medium">{vehicle.couleur || '-'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Couleur intérieure</span>
                      <span className="text-white font-medium">{vehicle.specs?.couleur_interieur || '-'}</span>
                    </div>
                  </div>
                  {/* Row 9 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#333]">
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Disponible à partir de</span>
                      <span className="text-white font-medium">{vehicle.specs?.disponibilite || 'Immédiatement'}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-white/60 text-sm">Pays d'origine</span>
                      <span className="text-white font-medium">{vehicle.specs?.pays_origine || 'France'}</span>
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
                    <div key={index} className="flex items-center gap-3 bg-[#1A1A1A] p-4 border border-[#333]">
                      <Check size={16} className="text-[#FFD100] flex-shrink-0" />
                      <span className="text-sm text-white">{option}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-center py-12">Aucune option renseignée</p>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-fade-in">
              {vehicle.historique?.length > 0 ? (
                <div className="space-y-4">
                  {vehicle.historique.map((entry, index) => (
                    <div key={index} className="flex gap-6 bg-[#1A1A1A] p-6 border border-[#333] border-l-4 border-l-[#FFD100]">
                      <div className="text-center min-w-[100px]">
                        <div className="text-xl font-bold text-white">{entry.date}</div>
                        <div className="text-sm text-white/50">{entry.km}</div>
                      </div>
                      <div className="border-l border-[#333] pl-6">
                        <p className="text-white/70">{entry.interventions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-center py-12">Aucun historique disponible</p>
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
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
