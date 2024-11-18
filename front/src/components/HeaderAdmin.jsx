// import React, { useEffect, useState } from 'react';
// import { FaCog, FaSearch } from 'react-icons/fa';
// import { MdNotificationsActive } from 'react-icons/md';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Url, handleDecrypt } from '../services/Api';
// import { FaUserCircle } from "react-icons/fa";
// const logo = require("../assets/logo.jfif");
// // const avatar = require("../assets/avatar.png");

// const HeaderAdmin = ({
//   searchInput=true, 
//   setSearch=()=>{},
//   search,
// }) => {
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [menu, setMenu] = useState(false);
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null)

//   const getUserConnect = async () => {
//     let user = localStorage.getItem('user');
//     if (user) {
//       user = JSON.parse(user);
//       setUser(handleDecrypt(user));
//     } else {
//       setUser(null)
//     }
//   }
//   useEffect(() => {
//     getUserConnect()
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     getUserConnect()
//     navigate('/login');

//   }
//   return (
//     <div className='header'>
//       <div className="logo">
//         <img style={{cursor:'pointer'}} onClick={()=>navigate('/')} src={logo} alt="logo" />
//       </div>
//         <div className='title'>Location materiel informatique</div>
//       <div className="icons">
//       {searchInput ? <div className={`search black ${isSearchFocused ? 'focused' : ''}`}>
//           <input 
//             placeholder='Search ....'
//             onFocus={() => setIsSearchFocused(true)}
//             onBlur={() => setIsSearchFocused(false)}
//             onChange={text=>setSearch(text.target.value)}
//             value={search}
//           />
//           <FaSearch />
//         </div>:<div className='search' />}
//         <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
//           <NavLink to='/admin/notification' className="icon">
//             <div className="dot">1</div>
//             <MdNotificationsActive />
//           </NavLink>
//         </div>
//         <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
//           <NavLink to='/admin/parametre' className="icon">
//             <FaCog />
//           </NavLink>
//         </div>
//         {user !== null ?
//           <div>
//             <div className="profil" style={{ cursor: 'pointer' }}>
//               <img onClick={() => setMenu(true)} src={Url + user.profil} alt="profil" />
//             </div>
//             {menu && <div className="menu" style={{ position: 'absolute', right: 20, top: 45 }}>
//               <ul>
//                 <li onClick={() => navigate('/admin/profil')}>Ton profil</li>
//                 <li onClick={handleLogout}>Deconnecter</li>
//               </ul>
//             </div>}
//           </div>
//           :
//           <div>
//           <NavLink to={'/login'} className="profil">
//             {/* <img src={avatar} alt="profil" /> */}
//             <FaUserCircle size={24} />
//           </NavLink></div>}
//       </div>
//     </div>
//   )
// }

// export default HeaderAdmin

import React, { useEffect, useState, useRef } from 'react';
import {  FaSearch, FaUserCircle } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import {  handleDecrypt } from '../services/Api';
import { FaSun, FaMoon } from 'react-icons/fa';


const logo = require("../assets/logo.jfif");

const HeaderAdmin = ({
  searchInput = true, 
  setSearch = () => {},
  search,
  
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const menuRef = useRef();

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  // Sauvegarder le mode dans localStorage et appliquer la classe au body
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  // Fonction pour récupérer l'utilisateur connecté
  const getUserConnect = () => {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      const decryptedUser = handleDecrypt(user);  
      console.log("Utilisateur récupéré :", decryptedUser); 
      setUser(decryptedUser); 
    } else {
      console.log("Aucun utilisateur trouvé"); 
      setUser(null);
    }
  };

  // Appeler `getUserConnect` au chargement du composant
  useEffect(() => {
    getUserConnect();
  }, []);

  // Gère la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('user'); // Suppression de l'utilisateur du localStorage
    setUser(null); // Réinitialisation de l'utilisateur
    navigate('/'); // Redirection après déconnexion
  };

  // Affiche ou cache le menu utilisateur
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Ferme le menu si on clique en dehors de celui-ci
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='header'>
      <div className="logo">
        <img 
          style={{ cursor: 'pointer' }} 
          onClick={() => navigate('/')} 
          src={logo} 
          alt="logo" 
        />
      </div>
      <div className='title'>Location matériel informatique</div>
      <div className="icons">
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

        <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
          <NavLink to='/admin/notification' className="icon">
            <div className="dot">1</div>
            <MdNotificationsActive />
          </NavLink>
        </div>
        {/* <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
          <NavLink to='/admin/parametre' className="icon">
            <FaCog />
          </NavLink>
        </div> */}
        {/* <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}> */}

        <button onClick={toggleDarkMode} className="toggle-theme">
        {darkMode ? <FaSun /> : <FaMoon />}
        {/* <span>{darkMode ? 'Mode Clair' : 'Mode Sombre'}</span> */}
      </button>
        
        
        {user ? (
          <div ref={menuRef} className="user-menu">
            <div 
              onClick={toggleMenu} 
              style={{ cursor: 'pointer' }}
              className="user-icon"
            >
              <FaUserCircle size={24} />
            </div>
            {menuVisible && (
              <div className="menu-dropdown" style={{ position: 'absolute', right: 20, top: 45 }}>
                <ul>
                  <li onClick={() => navigate('/admin/profil')}>Ton profil</li>
                  <li onClick={handleLogout}>Se déconnecter</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Non connecté</p>
         {/* <NavLink to={'/login'} className="">           
         <FaUserCircle size={24} />
         </NavLink> */}

          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderAdmin;



