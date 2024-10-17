const connection = require("../dbConfig/cnxDB");

exports.getProduitSortie = (req, res) => {
    connection.query('SELECT * FROM produit_sortie, produits WHERE produit_sortie.id_produit = produits.ID_produit', (error, results, fields) => {
        if (error) {
            console.error('Error executing MySQL query: ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
}

exports.getOneProduitSortie = (req, res) => {
    const query = 'SELECT * FROM produit_sortie WHERE id_sortie = ?';
    const idToFind = req.params.id;
    connection.query(query, [idToFind], (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la recherche de la sortie de produit : ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Sortie de produit non trouvée' });
            return;
        }
        const sortieProduit = results[0];
        res.json(sortieProduit);
    });
}

exports.createProduitSortie = async (id_produit, quantite_sortie) => {
    // const { id_produit, quantite_sortie } = req.body;

    try {
        const produitQuery = 'SELECT * FROM Produits WHERE ID_produit = ?';
        await connection.query(produitQuery, [id_produit], async (error, produitResult, fields) => {
            if (produitResult.length === 0) {
                return console.log({ error: 'Produit non trouvé' });
            }
            
            const quantite_actuelle = produitResult[0].Quantite_stock;

            if (quantite_sortie > quantite_actuelle) {
                return console.log({ error: 'La quantité sortie dépasse la quantité disponible' });
            }

            const sortieQuery = 'INSERT INTO produit_sortie (id_produit, quantite_sortie, date_sortie) VALUES (?, ?, ?)';
            await connection.query(sortieQuery, [id_produit, quantite_sortie, new Date()]);

            const nouvelleQuantite = quantite_actuelle - quantite_sortie;
            const updateProduitQuery = 'UPDATE produits SET Quantite_stock = ? WHERE ID_produit = ?';
            await connection.query(updateProduitQuery, [nouvelleQuantite, id_produit]);

            console.log({ success: 'Sortie de produit créée avec succès' });

        });
    } catch (error) {
        console.error('Erreur lors de la création de la sortie de produit : ' + error.stack);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.deleteProduitSortie = (req, res) => {
    const idToDelete = req.params.id;
    const query = 'DELETE FROM produit_sortie WHERE id_sortie = ?';
    connection.query(query, [idToDelete], (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la suppression de la sortie de produit : ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ success: 'Sortie de produit supprimée avec succès' });
    });
}

exports.updateProduitSortie = (req, res) => {
    const query = 'UPDATE produit_sortie SET ? WHERE id_sortie = ?';
    connection.query(query, [req.body, req.params.id], (error, results, fields) => {
        if (error) {
            console.error('Erreur lors de la mise à jour de la sortie de produit : ' + error.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ success: 'Sortie de produit mise à jour avec succès' });
    });
}
