const connection = require('../dbConfig/cnxDB');

exports.getCategorie = (req, res) => {
    connection.query('SELECT * FROM categorie', (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error.stack);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
      });
}

exports.getOneCategorie = (req, res)=>{
    const query = 'SELECT * FROM categorie WHERE id_categorie = ?';
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
        const Categorie = results[0];
        res.send(Categorie);
      });
}

exports.createCategorie = (req, res)=>{

    const query = 'INSERT INTO categorie SET ?';
    
    connection.query(query, req.body, (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de l\'insertion des données dans la table categorie : ' + error.stack);
        return;
      }
      res.send({success:'Données insérées avec succès dans la table categorie.'});
    });
  }

  exports.deleteCategorie = (req, res)=>{
    
    const idToDelete = req.params.id; 

    const query = 'DELETE FROM categorie WHERE id_categorie = ?';

    connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
        console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
        return;
    }
    res.send({success:'La ligne de données a été supprimée avec succès.'});
    });
}

exports.updateCategorie = (req, res)=>{

    const query = 'UPDATE categorie SET ? WHERE id_categorie = ?';
    
    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la mise à jour des données : ' + error.stack);
        return;
      }
      res.send({success:'Les données ont été mises à jour avec succès.'});
    });
  }