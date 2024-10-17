import React from 'react';
// import { FaUsers,FaProductHunt } from 'react-icons/fa';
// import { MdHome } from 'react-icons/md';
// import { MdShoppingCart } from "react-icons/md";
// import { MdInput } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
// import { LuFolderOutput } from "react-icons/lu";
// const avatar = require("../assets/avatar.png");
import { Player } from '@lottiefiles/react-lottie-player';
// import Lottie from 'react-lottie';   
import dashboardLottie from '../assets/lottie/dashboard.json'; // Fichier Lottie pour le dashboard
import productsLottie from '../assets/lottie/product.json';  // Fichier Lottie pour les produits
// import ordersLottie from '../assets/lottie/orders.json';      // Fichier Lottie pour les commandes
import clientsLottie from '../assets/lottie/user1.json';  


const SidebarAdmin = () => {
  const route = useLocation();
  const liens = [
    {link:'/admin/dashboard', title:'Tableau de bord', lottie: dashboardLottie},
    {link:'/admin/produit', title:'Tous les produits', lottie: productsLottie},
    // {link:'/admin/produit/entree', title:'Produit entre', icon:<MdInput size={30}  />},
    // {link:'/admin/produit/sortie', title:'Produit sortie', icon:<LuFolderOutput size={30} />},
    // {link:'/admin/commande', title:'Commande', icon:<MdShoppingCart size={30}  />},
    {link:'/admin/client', title:'Client',lottie: clientsLottie},
  ]
  return (
    <div className='sidebar'>
      {/* <div className="avatar">
        <img src={avatar} alt="profil"/>
      </div> */}
      {liens.map((item, i)=>(
      <Link key={i} className={`item ${route.pathname === item.link ? 'active':''}`} to={item.link}>
        <div className="icon">{item.icon}
        <Player
              autoplay
              loop
              src={item.lottie}  // Fichier Lottie JSON
              style={{ height: '80px', width: '80px' }}
            />
           
        </div>
        <div className="text">{item.title}</div>
      </Link>))}
    </div>
  )
}

export default SidebarAdmin
