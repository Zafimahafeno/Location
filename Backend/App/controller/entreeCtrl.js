const connection = require('../dbConfig/cnxDB');

exports.getAllProduitEntree = (req, res) => {
    connection.query('SELECT * FROM produit_entree, produits  WHERE produit_entree.id_produit = produits.ID_produit', (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la récupération des entrées de produit : ' + error.stack);
            return res.status(500).json({ error: 'Erreur Interne du Serveur' });
        }
        res.json(results);
    });
}

exports.getOneProduitEntree = (req, res) => {
    const query = 'SELECT * FROM produit_entree WHERE id_entree = ?';
    const idToFind = req.params.id;
    connection.query(query, [idToFind], (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la recherche de l\'entrée de produit : ' + error.stack);
            return res.status(500).json({ error: 'Erreur Interne du Serveur' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aucune entrée de produit trouvée pour cet ID' });
        }
        const produitEntree = results[0];
        res.json(produitEntree);
    });
}

exports.createProduitEntree = async (req, res) => {
    const { id_produit, quantite_entree } = req.body;

    try {
        const produitQuery = 'SELECT * FROM Produits WHERE ID_produit = ?';
        await connection.query(produitQuery, [id_produit], async (error, produitResult, fields) => {

        if (produitResult.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        const quantite_actuelle = produitResult[0].Quantite_stock;
        const nouvelleQuantite = parseInt(quantite_actuelle) + parseInt(quantite_entree);

        const entreQuery = 'INSERT INTO produit_entree (id_produit, quantite_entree, date_entree) VALUES (?, ?, ?)';
        await connection.query(entreQuery, [id_produit, quantite_entree,  new Date()]);

        const updateProduitQuery = 'UPDATE produits SET Quantite_stock = ? WHERE ID_produit = ?';
        await connection.query(updateProduitQuery, [nouvelleQuantite, id_produit]);

        res.send({ success: 'Entrée de produit créée avec succès' });
    });
    } catch (error) {
        console.error('Erreur lors de la création de l\'entrée de produit : ' + error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Fonction pour supprimer une entrée de produit par son ID
exports.deleteProduitEntree = (req, res) => {
    const idToDelete = req.params.id;
    const query = 'DELETE FROM produit_entree WHERE id_entree = ?';

    connection.query(query, [idToDelete], (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la suppression de l\'entrée de produit : ' + error.stack);
            return res.status(500).json({ error: 'Erreur Interne du Serveur' });
        }
        res.json({ success: 'Entrée de produit supprimée avec succès' });
    });
}

// Fonction pour mettre à jour une entrée de produit
exports.updateProduitEntree = (req, res) => {
    const query = 'UPDATE produit_entree SET ? WHERE id_entree = ?';

    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la mise à jour de l\'entrée de produit : ' + error.stack);
            return res.status(500).json({ error: 'Erreur Interne du Serveur' });
        }
        res.json({ success: 'Entrée de produit mise à jour avec succès' });
    });
}
