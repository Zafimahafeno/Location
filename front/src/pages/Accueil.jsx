import React from 'react';
import { Link } from 'react-router-dom';
// import './Accueil.css'; 
import { FaMicrophone, FaHeadset,FaBoxOpen,FaCamera,FaGamepad } from 'react-icons/fa'; // Icônes pour les packs
import { PiStudent } from "react-icons/pi";
import Header from '../components/Header'; // Composant Header existant
// import image from '../assets/personnage3.png';

const Accueil = () => {
  return (
    <div className="accueil">
      {/* Hero Section */}
      <Header />
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Location de Matériel Informatique pour Entreprises et Professionnels</h1>
          <p className="hero-subtitle">Découvrez nos packs complets adaptés à vos besoins, que ce soit pour le télétravail, les réunions ou les projets créatifs.</p>
          <div className="hero-buttons">
            <Link to="/packs" className="btn-primary">Voir nos Packs</Link>
            <Link to="/shop" className="btn-secondary">Découvrir nos Produits Individuels</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* <img src="https://via.placeholder.com/1200x400" alt="Matériel Informatique" /> */}
        </div>
      </section>

      {/* Section des Packs */}
      <section className="packs">
        <h2 className="section-title">Nos packs de matériel informatique</h2>
        <div className="packs-grid">
          {/* Pack Télétravail */}
          <div className="pack-item">
           <FaMicrophone className="pack-icon" />
           <h3 className="pack-title">Pack Événementiel</h3>
            <p className="pack-description">Projecteur, sonorisation, écran et caméra pour diffusion en direct.</p>
             <Link to="/packs/evenementiel" className="btn-pack">Voir ce pack</Link>
          </div>

          <div className="pack-item">
           <FaGamepad className="pack-icon" />
            <h3 className="pack-title">Pack Gaming</h3>
             <p className="pack-description">PC gamer ou console, écran haute fréquence, clavier et souris gaming.</p>
             <Link to="/packs/gaming" className="btn-pack">Voir ce pack</Link>
         </div>
            
          {/* Pack Réunion Virtuelle */}
          <div className="pack-item">
            <FaHeadset className="pack-icon" />
            <h3 className="pack-title">Pack Réunion Virtuelle</h3>
            <p className="pack-description"> Tout le nécessaire pour des réunions virtuelles efficaces.</p>
            <Link to="/packs/reunion" className="btn-pack">Voir ce pack</Link>
          </div>

          {/* <div className="pack-item">
            <FaLaptop className="pack-icon" />
            <h3 className="pack-title">Pack Mobilité</h3>
            <p className="pack-description">Pour ceux qui voyagent ou qui ont besoin de matériel informatique facile à transporter .</p>
            <Link to="/packs/mobilite" className="btn-pack">Voir ce pack</Link>
          </div> */}
{/* Pack Photographie / Vidéo */}
          <div className="pack-item">
            <FaCamera className="pack-icon" />
            <h3 className="pack-title">Pack Photographie</h3>
            <p className="pack-description">Équipements complets pour la photographie et la production vidéo .</p>
            <Link to="/packs/photo-video" className="btn-pack">Voir ce pack</Link>
          </div>
          {/* Pack Bureau Évolutif */}
          <div className="pack-item">
            <FaBoxOpen className="pack-icon" />
            <h3 className="pack-title">Pack Bureau Évolutif</h3>
            <p className="pack-description">Matériel essentiel pour équiper des postes de travail professionnels pour entreprises et freelances .</p>
            <Link to="/packs/bureau" className="btn-pack">Voir ce pack</Link>
          </div>

          <div className="pack-item">
            <PiStudent className="pack-icon" />
            <h3 className="pack-title">Pack Soutenance</h3>
            <p className="pack-description">Ordinateur portable, projecteur, et tout le nécessaire pour vos soutenances .</p>
            <Link to="/packs/bureau" className="btn-pack">Voir ce pack</Link>
          </div>

          {/* <div className="pack-item">
           <FaBriefcase className="pack-icon" />
            <h3 className="pack-title">Pack Start-up/Coworking</h3>
            <p className="pack-description">Ordinateurs, wifi, claviers et matériel partagé pour vos équipes en coworking .</p>
            <Link to="/packs/bureau" className="btn-pack">Voir ce pack</Link>
          </div> */}

          {/* <div className="pack-item">
           <FaPalette className="pack-icon" />
            <h3 className="pack-title"> Pack Créatif</h3>
            <p className="pack-description">Ce pack est pensé pour les designers, vidéastes qui ont besoin d’un matériel puissant pour la création de contenu multimédia .</p>
            <Link to="/packs/bureau" className="btn-pack">Voir ce pack</Link>
          </div> */}
        </div>
      </section>

      {/* Pourquoi Nous Choisir */}
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

      {/* Témoignages */}
      <section className="testimonials">
        <h2 className="section-title">Témoignages Clients</h2>
        <div className="testimonial">
          <p>"Grâce à leur Pack Réunion Virtuelle, nous avons pu organiser des réunions à distance avec une qualité impeccable. Service rapide et matériel de qualité." – Société XYZ</p>
        </div>
        <div className="testimonial">
          <p>"Le Pack Télétravail est parfait pour nos employés travaillant à domicile. Installation rapide et matériel performant." – Entreprise ABC</p>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2 className="section-title">Contactez-nous</h2>
        <p>Pour toute demande de devis ou information complémentaire, n'hésitez pas à nous contacter.</p>
        <Link to="/contact" className="btn-primary">Nous Contacter</Link>
      </section>
    </div>
  );
};

export default Accueil;