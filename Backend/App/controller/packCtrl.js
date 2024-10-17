const connection = require('../dbConfig/cnxDB');
const multer = require('multer');

// Configuration de l'upload des fichiers (images des packs)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'App/photo');  // Dossier où les images seront stockées
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Nom du fichier image
  }
});

const upload = multer({ storage: storage });

// Obtenir tous les packs avec les produits associés
exports.getPacks = (req, res) => {
  connection.query('SELECT * FROM packs', (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des packs :', error);
      return res.status(500).json({ error: 'Erreur lors de la récupération des packs' });
    }
    res.json(results);
  });
};

// Obtenir un seul pack avec ses produits associés
exports.getOnePack = (req, res) => {
  const packId = req.params.id;
  const query = `
    SELECT p.ID_pack, p.Nom_pack, p.Description, p.Prix_total, p.photoPack, p.Disponible, p.statut, 
           pr.ID_produit, pr.Nom_produit, pr.Prix, pr.photoProduit, pp.Quantite 
    FROM packs p
    LEFT JOIN produits_packs pp ON p.ID_pack = pp.ID_pack
    LEFT JOIN produits pr ON pp.ID_produit = pr.ID_produit
    WHERE p.ID_pack = ?`;

  connection.query(query, [packId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération du pack : ' + error.stack);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    if (results.length === 0) {
      res.status(404).send({ error: 'Pack non trouvé' });
      return;
    }
    res.json(results);
  });
};

// Ajouter un nouveau pack avec l'image
exports.createPack = [upload.single('photoPack'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'Aucune image téléchargée.' });
  }

  const query = 'INSERT INTO packs SET ?';

  const packData = {
    Nom_pack: req.body.Nom_pack,
    Description: req.body.Description,
    Prix_total: req.body.Prix_total,
    Disponible: req.body.Disponible || 1,  // 1 = disponible
    statut: req.body.statut || 'Disponible',
    photoPack: req.file.filename  // Ajout de l'image du pack
  };

  connection.query(query, packData, (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données dans la table packs : ' + error.stack);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.send({ success: 'Pack ajouté avec succès.' });
  });
}];

// Supprimer un pack par son ID
exports.deletePack = (req, res) => {
  const idToDelete = req.params.id;
  const query = 'DELETE FROM packs WHERE ID_pack = ?';

  connection.query(query, [idToDelete], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression du pack : ' + error.stack);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.send({ success: 'Pack supprimé avec succès.' });
  });
};

// Mettre à jour un pack
exports.updatePack = [upload.single('photoPack'), (req, res) => {
  const packId = req.params.id;

  let updateData = {
    Nom_pack: req.body.Nom_pack,
    Description: req.body.Description,
    Prix_total: req.body.Prix_total,
    Disponible: req.body.Disponible || 1,
    statut: req.body.statut || 'Disponible'
  };

  // Si une nouvelle image est fournie, mettre à jour le chemin de l'image
  if (req.file) {
    updateData.photoPack = req.file.filename;
  }

  const query = 'UPDATE packs SET ? WHERE ID_pack = ?';

  connection.query(query, [updateData, packId], (error, results) => {
    if (error) {
      console.error('Erreur lors de la mise à jour du pack : ' + error.stack);
      return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    res.send({ success: 'Pack mis à jour avec succès.' });
  });
}];
