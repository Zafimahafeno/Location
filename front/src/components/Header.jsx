import React, { useEffect, useState } from 'react';
import { FaShoppingBag, FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { NavLink, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserConnect } from '../services/Api';
import '../css/Navbar.css';

const logo = require("../assets/logo.jfif");

const Header = ({ searchInput, setSearch, search }) => {
  const location = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [panier, setPanier] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserConnect();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const { isLoading, error, data } = useQuery(['products', user], async () => {
    const response = await fetch(`http://localhost:4000/panierall/${user?.ID_client}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    return response.json();
  }, { enabled: !!user }); 

  useEffect(() => {
    if (data) {
      setPanier(data.length);
    }
  }, [data]);

  const handleMouseEnter = () => setIsDropdownVisible(true);
  const handleMouseLeave = () => setIsDropdownVisible(false);
  const toggleUserMenu = () => setIsUserMenuVisible(!isUserMenuVisible);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) return 'Chargement en cours...';
  if (error) return `Une erreur s'est produite: ${error.message}`;

  return (
    <div className={`header ${location.pathname !== '/' && 'blur'}`}>
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* Menu Burger */}
      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Liens de navigation */}
      <div className={`link ${isMenuOpen ? 'menu-open' : ''}`}>
        <NavLink to='/' className='linkBtn'>Accueil</NavLink>
        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <NavLink to='/shop' className='linkBtn'>Nos offres</NavLink>
          {isDropdownVisible && (
            <div className="dropdown-menu show">
              <NavLink to='/shop' className="dropdown-item">Nos Produits</NavLink>
              <NavLink to='/pack' className="dropdown-item">Nos Packs Produits</NavLink>
            </div>
          )}
        </div>
        <NavLink to='/Contact' className='linkBtn'>Contact</NavLink>
      </div>

      {/* Icônes */}
      <div className="icons">
        {searchInput && (
          <div className={`search black ${isSearchFocused ? 'focused' : ''}`}>
            <input
              placeholder='Search ....'
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
            <FaSearch />
          </div>
        )}

        <NavLink to='/panier' className={`icon ${isSearchFocused ? 'hidden' : ''}`}>
          {panier ? <div className="dot">{panier}</div> : null}
          <FaShoppingBag />
        </NavLink>

        {user && (
          <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
            <NavLink to='/Notification' className="icon">
              <div className="dot">1</div>
              <MdNotificationsActive />
            </NavLink>
          </div>
        )}

        {user ? (
          <div className="user-menu" onMouseEnter={toggleUserMenu} onMouseLeave={toggleUserMenu}>
            <FaUserCircle size={24} />
            {isUserMenuVisible && (
              <div className="user-dropdown">
                <span>Bienvenue, {user.username}</span>
                <button onClick={handleLogout}>Se déconnecter</button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to='/Login' className='button-signin'>Se connecter</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
