const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const { getProduitSortie, getOneProduitSortie, createProduitSortie, deleteProduitSortie, updateProduitSortie } = require('../controller/sortieCtrl');
const {
    getProduit,
    createProduit,
    deleteProduit,
    updateProduit,
    getOneProduit
} = require('../controller/produitCtrl');
const { getCategorie, getOneCategorie, createCategorie, updateCategorie, deleteCategorie } = require('../controller/categorieCtrl');
const { getPanier, getOnePanier, createPanier, deletePanier, updatePanier } = require('../controller/panierCtrl');
const { getUtilisateurs, getOneUtilisateurs, createUtilisateurs, deleteUtilisateurs, updateUtilisateurs, login, signing } = require('../controller/utilisateurCtrl');
const { getNotifications, getOneNotifications, createNotifications, deleteNotifications, updateNotifications } = require('../controller/notificationCtrl');
const { getdetails_commande, createdetails_commande, deletedetails_commande, updatedetails_commande, getOnedetails_commande, getDetails_commandes } = require('../controller/detailCtrl');
const { getCommande, getOneCommande, createCommande, deleteCommande, updateCommande, livrerCommande } = require('../controller/commandesCtrl');
const { getAllProduitEntree, getOneProduitEntree, createProduitEntree, deleteProduitEntree, updateProduitEntree } = require('../controller/entreeCtrl');
const { getPacks, getOnePack, createPack, deletePack, updatePack } = require('../controller/packCtrl');
const { getTotalUsers, getTotalProducts, getTotalOrders } = require('../controller/statsCtrl');

router.get('/produit', getProduit);
router.get('/produit/:id', getOneProduit);
router.post('/produit', createProduit);
router.delete('/produit/:id', deleteProduit);
router.put('/produit/:id', updateProduit);


router.get('/categorie', getCategorie);
router.get('/categorie/:id', getOneCategorie);
router.post('/categorie', createCategorie);
router.delete('/categorie/:id', deleteCategorie);
router.put('/categorie/:id', updateCategorie);

router.get('/panierall/:id', getPanier);
router.get('/panier/:id', getOnePanier);
router.post('/panier', createPanier);
router.delete('/panier/:id', deletePanier);
router.put('/panier/:id', updatePanier);

router.get('/utilisateur', getUtilisateurs);
router.get('/utilisateur/:id', getOneUtilisateurs);
router.post('/utilisateur', createUtilisateurs);
router.delete('/utilisateur/:id', deleteUtilisateurs);
router.put('/utilisateur/:id', updateUtilisateurs);
router.post('/signing', signing)

router.get('/notification', getNotifications);
router.get('/notification/:id', getOneNotifications);
router.post('/notification', createNotifications);
router.delete('/notification/:id', deleteNotifications);
router.put('/notification/:id', updateNotifications);

router.get('/detail', getdetails_commande);
router.get('/detail/:id', getOnedetails_commande);
router.post('/detail', createdetails_commande);
router.delete('/detail/:id', deletedetails_commande);
router.put('/detail/:id', updatedetails_commande);

router.get('/commande', getCommande);
router.get('/commande/:id', getOneCommande);
router.post('/commande', createCommande);
router.delete('/commande/:id', deleteCommande);
router.put('/commande/:id', updateCommande);
router.put('/livrer/:id', livrerCommande);
router.get('/detail/:id', getDetails_commandes);

router.get('/sortie', getProduitSortie);
router.get('/sortie/:id', getOneProduitSortie);
router.post('/sortie', createProduitSortie);
router.delete('/sortie/:id', deleteProduitSortie);
router.put('/sortie/:id', updateProduitSortie);

router.get('/entree', getAllProduitEntree);
router.get('/entree/:id', getOneProduitEntree);
router.post('/entree', createProduitEntree);
router.delete('/entree/:id', deleteProduitEntree);
router.put('/entree/:id', updateProduitEntree);

router.get('/stats/users', getTotalUsers);     // Total des utilisateurs
router.get('/stats/products', getTotalProducts); // Total des produits
router.get('/stats/orders', getTotalOrders);    // Total des commandes

// Ajouter les routes pour les packs
router.get('/packs', getPacks);               // Récupérer tous les packs
router.get('/packs/:id', getOnePack);         // Récupérer un seul pack par ID
router.post('/packs', createPack);            // Créer un nouveau pack
router.delete('/packs/:id', deletePack);      // Supprimer un pack par ID
router.put('/packs/:id', updatePack);         // Mettre à jour un pack par ID

module.exports = router;




router.get('/', (req, res) => {
    function generateSecretKey() {
        return crypto.randomBytes(32).toString('hex');
    }
    res.send(generateSecretKey());
})




module.exports = router;
