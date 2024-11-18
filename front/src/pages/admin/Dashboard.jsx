import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/Api'; 
import LayoutAdmin from '../../components/LayoutAdmin'

import { People, Category, ShoppingCart } from '@mui/icons-material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUtilisateurs: 0,
    totalProduits: 0,
    totalCommandes: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAll('dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <LayoutAdmin>
      <div className="dashboard">
        {/* <div className="stat-card stat-card1">
        <div class="stat-icon-wrapper">
        <i class="style-icon"> <People  /> </i>
          <h3>Total d'utilisateurs</h3>
          <p>{stats.totalUtilisateurs}</p>
          <div class="options-icon">⋮</div>
          </div>
        </div> */}
        <div class="stat-card stat-card1">
    <div class="stat-icon-wrapper">
      <i class="stat-icon"><People  /></i> 
    </div>
    <h3>Total Utilisateurs</h3>
    <p>{stats.totalUtilisateurs}</p>
    {/* <p>Last Month</p> */}
    <div class="options-icon">⋮</div>
  </div>

        < div className="stat-card stat-card2">
        <div class="stat-icon-wrapper">
        <i class="stat-icon"> <Category/> </i> 
         </div>
          <h3>Total produits</h3>  
          <p>{stats.totalProduits}</p>
          <div class="options-icon">⋮</div>
          </div>
        
        < div className="stat-card stat-card3">
        <div class="stat-icon-wrapper">
        <i class="stat-icon"> <ShoppingCart/> </i> 
        </div>  
          <h3>Total Location</h3>
          <p>{stats.totalCommandes}</p>
          <div class="options-icon">⋮</div>
          </div>
      </div>
    </LayoutAdmin>
  );
};

export default Dashboard;
