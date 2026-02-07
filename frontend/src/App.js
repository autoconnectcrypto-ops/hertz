import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Phone, Mail, MapPin, Menu, X, ChevronLeft, ChevronRight, Check, Shield, Award, Clock, ArrowRight, Settings, FileText, Wrench } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component - Glassmorphism style
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
      data-testid="header"
    >
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
            <a href="tel:+33600000000" className="btn-primary text-sm">
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
          <nav className="md:hidden py-6 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-white/70 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
              <Link to="/catalogue" className="text-white/70 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>
                Catalogue
              </Link>
              <Link to="/contact" className="text-white/70 hover:text-[#FFD100] py-2" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
              <a href="tel:+33600000000" className="btn-primary text-center mt-4">
                Nous Appeler
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/10 py-16" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#FFD100] text-3xl font-bold" style={{fontFamily: 'Oswald, sans-serif'}}>HERTZ</span>
            <span className="text-white text-3xl font-bold" style={{fontFamily: 'Oswald, sans-serif'}}>PRO</span>
          </div>
          <p className="text-[#A1A1AA] leading-relaxed max-w-md">
            Spécialiste de la vente de véhicules d'occasion premium issus de notre flotte. 
            Qualité certifiée, historique transparent, prix compétitifs.
          </p>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Contact</h4>
          <div className="space-y-4 text-[#A1A1AA]">
            <p className="flex items-center gap-3">
              <Phone size={16} className="text-[#FFD100]" />
              +33 6 00 00 00 00
            </p>
            <p className="flex items-center gap-3">
              <Mail size={16} className="text-[#FFD100]" />
              contact@hertz-pro.fr
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={16} className="text-[#FFD100]" />
              Paris, France
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-6 text-sm">Horaires</h4>
          <div className="space-y-3 text-[#A1A1AA]">
            <p>Lun - Ven : 9h - 19h</p>
            <p>Samedi : 10h - 18h</p>
            <p className="text-[#EF4444]">Dimanche : Fermé</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-12 pt-8 text-center text-[#52525B] text-sm">
        © 2024 HERTZ-PRO. Tous droits réservés.
      </div>
    </div>
  </footer>
);

