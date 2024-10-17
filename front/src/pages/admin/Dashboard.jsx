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
      <div className="stat-card ">Total utilisateurs: {stats.totalUtilisateurs}</div>
      <div className="stat-card ">Total produits: {stats.totalProduits}</div>
      <div className="stat-card ">Total commandes: {stats.totalCommandes}</div>
    </div>
    </LayoutAdmin>
       
  );
};

export default Dashboard;
