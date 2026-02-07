import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Phone, Mail, MapPin, Menu, X, ChevronLeft, ChevronRight, Check, Car, Shield, Clock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="hertz-header" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="hertz-logo text-2xl md:text-3xl" data-testid="logo">
            HERTZ<span className="text-white">-PRO</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-[#FFD100] transition-colors font-medium" data-testid="nav-home">
              Accueil
            </Link>
            <Link to="/contact" className="text-white hover:text-[#FFD100] transition-colors font-medium" data-testid="nav-contact">
              Contact
            </Link>
            <a href="tel:+33600000000" className="btn-hertz-primary" data-testid="nav-phone">
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
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-white hover:text-[#FFD100] transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-[#FFD100] transition-colors font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <a href="tel:+33600000000" className="btn-hertz-primary text-center mt-2">
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
  <footer className="hertz-footer py-12" data-testid="footer">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="hertz-logo text-2xl mb-4">HERTZ<span className="text-white">-PRO</span></h3>
          <p className="text-gray-400 leading-relaxed">
            Vente de véhicules d'occasion issus de la flotte Hertz. 
            Qualité professionnelle, prix destockage.
          </p>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-[#FFD100]" />
              +33 6 00 00 00 00
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-[#FFD100]" />
              contact@hertz-pro.fr
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-[#FFD100]" />
              Paris, France
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-[#FFD100] font-semibold uppercase tracking-wider mb-4">Horaires</h4>
          <div className="space-y-2 text-gray-400">
            <p>Lun - Ven : 9h - 19h</p>
            <p>Samedi : 10h - 18h</p>
            <p>Dimanche : Fermé</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
        © 2024 HERTZ-PRO. Tous droits réservés.
      </div>
    </div>
  </footer>
);

// Vehicle Card Component
const VehicleCard = ({ vehicle }) => {
  const discount = vehicle.prix_original 
    ? Math.round((1 - vehicle.prix / vehicle.prix_original) * 100) 
    : 20;

  return (
    <Link to={`/vehicule/${vehicle.id}`} className="block" data-testid={`vehicle-card-${vehicle.id}`}>
      <div className="vehicle-card">
        <div className="relative image-zoom aspect-[16/10]">
          {discount > 0 && (
            <span className="discount-badge" data-testid="discount-badge">-{discount}%</span>
          )}
          <img 
            src={vehicle.images[0]?.url || 'https://via.placeholder.com/400x250'} 
            alt={`${vehicle.marque} ${vehicle.modele}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                {vehicle.marque}
              </h3>
              <p className="text-gray-600 font-medium">{vehicle.modele}</p>
            </div>
            <span className="bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {vehicle.specs?.categorie || 'AUTO'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>{vehicle.annee}</span>
            <span>•</span>
            <span>{vehicle.km?.toLocaleString('fr-FR')} km</span>
            <span>•</span>
            <span>{vehicle.specs?.carburant}</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              {vehicle.prix_original && (
                <span className="price-original text-sm mr-2">
                  {vehicle.prix_original.toLocaleString('fr-FR')} €
                </span>
              )}
              <span className="price-current text-2xl md:text-3xl">
                {vehicle.prix?.toLocaleString('fr-FR')} €
              </span>
            </div>
            <span className="btn-hertz-primary text-sm py-2 px-4">
              Voir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Home Page
const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Seed data first
        await axios.post(`${API}/seed`);
        // Then fetch vehicles
        const response = await axios.get(`${API}/vehicles`);
        setVehicles(response.data);
      } catch (e) {
        console.error('Error fetching vehicles:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="hertz-hero min-h-[60vh] md:min-h-[70vh] flex items-center" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#E11D48] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 animate-fade-in-up">
              Destockage Flotte Hertz
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white uppercase tracking-tighter leading-none mb-6 animate-fade-in-up animation-delay-100">
              Véhicules de qualité<br />
              <span className="text-[#FFD100]">Prix Exceptionnels</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl animate-fade-in-up animation-delay-200">
              Profitez de notre destockage : véhicules issus de notre flotte Hertz, 
              entretenus en concession, à <strong className="text-[#FFD100]">-20%</strong> et plus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <a href="#catalogue" className="btn-hertz-primary text-center" data-testid="cta-catalogue">
                Voir le Catalogue
              </a>
              <Link to="/contact" className="btn-hertz-secondary bg-white text-center">
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="yellow-section py-8" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-black p-3">
                <Shield className="text-[#FFD100]" size={28} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wide">Qualité Garantie</h4>
                <p className="text-sm text-gray-700">Véhicules inspectés et certifiés</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black p-3">
                <Car className="text-[#FFD100]" size={28} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wide">Flotte Hertz</h4>
                <p className="text-sm text-gray-700">Entretien professionnel en concession</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-black p-3">
                <Clock className="text-[#FFD100]" size={28} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wide">Historique Complet</h4>
                <p className="text-sm text-gray-700">Carnet d'entretien transparent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section id="catalogue" className="py-16 md:py-24 bg-gray-50" data-testid="catalogue-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">
              Nos Véhicules <span className="text-[#FFD100]">Disponibles</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Découvrez notre sélection de véhicules d'occasion issus de la flotte Hertz. 
              Tous nos véhicules bénéficient d'un entretien rigoureux et d'un historique transparent.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-[#FFD100] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des véhicules...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-200">
              <Car size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun véhicule disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="vehicles-grid">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16 md:py-24" data-testid="cta-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-6">
            Intéressé par un <span className="text-[#FFD100]">véhicule</span> ?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Contactez-nous pour plus d'informations, organiser un essai ou finaliser votre achat.
            Notre équipe est à votre disposition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+33600000000" className="btn-hertz-primary">
              <Phone size={18} className="inline mr-2" />
              Appeler Maintenant
            </a>
            <Link to="/contact" className="btn-hertz-secondary text-white border-white hover:bg-white hover:text-black">
              Envoyer un Message
            </Link>
          </div>
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

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${API}/vehicles/${id}`);
        setVehicle(response.data);
      } catch (e) {
        console.error('Error fetching vehicle:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#FFD100] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Véhicule non trouvé</h2>
          <button onClick={() => navigate('/')} className="btn-hertz-primary">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const discount = vehicle.prix_original 
    ? Math.round((1 - vehicle.prix / vehicle.prix_original) * 100) 
    : 20;

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  return (
    <div data-testid="vehicle-detail-page">
      {/* Back Button */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            data-testid="back-button"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Retour au catalogue</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-4" data-testid="vehicle-gallery">
            {/* Main Image */}
            <div className="relative aspect-[16/10] bg-gray-100">
              {discount > 0 && (
                <span className="discount-badge">-{discount}%</span>
              )}
              <img 
                src={vehicle.images[activeImage]?.url || 'https://via.placeholder.com/800x500'} 
                alt={`${vehicle.marque} ${vehicle.modele}`}
                className="w-full h-full object-cover"
                data-testid="main-image"
              />
              
              {/* Navigation Arrows */}
              {vehicle.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 transition-colors"
                    data-testid="prev-image-btn"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 transition-colors"
                    data-testid="next-image-btn"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2" data-testid="thumbnails">
                {vehicle.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`gallery-thumb aspect-square ${index === activeImage ? 'active' : ''}`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img 
                      src={img.url} 
                      alt={img.alt || `Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="space-y-6" data-testid="vehicle-info">
            {/* Title & Price */}
            <div>
              <span className="bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {vehicle.specs?.categorie || 'AUTO'}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mt-3">
                {vehicle.marque} <span className="text-[#FFD100]">{vehicle.modele}</span>
              </h1>
              <div className="flex items-center gap-4 mt-4 text-gray-600">
                <span>{vehicle.annee}</span>
                <span>•</span>
                <span>{vehicle.km?.toLocaleString('fr-FR')} km</span>
                <span>•</span>
                <span>{vehicle.couleur}</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-6 border-l-4 border-[#FFD100]">
              <div className="flex items-end gap-4">
                <span className="price-current text-4xl md:text-5xl" data-testid="vehicle-price">
                  {vehicle.prix?.toLocaleString('fr-FR')} €
                </span>
                {vehicle.prix_original && (
                  <span className="price-original text-xl">
                    {vehicle.prix_original.toLocaleString('fr-FR')} €
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-[#E11D48] font-bold mt-2">
                  Économisez {(vehicle.prix_original - vehicle.prix).toLocaleString('fr-FR')} € (-{discount}%)
                </p>
              )}
            </div>

            {/* Description */}
            {vehicle.description && (
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* Specs */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-3">Caractéristiques</h3>
              <table className="specs-table w-full">
                <tbody>
                  <tr>
                    <td>Carburant</td>
                    <td>{vehicle.specs?.carburant}</td>
                  </tr>
                  <tr>
                    <td>Boîte de vitesse</td>
                    <td>{vehicle.specs?.boite}</td>
                  </tr>
                  <tr>
                    <td>Puissance</td>
                    <td>{vehicle.specs?.puissance}</td>
                  </tr>
                  <tr>
                    <td>Puissance fiscale</td>
                    <td>{vehicle.specs?.puissance_fiscale}</td>
                  </tr>
                  <tr>
                    <td>Cylindrée</td>
                    <td>{vehicle.specs?.cylindree}</td>
                  </tr>
                  <tr>
                    <td>Nombre de portes</td>
                    <td>{vehicle.specs?.portes}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="tel:+33600000000" className="btn-hertz-primary flex-1 text-center" data-testid="call-btn">
                <Phone size={18} className="inline mr-2" />
                Appeler
              </a>
              <Link to="/contact" className="btn-hertz-secondary flex-1 text-center" data-testid="contact-btn">
                <Mail size={18} className="inline mr-2" />
                Nous écrire
              </Link>
            </div>
          </div>
        </div>

        {/* Options */}
        {vehicle.options && vehicle.options.length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200" data-testid="vehicle-options">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6">
              Équipements & Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {vehicle.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3">
                  <Check size={18} className="text-[#FFD100] flex-shrink-0" />
                  <span className="text-sm">{option}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {vehicle.historique && vehicle.historique.length > 0 && (
          <div className="mt-12 pt-12 border-t border-gray-200" data-testid="vehicle-history">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6">
              Historique d'entretien
            </h3>
            <div className="space-y-4">
              {vehicle.historique.map((entry, index) => (
                <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 border-l-4 border-[#FFD100]">
                  <div className="flex-shrink-0 text-center">
                    <div className="text-lg font-bold">{entry.date}</div>
                    <div className="text-sm text-gray-500">{entry.km} km</div>
                  </div>
                  <div className="border-l border-gray-300 pl-4">
                    <p className="text-gray-700">{entry.interventions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Contact Page
const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });
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
      console.error('Error submitting form:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* Header */}
      <section className="bg-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
            Contactez<span className="text-[#FFD100]">-nous</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl">
            Une question ? Besoin d'informations sur un véhicule ? 
            Notre équipe est à votre disposition.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
                  Nos Coordonnées
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFD100] p-3">
                      <Phone className="text-black" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wide">Téléphone</h4>
                      <a href="tel:+33600000000" className="text-gray-600 hover:text-[#FFD100] transition-colors">
                        +33 6 00 00 00 00
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFD100] p-3">
                      <Mail className="text-black" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wide">Email</h4>
                      <a href="mailto:contact@hertz-pro.fr" className="text-gray-600 hover:text-[#FFD100] transition-colors">
                        contact@hertz-pro.fr
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFD100] p-3">
                      <MapPin className="text-black" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-wide">Adresse</h4>
                      <p className="text-gray-600">
                        123 Rue de la Vente<br />
                        75000 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6">
                <h4 className="font-bold uppercase tracking-wide mb-4">Horaires d'ouverture</h4>
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">9h00 - 19h00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-medium">10h00 - 18h00</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="font-medium text-[#E11D48]">Fermé</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="yellow-section p-8">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-6">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="bg-white p-8 text-center">
                  <Check size={48} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
                  <p className="text-gray-600">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-hertz-secondary mt-6"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form space-y-4" data-testid="contact-form">
                  <div>
                    <input
                      type="text"
                      placeholder="Votre nom *"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      className="w-full"
                      data-testid="input-nom"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Votre email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Votre téléphone *"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      className="w-full"
                      data-testid="input-telephone"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Votre message *"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full resize-none"
                      data-testid="input-message"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-hertz-primary w-full"
                    disabled={submitting}
                    data-testid="submit-btn"
                  >
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
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
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