// Home Page - Premium Landing
const Home = () => {
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        await axios.post(`${API}/seed`);
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
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center" data-testid="hero-section">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1704476944927-aaef1fdec0ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBibGFjayUyMGNhciUyMHN0dWRpbyUyMGxpZ2h0aW5nJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTA0ODUyfDA&ixlib=rb-4.1.0&q=85"
            alt="Luxury Car"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32">
          <div className="max-w-3xl">
            <div className="inline-block bg-[#FFD100] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 mb-8 animate-fade-in-up">
              Destockage Exclusif
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-8 animate-fade-in-up animation-delay-100" style={{fontFamily: 'Oswald, sans-serif'}}>
              Flotte Premium<br />
              <span className="text-[#FFD100]">Prix Exceptionnels</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
              Accédez à des véhicules haut de gamme issus de notre flotte Hertz. 
              <strong className="text-white"> Entretiens à jour en concession</strong>, 
              historique transparent, jusqu'à <strong className="text-[#FFD100]">-20% de remise</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <Link to="/catalogue" className="btn-primary inline-flex items-center justify-center gap-3" data-testid="cta-catalogue">
                Découvrir le Catalogue
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center">
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#FFD100] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0A0A0A] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="stat-number">{vehicleCount}+</div>
              <div className="stat-label">Véhicules</div>
            </div>
            <div className="text-center">
              <div className="stat-number">-20%</div>
              <div className="stat-label">De Remise</div>
            </div>
            <div className="text-center">
              <div className="stat-number">100%</div>
              <div className="stat-label">Révisés</div>
            </div>
            <div className="text-center">
              <div className="stat-number">12</div>
              <div className="stat-label">Mois Garantie</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6" style={{fontFamily: 'Oswald, sans-serif'}}>
              Pourquoi <span className="text-[#FFD100]">Hertz Pro</span> ?
            </h2>
            <p className="text-[#A1A1AA] max-w-2xl mx-auto text-lg">
              Des véhicules premium à prix destockage, avec la garantie de qualité Hertz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card group">
              <div className="w-14 h-14 bg-[#FFD100]/10 flex items-center justify-center mb-6 group-hover:bg-[#FFD100]/20 transition-colors">
                <Shield className="text-[#FFD100]" size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4" style={{fontFamily: 'Oswald, sans-serif'}}>
                Qualité Certifiée
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Chaque véhicule est inspecté selon 150 points de contrôle avant mise en vente. 
                Historique d'entretien complet et transparent.
              </p>
            </div>

            <div className="feature-card group">
              <div className="w-14 h-14 bg-[#FFD100]/10 flex items-center justify-center mb-6 group-hover:bg-[#FFD100]/20 transition-colors">
                <Award className="text-[#FFD100]" size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4" style={{fontFamily: 'Oswald, sans-serif'}}>
                Prix Destockage
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Jusqu'à 20% de remise sur le prix du marché. Des véhicules récents 
                à des tarifs imbattables grâce à notre volume de flotte.
              </p>
            </div>

            <div className="feature-card group">
              <div className="w-14 h-14 bg-[#FFD100]/10 flex items-center justify-center mb-6 group-hover:bg-[#FFD100]/20 transition-colors">
                <Clock className="text-[#FFD100]" size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4" style={{fontFamily: 'Oswald, sans-serif'}}>
                Entretien Pro
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Tous nos véhicules sont entretenus exclusivement en concession officielle. 
                Carnet d'entretien à jour, aucune mauvaise surprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-[#111111]" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8" style={{fontFamily: 'Oswald, sans-serif'}}>
            Prêt à trouver votre <span className="text-[#FFD100]">véhicule</span> ?
          </h2>
          <p className="text-[#A1A1AA] max-w-2xl mx-auto mb-10 text-lg">
            Parcourez notre catalogue de {vehicleCount} véhicules disponibles immédiatement. 
            Essai et livraison possibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogue" className="btn-primary inline-flex items-center justify-center gap-3">
              Voir le Catalogue
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+33600000000" className="btn-secondary inline-flex items-center justify-center gap-3">
              <Phone size={18} />
              Appeler Maintenant
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
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white" style={{fontFamily: 'Oswald, sans-serif'}}>
                {vehicle.marque} <span className="text-[#FFD100]">{vehicle.modele}</span>
              </h3>
            </div>
            {vehicle.reference && (
              <span className="text-xs font-bold text-[#A1A1AA] uppercase">
                {vehicle.reference}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-[#52525B] mb-4">
            <span>{vehicle.annee}</span>
            <span className="w-1 h-1 bg-[#52525B] rounded-full"></span>
            <span>{vehicle.km?.toLocaleString('fr-FR')} km</span>
            <span className="w-1 h-1 bg-[#52525B] rounded-full"></span>
            <span>{vehicle.specs?.carburant}</span>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-white/10">
            <div>
              {vehicle.prix_original && (
                <span className="price-original text-sm mr-3">
                  {vehicle.prix_original.toLocaleString('fr-FR')} €
                </span>
              )}
              <span className="price-tag text-2xl">
                {vehicle.prix?.toLocaleString('fr-FR')} €
              </span>
            </div>
            <span className="text-[#FFD100] group-hover:translate-x-1 transition-transform">
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
        await axios.post(`${API}/seed`);
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
    <div className="pt-20 min-h-screen relative" data-testid="catalogue-page">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1704476944927-aaef1fdec0ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBibGFjayUyMGNhciUyMHN0dWRpbyUyMGxpZ2h0aW5nJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNTA0ODUyfDA&ixlib=rb-4.1.0&q=85"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6" style={{fontFamily: 'Oswald, sans-serif'}}>
              Notre <span className="text-[#FFD100]">Catalogue</span>
            </h1>
            <p className="text-[#A1A1AA] max-w-2xl text-lg">
              {vehicles.length} véhicules premium disponibles immédiatement. 
              Tous entretenus en concession avec historique complet.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 md:py-24">
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
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Véhicule non trouvé</h2>
          <button onClick={() => navigate('/catalogue')} className="btn-primary">
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
    <div className="pt-20 bg-[#0A0A0A] min-h-screen" data-testid="vehicle-detail-page">
      {/* Back navigation */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <button 
            onClick={() => navigate('/catalogue')} 
            className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#FFD100] transition-colors"
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
            <div className="relative aspect-[16/10] bg-[#111]">
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
                {vehicle.images.slice(0, 10).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`gallery-thumb aspect-square ${index === activeImage ? 'active' : ''}`}
                  >
                    <img src={img.url} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="space-y-8">
            <div>
              {vehicle.reference && (
                <span className="text-[#A1A1AA] text-sm font-bold uppercase tracking-wider">
                  {vehicle.reference}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2" style={{fontFamily: 'Oswald, sans-serif'}}>
                {vehicle.marque} <span className="text-[#FFD100]">{vehicle.modele}</span>
              </h1>
              <div className="flex items-center gap-3 mt-4 text-[#A1A1AA]">
                <span>{vehicle.annee}</span>
                <span className="w-1 h-1 bg-[#52525B] rounded-full"></span>
                <span>{vehicle.km?.toLocaleString('fr-FR')} km</span>
                <span className="w-1 h-1 bg-[#52525B] rounded-full"></span>
                <span>{vehicle.couleur}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#111] p-8 border-l-4 border-[#FFD100]">
              <div className="flex items-end gap-4">
                <span className="price-tag text-5xl">{vehicle.prix?.toLocaleString('fr-FR')} €</span>
                {vehicle.prix_original && (
                  <span className="price-original text-xl">{vehicle.prix_original.toLocaleString('fr-FR')} €</span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-[#10B981] font-bold mt-3">
                  Économisez {(vehicle.prix_original - vehicle.prix).toLocaleString('fr-FR')} € (-{discount}%)
                </p>
              )}
            </div>

            {/* Description */}
            {vehicle.description && (
              <p className="text-[#A1A1AA] leading-relaxed">{vehicle.description}</p>
            )}

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111] p-4 border border-[#222]">
                <span className="text-[#52525B] text-sm">Carburant</span>
                <p className="text-white font-semibold">{vehicle.specs?.carburant}</p>
              </div>
              <div className="bg-[#111] p-4 border border-[#222]">
                <span className="text-[#52525B] text-sm">Boîte</span>
                <p className="text-white font-semibold">{vehicle.specs?.boite}</p>
              </div>
              <div className="bg-[#111] p-4 border border-[#222]">
                <span className="text-[#52525B] text-sm">Puissance</span>
                <p className="text-white font-semibold">{vehicle.specs?.puissance}</p>
              </div>
              <div className="bg-[#111] p-4 border border-[#222]">
                <span className="text-[#52525B] text-sm">Puissance fiscale</span>
                <p className="text-white font-semibold">{vehicle.specs?.puissance_fiscale}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+33600000000" className="btn-primary flex-1 text-center">
                <Phone size={18} className="inline mr-2" />
                Appeler
              </a>
              <Link to="/contact" className="btn-secondary flex-1 text-center">
                <Mail size={18} className="inline mr-2" />
                Nous écrire
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="flex gap-2 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`tab-button ${activeTab === 'specs' ? 'active' : ''}`}
            >
              <Settings size={16} className="inline mr-2" />
              Caractéristiques
            </button>
            <button
              onClick={() => setActiveTab('options')}
              className={`tab-button ${activeTab === 'options' ? 'active' : ''}`}
            >
              <FileText size={16} className="inline mr-2" />
              Équipements ({vehicle.options?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            >
              <Wrench size={16} className="inline mr-2" />
              Entretien ({vehicle.historique?.length || 0})
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              <div className="bg-[#111] p-6 border border-[#222]">
                <h4 className="text-[#FFD100] font-bold uppercase tracking-wider mb-6">Motorisation</h4>
                <div className="space-y-4">
                  <div className="specs-row"><span className="specs-label">Carburant</span><span className="specs-value">{vehicle.specs?.carburant || '-'}</span></div>
                  <div className="specs-row"><span className="specs-label">Boîte</span><span className="specs-value">{vehicle.specs?.boite || '-'}</span></div>
                  <div className="specs-row"><span className="specs-label">Puissance</span><span className="specs-value">{vehicle.specs?.puissance || '-'}</span></div>
                  <div className="specs-row"><span className="specs-label">Cylindrée</span><span className="specs-value">{vehicle.specs?.cylindree || '-'}</span></div>
                </div>
              </div>
              <div className="bg-[#111] p-6 border border-[#222]">
                <h4 className="text-[#FFD100] font-bold uppercase tracking-wider mb-6">Général</h4>
                <div className="space-y-4">
                  <div className="specs-row"><span className="specs-label">Année</span><span className="specs-value">{vehicle.annee}</span></div>
                  <div className="specs-row"><span className="specs-label">Kilométrage</span><span className="specs-value">{vehicle.km?.toLocaleString('fr-FR')} km</span></div>
                  <div className="specs-row"><span className="specs-label">Couleur</span><span className="specs-value">{vehicle.couleur}</span></div>
                  <div className="specs-row"><span className="specs-label">Portes</span><span className="specs-value">{vehicle.specs?.portes || 5}</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'options' && (
            <div className="animate-fade-in">
              {vehicle.options?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicle.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3 bg-[#111] p-4 border border-[#222]">
                      <Check size={16} className="text-[#FFD100] flex-shrink-0" />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#52525B] text-center py-12">Aucune option renseignée</p>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-fade-in">
              {vehicle.historique?.length > 0 ? (
                <div className="space-y-4">
                  {vehicle.historique.map((entry, index) => (
                    <div key={index} className="flex gap-6 bg-[#111] p-6 border border-[#222] border-l-4 border-l-[#FFD100]">
                      <div className="text-center min-w-[100px]">
                        <div className="text-xl font-bold text-white">{entry.date}</div>
                        <div className="text-sm text-[#52525B]">{entry.km}</div>
                      </div>
                      <div className="border-l border-[#333] pl-6">
                        <p className="text-[#A1A1AA]">{entry.interventions}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#52525B] text-center py-12">Aucun historique disponible</p>
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
    <div className="pt-20 bg-[#0A0A0A] min-h-screen" data-testid="contact-page">
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight" style={{fontFamily: 'Oswald, sans-serif'}}>
            Contactez<span className="text-[#FFD100]">-nous</span>
          </h1>
          <p className="text-[#A1A1AA] mt-4 max-w-xl text-lg">
            Une question ? Besoin d'informations sur un véhicule ? Notre équipe est à votre disposition.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8" style={{fontFamily: 'Oswald, sans-serif'}}>
                  Nos Coordonnées
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                      <Phone className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Téléphone</h4>
                      <a href="tel:+33600000000" className="text-[#A1A1AA] hover:text-[#FFD100]">+33 6 00 00 00 00</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                      <Mail className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Email</h4>
                      <a href="mailto:contact@hertz-pro.fr" className="text-[#A1A1AA] hover:text-[#FFD100]">contact@hertz-pro.fr</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FFD100] flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-black" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Adresse</h4>
                      <p className="text-[#A1A1AA]">123 Rue de la Vente<br />75000 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] p-8 border border-[#222]">
                <h4 className="font-bold uppercase tracking-wider mb-6">Horaires d'ouverture</h4>
                <div className="space-y-3 text-[#A1A1AA]">
                  <div className="flex justify-between"><span>Lundi - Vendredi</span><span className="text-white">9h - 19h</span></div>
                  <div className="flex justify-between"><span>Samedi</span><span className="text-white">10h - 18h</span></div>
                  <div className="flex justify-between"><span>Dimanche</span><span className="text-[#EF4444]">Fermé</span></div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#111] p-8 md:p-12 border border-[#222]">
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-8" style={{fontFamily: 'Oswald, sans-serif'}}>
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <Check size={48} className="mx-auto text-[#10B981] mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                  <p className="text-[#A1A1AA]">Nous vous répondrons rapidement.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Votre nom *"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Votre email *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Votre téléphone *"
                    required
                    value={formData.telephone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                    className="form-input"
                  />
                  <textarea
                    placeholder="Votre message *"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="form-input resize-none"
                  />
                  <button type="submit" className="btn-primary w-full" disabled={submitting}>
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
    <div className="min-h-screen bg-[#0A0A0A]">
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
