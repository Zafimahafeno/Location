const connection = require('../dbConfig/cnxDB');
const { password } = require('../dbConfig/db');

exports.getUtilisateurs = (req, res) => {
    connection.query('SELECT * FROM utilisateurs', (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error.stack);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
      });
}

exports.getOneUtilisateurs = (req, res)=>{
    const query = 'SELECT * FROM utilisateurs WHERE ID_utilisateur = ?';
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
        const utilisateurs = results[0];
        res.send(utilisateurs);
      });
}

exports.createUtilisateurs = (req, res)=>{

    const query = 'INSERT INTO utilisateurs SET ?';
    const query2 = 'INSERT INTO users SET ?';
    
    connection.query(query, req.body, (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de l\'insertion des données dans la table utilisateurs : ' + error.stack);
        return;
      }
      connection.query(query2, [{email:req.body.Adresse_email, password:req.body.Mot_de_passe, pseudo:req.body.Prenom}], (error, results, fields) => {
        if (error) {
          console.error('Erreur lors de l\'insertion des données dans la table utilisateurs : ' + error.stack);
          return;
        }
  
        res.send({success:'Données insérées avec succès dans la table utilisateurs.'});
      });
    });
  }

  exports.deleteUtilisateurs = (req, res)=>{
    
    const idToDelete = req.params.id; 

    const query = 'DELETE FROM utilisateurs WHERE ID_utilisateur = ?';

    connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
        console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
        return;
    }
    res.send({success:'La ligne de données a été supprimée avec succès.'});
    });
}

exports.updateUtilisateurs = (req, res)=>{

    const query = 'UPDATE utilisateurs SET ? WHERE ID_utilisateur = ?';
    
    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
      if (error) {
        console.error('Erreur lors de la mise à jour des données : ' + error.stack);
        return;
      }
      res.send({success:'Les données ont été mises à jour avec succès.'});
    });
  }

  exports.signing = (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
          console.error('Erreur lors de la recherche de la ligne de données : ' + error.stack);
          return;
        }
        if (results.length === 0) {
          res.send({error:'Adresse email introuvable.'});
          return;
        }
        const utilisateurs = results[0];
        if (password !== utilisateurs.password) {
          res.send({error:'Mots de passe incorect.'});
          return;
        }
        res.send(utilisateurs);
      });
};
