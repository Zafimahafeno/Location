const connection = require('../dbConfig/cnxDB');

exports.getNotifications = (req, res) => {
    connection.query('SELECT * FROM notifications', (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error.stack);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
      });
}

exports.getOneNotifications = (req, res)=>{
    const query = 'SELECT * FROM notifications WHERE ID_notification = ?';
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
        const Notifications = results[0];
        res.send(Notifications);
      });
}

exports.createNotifications = (req, res)=>{

    const query = 'INSERT INTO notifications SET ?';
    
    connection.query(query, req.body, (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de l\'insertion des données dans la table notifications : ' + error.stack);
        return;
      }
      res.send({success:'Données insérées avec succès dans la table notifications.'});
    });
  }

  exports.deleteNotifications = (req, res)=>{
    
    const idToDelete = req.params.id; 

    const query = 'DELETE FROM notifications WHERE ID_notification = ?';

    connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
        console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
        return;
    }
    res.send({success:'La ligne de données a été supprimée avec succès.'});
    });
}

exports.updateNotifications = (req, res)=>{

    const query = 'UPDATE notifications SET ? WHERE ID_notification = ?';
    
    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la mise à jour des données : ' + error.stack);
        return;
      }
      res.send({success:'Les données ont été mises à jour avec succès.'});
    });
  }