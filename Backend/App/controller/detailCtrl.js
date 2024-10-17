const connection = require('../dbConfig/cnxDB');

exports.getdetails_commande = (req, res) => {
    connection.query('SELECT * FROM `details_commande`, commandes WHERE details_commande.ID_commande= commandes.ID_commande AND details_commande.ID_commande = 7 AND commandes.ID_utilisateur=4;', (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error.stack);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
      });
}

exports.getOnedetails_commande = (req, res)=>{
    const query = 'SELECT * FROM Commandes, details_commande WHERE Commandes.ID_utilisateur = ?';
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
        const details_commande = results[0];
        res.send(details_commande);
      });
}

exports.createdetails_commande = (req, res)=>{

    const query = 'INSERT INTO details_commande SET ?';
    
    connection.query(query, req.body, (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de l\'insertion des données dans la table details_commande : ' + error.stack);
        return;
      }
      res.send({success:'Données insérées avec succès dans la table details_commande.'});
    });
  }

  exports.deletedetails_commande = (req, res)=>{
    
    const idToDelete = req.params.id; 

    const query = 'DELETE FROM details_commande WHERE ID_detail = ?';

    connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
        console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
        return;
    }
    res.send({success:'La ligne de données a été supprimée avec succès.'});
    });
}

exports.updatedetails_commande = (req, res)=>{

    const query = 'UPDATE details_commande SET ? WHERE ID_detail = ?';
    
    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la mise à jour des données : ' + error.stack);
        return;
      }
      res.send({success:'Les données ont été mises à jour avec succès.'});
    });
  }

  
// exports.getDetails_commandes = (req, res)=>{
//   const query = 'SELECT * FROM Commandes, details_commande WHERE Commandes.ID_utilisateur = ? and details_commande.ID_produit = ?';
//   const idToFind = req.params.id
//   const idCom = req.body.id
//   connection.query(query, [idToFind, idCom], (error, results, fields) => {
//       if (error) {
//         console.error('Erreur lors de la recherche de la ligne de données : ' + error.stack);
//         return;
//       }
//       if (results.length === 0) {
//         res.send({error:'Aucune ligne de données correspondante n\'a été trouvée.'});
//         return;
//       }
//       const details_commande = results[0];
//       res.send(details_commande);
//     });
// }

exports.getDetails_commandes = (req, res) => {
  const query = `SELECT * FROM details_commande, commandes 
  WHERE details_commande.ID_commande= commandes.ID_commande 
  AND commandes.ID_utilisateur= ?
  AND details_commande.ID_commande = ?`;
  
  const idToFind = req.params.id; 
  const idCom = req.body.ID_produit; 

  connection.query(query, [idToFind, idCom], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la recherche de la ligne de données : ' + error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).json({ error: 'Aucune ligne de données correspondante n\'a été trouvée.' });
      return;
    }
    
    res.status(200).json(results);
  });
};
