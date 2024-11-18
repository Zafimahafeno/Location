import React from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaHeadset, FaCamera, FaGamepad } from 'react-icons/fa';
import Header from '../components/Header';
import '../css/Accueil.css'; // Nouveau fichier CSS amélioré

const PackItem = ({ icon: Icon, title, description, link }) => (
  <div className="pack-item">
    <Icon className="pack-icon" />
    <h3 className="pack-title">{title}</h3>
    <p className="pack-description">{description}</p>
    <Link to={link} className="btn-pack">Voir ce pack</Link>
  </div>
);

const Accueil = () => {
  return (
    <div className="accueil">
      {/* Hero Section */}
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Location de Matériel Informatique pour Entreprises et Professionnels
          </h1>
          <p className="hero-subtitle">
            Découvrez nos packs complets adaptés à vos besoins, que ce soit pour le télétravail, les réunions ou les projets créatifs.
          </p>
          <div className="hero-buttons">
            <Link to="/pack" className="btn-primary">Voir nos Packs</Link>
            <Link to="/shop" className="btn-secondary">Découvrir nos Produits Individuels</Link>
          </div>
        </div>
      </section>

      {/* Packs Section */}
      <section className="packs">
        <h2 className="section-title">Nos packs de matériel informatique</h2>
        <div className="packs-grid">
  <PackItem
    icon={FaMicrophone}
    title={<h3 className="pack-item-title">Pack Événementiel</h3>}
    description="Projecteur, sonorisation, écran et caméra pour diffusion en direct."
    link="/packs/evenementiel"
  />
  <PackItem
    icon={FaGamepad}
    title={<h3 className="pack-item-title">Pack Gaming</h3>}
    description="PC gamer ou console, écran haute fréquence, clavier et souris gaming."
    link="/packs/gaming"
  />
  <PackItem
    icon={FaHeadset}
    title={<h3 className="pack-item-title">Pack Réunion Virtuelle</h3>}
    description="Tout le nécessaire pour des réunions virtuelles efficaces."
    link="/packs/reunion"
  />
  <PackItem
    icon={FaCamera}
    title={<h3 className="pack-item-title">Pack Photographie</h3>}
    description="Équipements complets pour la photographie et la production vidéo."
    link="/packs/photo-video"
  />
</div>

      </section>

      {/* Why Us Section */}
      <section className="why-us">
        <h2 className="section-title">Pourquoi nous choisir ?</h2>
        <div className="why-us-grid">
          <div className="why-us-item">
            <h3>Flexibilité de location</h3>
            <p>Location flexible selon vos besoins : à court ou long terme.</p>
          </div>
          <div className="why-us-item">
            <h3>Service rapide</h3>
            <p>Livraison rapide et installation sur site.</p>
          </div>
          <div className="why-us-item">
            <h3>Support 24/7</h3>
            <p>Assistance technique disponible à tout moment.</p>
          </div>
          <div className="why-us-item">
            <h3>Matériel de qualité</h3>
            <p>Nous fournissons du matériel performant et adapté à tous vos besoins professionnels.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2 className="section-title">Contactez-nous</h2>
        <p>Pour toute demande de devis ou information complémentaire, n'hésitez pas à nous contacter.</p>
        <Link to="/contact" className="btn-primary">Nous Contacter</Link>
      </section>



        {/* Footer */}
        <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Location Informatique. Tous droits réservés.</p>
          
        </div>
      </footer>
    </div>
  );
};

export default Accueil;
