import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaProductHunt,FaUsers } from "react-icons/fa6";
  


const SidebarAdmin = () => {
  const route = useLocation();
  const liens = [
    
    {link:'/admin/dashboard', title:'Tableau de bord', icon:<MdDashboard size={30}  />},
    {link:'/admin/produit', title:'Tous les produits', icon:<FaProductHunt size={30} />},
    {link:'/admin/client', title:'Client',icon:<FaUsers size={30} />},
  ]
  return (
    <div className='sidebar'>
      {/* <div className="avatar">
        <img src={avatar} alt="profil"/>
      </div> */}
      {liens.map((item, i)=>(
      <Link key={i} className={`item ${route.pathname === item.link ? 'active':''}`} to={item.link}>
        <div className="icon">{item.icon}

           
        </div>
        <div className="text">{item.title}</div>
      </Link>))}
    </div>
  )
}

export default SidebarAdmin
