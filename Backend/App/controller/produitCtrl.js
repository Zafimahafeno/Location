const connection = require('../dbConfig/cnxDB');
const multer = require('multer');

exports.getProduit = (req, res) => {
  connection.query('SELECT * FROM produits, categorie WHERE produits.id_categorie = categorie.ID_categorie', (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
}

exports.getOneProduit = (req, res) => {
  const query = 'SELECT * FROM Produits WHERE ID_produit = ?';
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
    const produit = results[0];
    res.send(produit);
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'App/photo')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

exports.createProduit = [upload.single('photo'), (req, res) => {

  const query = 'INSERT INTO Produits SET ?';

  if (!req.file) {
    return res.status(400).send({ error: 'Aucune image téléchargée.' });
  }

  const imagePath = req.file.filename;

  const produitData = {
    Nom_produit: req.body.Nom_produit,
    Detail: req.body.Detail,
    Prix: req.body.Prix,
    Marque: req.body.Marque,
    // Modele: req.body.Modele,
    Annee: null,
    Quantite_stock: req.body.Quantite_stock,
    id_categorie: req.body.id_categorie,
    photoProduit: imagePath
  };
  
  connection.query(query, produitData, (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données dans la table Produits : ' + error.stack);
      return;
    }
    res.send({success:'Données insérées avec succès dans la table Produits.'});
  });
}]

exports.deleteProduit = (req, res) => {

  const idToDelete = req.params.id;

  const query = 'DELETE FROM Produits WHERE ID_produit = ?';

  connection.query(query, [idToDelete], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la suppression de la ligne de données : ' + error.stack);
      return;
    }
    res.send({ success: 'La ligne de données a été supprimée avec succès.' });
  });
}

exports.updateProduit = (req, res) => {

  const query = 'UPDATE Produits SET ? WHERE ID_produit = ?';

  connection.query(query, [req.body, req.params.id], (error, results, fields) => {
    if (error) {
      console.error('Erreur lors de la mise à jour des données : ' + error.stack);
      return;
    }
    res.send({ success: 'Les données ont été mises à jour avec succès.' });
  });
}