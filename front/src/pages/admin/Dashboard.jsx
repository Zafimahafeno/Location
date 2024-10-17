import React, { useEffect, useState } from 'react';
import { getStats } from '../../services/Api';  // L'API que tu as défini
import LayoutAdmin from '../../components/LayoutAdmin';


const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersData = await getStats('stats/users');
        setTotalUsers(usersData.totalUsers);

        const productsData = await getStats('stats/products');
        setTotalProducts(productsData.totalProducts);

        const ordersData = await getStats('stats/orders');
        setTotalOrders(ordersData.totalOrders);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <LayoutAdmin>
    <div className="dashboard">
      <div className="stat-card">
        <h3>Total d'utilisateurs</h3>
        <p>{totalUsers}</p>
      </div>
      <div className="stat-card">
        <h3>Total de produits</h3>
        <p>{totalProducts}</p>
      </div>
      <div className="stat-card">
        <h3>Total de commandes</h3>
        <p>{totalOrders}</p>
      </div>
    </div>
    </LayoutAdmin>
  );
};

export default Dashboard;
