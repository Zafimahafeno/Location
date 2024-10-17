import React, { useEffect, useState } from 'react';
import { FaCog, FaSearch } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { Url, handleDecrypt } from '../services/Api';
const logo = require("../assets/logo.jfif");
// const avatar = require("../assets/avatar.png");

const HeaderAdmin = ({
  searchInput=true, 
  setSearch=()=>{},
  search,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null)

  const getUserConnect = async () => {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      setUser(handleDecrypt(user));
    } else {
      setUser(null)
    }
  }
  useEffect(() => {
    getUserConnect()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    getUserConnect()
    navigate('/login');

  }
  return (
    <div className='header'>
      <div className="logo">
        <img style={{cursor:'pointer'}} onClick={()=>navigate('/')} src={logo} alt="logo" />
      </div>
        <div className='title'>Location materiel informatique</div>
      <div className="icons">
      {searchInput ? <div className={`search black ${isSearchFocused ? 'focused' : ''}`}>
          <input 
            placeholder='Search ....'
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onChange={text=>setSearch(text.target.value)}
            value={search}
          />
          <FaSearch />
        </div>:<div className='search' />}
        <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
          <NavLink to='/admin/notification' className="icon">
            <div className="dot">1</div>
            <MdNotificationsActive />
          </NavLink>
        </div>
        <div className={`icone ${isSearchFocused ? 'hidden' : ''}`}>
          <NavLink to='/admin/parametre' className="icon">
            <FaCog />
          </NavLink>
        </div>
        {user !== null ?
          <div>
            <div className="profil" style={{ cursor: 'pointer' }}>
              <img onClick={() => setMenu(true)} src={Url + user.profil} alt="profil" />
            </div>
            {menu && <div className="menu" style={{ position: 'absolute', right: 20, top: 45 }}>
              <ul>
                <li onClick={() => navigate('/admin/profil')}>Ton profil</li>
                <li onClick={handleLogout}>Deconnecter</li>
              </ul>
            </div>}
          </div>
          :
          <div>
          <NavLink to={'/login'} className="profil">
            {/* <img src={avatar} alt="profil" /> */}
          </NavLink></div>}
      </div>
    </div>
  )
}

export default HeaderAdmin
