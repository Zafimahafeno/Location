const connection = require('../dbConfig/cnxDB');
const { createProduitSortie } = require('./sortieCtrl');

exports.getCommande = (req, res) => {
  connection.query('SELECT * FROM `commandes`, utilisateurs WHERE commandes.ID_utilisateur = utilisateurs.ID_utilisateur ', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
}

exports.getOneCommande = (req, res) => {
  const query = 'SELECT * FROM Commandes WHERE ID_Commande = ?';
  const idToFind = req.params.id
  connection.query(query, [idToFind], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la recherche de la ligne de données : ' + error.stack);
      return;
    }
    if (results.length === 0) {
      res.send({ error: 'Aucune ligne de données correspondante n\'a été trouvée.' });
      return;
    }
    const Commande = results[0];
    res.send(Commande);
  });
}

// exports.createCommande = (req, res)=>{

//     const query = 'INSERT INTO Commandes SET ?';

//     connection.query(query, req.body, (error, results, fields) => {
//       if (error) {
//         console.error('Erreur lors de l\'insertion des données dans la table Commandes : ' + error.stack);
//         return;
//       }
//       res.send({success:'Données insérées avec succès dans la table Commandes.'});
//     });
//   }

exports.createCommande = (req, res) => {
  const commandeData = {
    customerId: req.body.customerId,
    orderDate: new Date(),
    total: req.body.details.length,
    etet: 'Loading'
  };
  console.log(commandeData);
  const detailsData = req.body.details;

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).send({ error: 'Error starting transaction' });
    }

    const insertCommandeQuery = 'INSERT INTO Commandes (`ID_utilisateur`, `Date_commande`, Total,Etat_commande) VALUES (?, ?, ?, ?)';

    connection.query(insertCommandeQuery, [commandeData.customerId, commandeData.orderDate, commandeData.total, commandeData.etet], (error, results) => {
      if (error) {
        return connection.rollback(() => {
          res.status(500).send({ error: `Erreur lors de l'insertion des données dans la table Commandes : ${error.message}` });
        });
      }

      const commandeId = results.insertId;

      const insertDetailsQuery = 'INSERT INTO details_commande (ID_commande, ID_produit, Quantité, Prix_unitaire, Prix_total, Etat_détail_commande) VALUES ?';

      const detailsValues = detailsData.map(detail => [
        commandeId,
        detail.ID_produit,
        detail.Quantité,
        detail.Prix_unitaire,
        detail.Prix_total,
        detail.Etat_détail_commande
      ]);

      connection.query(insertDetailsQuery, [detailsValues], (error, results) => {
        if (error) {
          return connection.rollback(() => {
            res.status(500).send({ error: `Erreur lors de l'insertion des données dans la table details_commande : ${error.message}` });
          });
        }

        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).send({ error: 'Error committing transaction' });
            });
          }

          res.send({ success: 'Commande et détails insérés avec succès.' });
        });
      });
    });
  });
};


exports.deleteCommande = (req, res) => {

  const idToDelete = req.params.id;

  const query = 'DELETE FROM Commandes WHERE ID_Commande = ?';

  connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
      return;
    }
    res.send({ success: 'La ligne de données a été supprimée avec succès.' });
  });
}

exports.updateCommande = (req, res) => {

  const query = 'UPDATE Commandes SET ? WHERE ID_Commande = ?';

  connection.query(query, [req.body, req.params.id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la mise à jour des données : ' + error.stack);
      return;
    }
    res.send({ success: 'Les données ont été mises à jour avec succès.' });
  });
}
exports.livrerCommande = async (req, res) => {
  const query2 = 'SELECT * FROM `details_commande` WHERE ID_Commande = ?';

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query2, [req.params.id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });

    const detailsValues = results.map(detail => ({
      id_produit: detail.ID_produit,
      quantite_sortie: detail.Quantité,
    }));

    for (const detail of detailsValues) {
      await createProduitSortie( detail.id_produit, detail.quantite_sortie );
    }

    const query = 'UPDATE Commandes SET ? WHERE ID_Commande = ?';

    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la mise à jour des données : ' + error.stack);
        return;
      }
      res.status(200).json({ success: 'Commande livrée avec succès' });
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour des données : ' + error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
