import React, { useEffect, useState } from 'react';
import { getAll } from '../../services/Api'; // Assurez-vous que l'API est correctement définie
import LayoutAdmin from '../../components/LayoutAdmin'

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
      <div className="stat-card1 ">
        <h3>Total d'utilisateurs</h3> 
        <p>{stats.totalUtilisateurs} </p>
        </div>
      <div className="stat-card2 ">
      <h3>Total produits</h3> 
      <p> {stats.totalProduits} </p>
      </div>
      <div className="stat-card3 ">
      <h3> Total commandes</h3>
      <p> {stats.totalCommandes} </p>
      </div>
    </div>
    </LayoutAdmin>
       
  );
};

export default Dashboard;
