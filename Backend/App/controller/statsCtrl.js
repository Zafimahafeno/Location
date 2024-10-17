const connection = require('../dbConfig/cnxDB');

// Récupérer le total des utilisateurs
exports.getTotalUsers = (req, res) => {
  connection.query('SELECT COUNT(*) AS totalUsers FROM utilisateurs', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du nombre d\'utilisateurs' });
    }
    res.json(results[0]);
  });
};

// Récupérer le total des produits
exports.getTotalProducts = (req, res) => {
  connection.query('SELECT COUNT(*) AS totalProducts FROM produits', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du nombre de produits' });
    }
    res.json(results[0]);
  });
};

// Récupérer le total des commandes
exports.getTotalOrders = (req, res) => {
  connection.query('SELECT COUNT(*) AS totalOrders FROM commandes', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Erreur lors de la récupération du nombre de commandes' });
    }
    res.json(results[0]);
  });
};
