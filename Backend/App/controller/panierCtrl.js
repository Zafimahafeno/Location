const connection = require('../dbConfig/cnxDB');

// exports.getPanier = (req, res) => {
//     connection.query(`SELECT * FROM panier, produits WHERE panier.ID_produit=produits.ID_produit AND ID_utilisateur=${req.params.id}`, (error, results, fields) => {
//         if (error) {
//           console.error('Error executing MySQL query: ' + error.stack);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         res.send(results);
//       });
// }

exports.getPanier = (req, res) => {
  connection.query(`SELECT panier.*, produits.*, panier.date_location, panier.date_retour 
    FROM panier, produits 
    WHERE panier.ID_produit=produits.ID_produit 
    AND ID_utilisateur=${req.params.id}`, (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.send(results);
  });
}
exports.getOnePanier = (req, res)=>{
    const query = 'SELECT * FROM panier WHERE ID_panier = ?';
    const idToFind = req.params.id
    connection.query(query, [idToFind], (error, results, fields) => {
        if (error) {
          console.error('Erreur lors de la recherche de la ligne de données : ' + error.stack);
          return;
        }
        if (results.length === 0) {
          res.send({error:'Aucune ligne de données correspondante n\'a été trouvée.'});
          return;
        }
        const panier = results[0];
        res.send(panier);
      });
}

exports.createPanier = (req, res)=>{

    const query = 'INSERT INTO panier SET ?';
    
    const { ID_utilisateur, ID_produit, Quantite, Date_ajout, date_location, date_retour } = req.body;
    // Construire les données pour l'insertion dans le panier
  const panierData = {
    ID_utilisateur,
    ID_produit,
    Quantite,
    Date_ajout,
    date_location,  // Ajouter la date de location
    date_retour     // Ajouter la date de retour
  };

  //     if (error) {
  //       console.error('Erreur lors de l\'insertion des données dans la table panier : ' + error.stack);
  //       return;
  //     }
  //     res.send({success:'Données insérées avec succès dans la table panier.'});
  //   });
  // Exécuter la requête pour insérer les données dans la table panier
  connection.query(query, panierData, (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données dans la table panier : ' + error.stack);
      return res.status(500).send({ error: 'Erreur interne du serveur' });
    }
    res.send({ success: 'Données insérées avec succès dans la table panier.' });
  });
}

  exports.deletePanier = (req, res)=>{
    
    const idToDelete = req.params.id; 

    const query = 'DELETE FROM panier WHERE ID_panier = ?';

    connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
        console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
        return;
    }
    res.send({success:'La ligne de données a été supprimée avec succès.'});
    });
}

exports.updatePanier = (req, res)=>{

  const query = 'UPDATE panier SET ? WHERE ID_panier = ?';
  
  connection.query(query, [req.body, req.params.id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la mise à jour des données : ' + error.stack);
      return;
    }
    res.send({success:'Les données ont été mises à jour avec succès.'});
  });
}