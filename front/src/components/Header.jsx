import React, { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useLocation } from 'react-router-dom';
import { MdNotificationsActive } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useQuery } from 'react-query';
// Assuming getUserConnect fetches the connected user
import { getUserConnect } from '../services/Api'; 

const logo = require("../assets/logo.jfif");


const Header = ({
  searchInput,
  setSearch,
  search,
}) => {
  
  const location = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [panier, setPanier] = useState(0);
  const [id, setId] = useState(null);


  
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserConnect();
      setId(userData.idUser);  // Set the id from user data
    };
    fetchUser();
  }, []);

  const { isLoading, error, data } = useQuery('products', async () => {
    const response = await fetch(`http://localhost:4000/panierall/${id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    return response.json();
  }, { enabled: !!id }); // Only run query if id exists

  useEffect(() => {
    if (data) {
      setPanier(data.length);
    }
  }, [data]);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };
  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  if (isLoading) return 'Chargement en cours...';
  if (error) return `Une erreur s'est produite: ${error.message}`;

  return (
    <div className={`header ${location.pathname !== '/' && 'blur'}`}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="link">
      <NavLink to='/' className='linkBtn'>Accueil</NavLink>
        {/* Intégration du bouton Shop avec menu déroulant */}
        <div 
          className="dropdown" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        
        >
      
          <NavLink to='/shop' className='linkBtn'>Nos offres</NavLink>
           {/* Menu déroulant */}
           {isDropdownVisible && (
            <div className="dropdown-menu">
              <NavLink to='/shop' className="dropdown-item">Nos Produits</NavLink>
              <NavLink to='/packs' className="dropdown-item">Nos Packs Produits</NavLink>
            </div>
          )}
        </div>
        <NavLink to='/Contact' className='linkBtn'>Contact</NavLink>
      </div>
      < div className="icons">
      <NavLink to='/Login' className='linksignin'>Se connecter</NavLink>
      
      {searchInput && (
  <div className={`search black ${isSearchFocused ? 'focused' : ''}`}>
    <input
      placeholder='Search ....'
      onFocus={() => setIsSearchFocused(true)}
      onBlur={() => setIsSearchFocused(false)}
      onChange={text => setSearch(text.target.value)}
      value={search}
    />
    <FaSearch />
  </div>
)}

        <NavLink to='/panier' className={`icon ${isSearchFocused ? 'hidden' : ''}`}>
          {panier ? <div className="dot">{panier}</div> : null}
          <FaCartShopping />
        </NavLink>
        <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
          <NavLink to='/Notification' className="icon">
            <div className="dot">1</div>
            <MdNotificationsActive />
          </NavLink>
        </div>
      </div> 
    </div>  
  );
};

export default Header;
