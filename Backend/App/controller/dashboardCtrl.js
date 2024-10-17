// Dans un contrôleur adminCtrl.js (par exemple)
const connection = require('../dbConfig/cnxDB');

exports.getDashboardStats = (req, res) => {
  const totalUsersQuery = 'SELECT COUNT(*) AS totalUtilisateurs FROM utilisateurs';
  const totalProductsQuery = 'SELECT COUNT(*) AS totalProduits FROM produits';
  const totalOrdersQuery = 'SELECT COUNT(*) AS totalCommandes FROM commandes';

  // Exécuter les 3 requêtes en parallèle
  connection.query(totalUsersQuery, (err, usersResult) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }

    connection.query(totalProductsQuery, (err, productsResult) => {
      if (err) {
        console.error('Erreur lors de la récupération des produits:', err);
        return res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
      }

      connection.query(totalOrdersQuery, (err, ordersResult) => {
        if (err) {
          console.error('Erreur lors de la récupération des commandes:', err);
          return res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
        }

        // Envoyer les résultats au frontend
        res.json({
          totalUtilisateurs: usersResult[0].totalUtilisateurs,
          totalProduits: productsResult[0].totalProduits,
          totalCommandes: ordersResult[0].totalCommandes,
        });
      });
    });
  });
};
