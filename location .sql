-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 17 oct. 2024 à 09:48
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `location`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis_produits`
--

CREATE TABLE `avis_produits` (
  `ID_avis` int(11) NOT NULL,
  `ID_utilisateur` int(11) DEFAULT NULL,
  `ID_produit` int(11) DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `Commentaire` text DEFAULT NULL,
  `Date_ajout` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `ID_categorie` int(11) NOT NULL,
  `Nom_categorie` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`ID_categorie`, `Nom_categorie`, `Description`) VALUES
(2, 'ordinateur', 'fsfasfasz'),
(3, 'souris', 'auto'),
(4, 'clavier', 'Pieces detaches'),
(5, 'camera', 'Batteries'),
(7, 'telephone', 'iphone ');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `idC` int(11) NOT NULL,
  `cli` varchar(50) NOT NULL,
  `cont` varchar(10) NOT NULL,
  `cin` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`idC`, `cli`, `cont`, `cin`) VALUES
(42, 'Tsiferana', '0388964317', '216547895220'),
(43, 'Briance', '0345269871', '205011027921'),
(47, 'Safidy', '0388964316', '216587493335');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id` int(11) NOT NULL,
  `idC` int(11) NOT NULL,
  `idP` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `idC`, `idP`, `qte`, `total`, `date`) VALUES
(87, 47, 21, 10, 6000000, '2024-04-10'),
(91, 43, 23, 5, 325000, '2024-04-11');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `ID_commande` int(11) NOT NULL,
  `ID_utilisateur` int(11) DEFAULT NULL,
  `Date_commande` date DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `Etat_commande` varchar(50) DEFAULT NULL,
  `type_commande` enum('pack','produit') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `details_commande`
--

CREATE TABLE `details_commande` (
  `ID_detail` int(11) NOT NULL,
  `ID_commande` int(11) DEFAULT NULL,
  `ID_produit` int(11) DEFAULT NULL,
  `ID_pack` int(11) DEFAULT NULL,
  `Quantité` int(11) DEFAULT NULL,
  `Prix_unitaire` decimal(10,2) DEFAULT NULL,
  `Prix_total` decimal(10,2) DEFAULT NULL,
  `Etat_détail_commande` varchar(50) DEFAULT NULL,
  `date_location` date DEFAULT NULL,
  `date_retour` date DEFAULT NULL,
  `duree_location` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `ID_notification` int(11) NOT NULL,
  `ID_utilisateur` int(11) DEFAULT NULL,
  `Contenu_notification` text DEFAULT NULL,
  `Date_envoi` datetime DEFAULT NULL,
  `Etat_lecture` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `packs`
--

CREATE TABLE `packs` (
  `ID_pack` int(11) NOT NULL,
  `Nom_pack` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Prix_total` decimal(10,2) NOT NULL,
  `Disponible` tinyint(1) NOT NULL DEFAULT 1,
  `statut` enum('Disponible','Indisponible') DEFAULT 'Disponible',
  `photoPack` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `packs`
--

INSERT INTO `packs` (`ID_pack`, `Nom_pack`, `Description`, `Prix_total`, `Disponible`, `statut`, `photoPack`) VALUES
(1, 'Pack bureau', 'Ordinateur de bureau ou ordinateur portable\r\nÉcran large (24\" ou plus)\r\nClavier et souris ergonomiques\r\nStation d\'accueil (dock station)\r\nImprimante multifonctions\r\nOnduleur (pour la protection électrique)\r\nCasque pour téléconférences', 2000000.00, 9, 'Disponible', 'chat2.webp'),
(2, 'Pack Conférence ', 'Ordinateur portable avec webcam intégrée\r\nCaméra de conférence 360°\r\nSystème de sonorisation (microphone et enceintes)\r\nÉcran de présentation\r\nProjecteur\r\nHub de connexion pour appareils multiples', 1800000.00, 10, 'Disponible', ''),
(3, 'Pack Photographie', 'Appareil photo reflex ou hybride avec objectifs\r\nCaméra de vidéo haute résolution\r\nÉclairage studio portable (softboxes, LED)\r\nTrépied et stabilisateur (gimbal)\r\nMicrophone externe pour la capture audio\r\nDisque dur externe pour le stockage', 1800000.00, 10, 'Disponible', ''),
(4, 'Pack Événementiel', 'Projecteur haute résolution\r\nOrdinateur portable ou mini-PC pour la gestion des présentations\r\nSystème de sonorisation (enceintes, micro)\r\nÉcran de projection ou écran LED large\r\nCaméra pour la diffusion en direct\r\nMicros sans fil', 2000000.00, 10, 'Disponible', '');

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `ID_panier` int(11) NOT NULL,
  `ID_utilisateur` int(11) DEFAULT NULL,
  `ID_produit` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  `session_id` varchar(255) DEFAULT NULL,
  `date_location` date DEFAULT NULL,
  `date_retour` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`ID_panier`, `ID_utilisateur`, `ID_produit`, `Quantite`, `Date_ajout`, `session_id`, `date_location`, `date_retour`) VALUES
(134, NULL, 28, 1, '2024-10-03 03:16:22', NULL, NULL, NULL),
(182, 4, NULL, 1, '2024-10-14 06:52:50', NULL, NULL, NULL),
(184, 4, NULL, 1, '2024-10-14 08:02:41', NULL, '2024-10-14', '2024-10-21'),
(185, 4, NULL, 1, '2024-10-14 08:03:28', NULL, '2024-10-14', '2024-10-21'),
(187, 4, NULL, 1, '2024-10-14 08:07:47', NULL, '2024-10-14', '2024-10-21'),
(188, 4, NULL, 1, '2024-10-14 08:08:13', NULL, '2024-10-14', '2024-10-21'),
(196, 4, NULL, 1, '2024-10-15 03:50:07', NULL, '2024-10-15', '2024-10-22'),
(197, 4, NULL, 1, '2024-10-15 03:50:19', NULL, '2024-10-15', '2024-10-22'),
(198, 4, NULL, 1, '2024-10-15 03:50:55', NULL, '2024-10-15', '2024-10-22'),
(202, 4, 28, 1, '2024-10-15 05:07:20', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `panier_temporaire`
--

CREATE TABLE `panier_temporaire` (
  `ID_temp_panier` int(11) NOT NULL,
  `guest_id` varchar(255) DEFAULT NULL,
  `ID_produit` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  `session_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `ID_produit` int(11) NOT NULL,
  `Nom_produit` varchar(100) DEFAULT NULL,
  `Detail` text DEFAULT NULL,
  `Prix` decimal(10,2) DEFAULT NULL,
  `Marque` varchar(50) DEFAULT NULL,
  `Annee` int(11) DEFAULT NULL,
  `Quantite_stock` int(11) DEFAULT NULL,
  `photoProduit` varchar(255) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `statut` enum('Disponible','Indisponible') DEFAULT 'Disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`ID_produit`, `Nom_produit`, `Detail`, `Prix`, `Marque`, `Annee`, `Quantite_stock`, `photoProduit`, `id_categorie`, `statut`) VALUES
(12, 'telephone', 'dsgdfdf', 1200.00, 'samsug', NULL, 3, 'telephone3.jpg', 7, 'Disponible'),
(28, 'souris', '4434', 3736.00, 'logitech', NULL, 0, 'souris1.jpg', 3, 'Disponible'),
(32, 'camera', '', 90000.00, 'domefull', NULL, 62, 'camera1.jpg', 5, 'Disponible'),
(34, 'clavier', 'hjjhhj', 6677.00, 'hp', NULL, 6, 'clavier1.jpg', 4, 'Disponible'),
(41, 'ordinateur hp', 'ccxr', 40000.00, 'victus', NULL, 20, 'victus2.jpg', 2, 'Disponible'),
(45, 'lenovo thp', 'jkjkl', 900000.00, 'lenov', NULL, 10, '1728981108986-DALLÂ·E 2024-10-08 09.40.03 - A hyper-realistic image showcasing different IT equipment packs designed for specific purposes. Display 4 packs_ (1) Start-up_Coworking Pack with mult.webp', 0, 'Disponible');

-- --------------------------------------------------------

--
-- Structure de la table `produits_packs`
--

CREATE TABLE `produits_packs` (
  `ID_produit_pack` int(11) NOT NULL,
  `ID_pack` int(11) NOT NULL,
  `ID_produit` int(11) NOT NULL,
  `Quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits_packs`
--

INSERT INTO `produits_packs` (`ID_produit_pack`, `ID_pack`, `ID_produit`, `Quantite`) VALUES
(1, 1, 41, 10),
(2, 1, 34, 0),
(3, 1, 28, 0),
(4, 2, 41, 10),
(5, 3, 32, 10);

-- --------------------------------------------------------

--
-- Structure de la table `produit_entree`
--

CREATE TABLE `produit_entree` (
  `id_entree` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `quantite_entree` int(11) NOT NULL,
  `date_entree` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit_entree`
--

INSERT INTO `produit_entree` (`id_entree`, `id_produit`, `quantite_entree`, `date_entree`) VALUES
(1, 10, 2, '2024-06-05 00:00:00'),
(2, 8, 10, '2024-06-05 00:35:16'),
(3, 17, 10, '2024-06-05 01:24:17'),
(4, 18, 20, '2024-06-05 01:26:31'),
(5, 9, 3, '2024-06-05 01:27:42'),
(6, 9, 3, '2024-06-05 01:28:42'),
(7, 10, 30, '2024-06-05 01:29:53'),
(8, 10, 50, '2024-06-05 01:31:03'),
(9, 11, 20, '2024-06-05 10:03:55'),
(10, 26, 30, '2024-06-05 10:20:23'),
(11, 27, 20, '2024-06-05 11:52:40'),
(12, 25, 20, '2024-06-05 11:56:51'),
(14, 33, 20, '2024-06-05 14:30:47'),
(15, 36, 6, '2024-06-05 15:18:05'),
(16, 36, 0, '2024-06-05 15:19:28'),
(17, 37, 3, '2024-06-05 15:35:58'),
(20, 31, 21, '2024-06-10 17:51:46'),
(21, 32, 12, '2024-10-15 11:36:06');

-- --------------------------------------------------------

--
-- Structure de la table `produit_sortie`
--

CREATE TABLE `produit_sortie` (
  `id_sortie` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `quantite_sortie` int(11) NOT NULL,
  `date_sortie` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit_sortie`
--

INSERT INTO `produit_sortie` (`id_sortie`, `id_produit`, `quantite_sortie`, `date_sortie`) VALUES
(10, 27, 2, '2024-06-10 16:11:42'),
(11, 27, 2, '2024-06-10 16:11:43'),
(20, 33, 1, '2024-06-10 16:39:09'),
(21, 27, 1, '2024-06-10 16:39:09'),
(22, 27, 5, '2024-06-10 16:42:27'),
(23, 27, 2, '2024-06-10 16:42:37'),
(24, 27, 2, '2024-06-10 16:42:37'),
(25, 44, 1, '2024-06-10 17:57:49'),
(26, 27, 1, '2024-06-10 17:57:49'),
(27, 33, 1, '2024-06-10 17:58:25'),
(28, 27, 1, '2024-06-10 17:58:25'),
(29, 44, 1, '2024-06-10 17:58:25');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `profil` varchar(255) NOT NULL DEFAULT 'avatar.png',
  `password` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `email`, `pseudo`, `profil`, `password`, `role`) VALUES
(2, 'nathalie@gmail.com', 'Nathalie', 'avatar.png', '1234578', 'client'),
(4, 'nathalientsu@gmail.com', 'Natha', 'avatar.png', '1234578', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `ID_utilisateur` int(11) NOT NULL,
  `Nom` varchar(50) DEFAULT NULL,
  `Prenom` varchar(50) DEFAULT NULL,
  `Adresse_email` varchar(100) DEFAULT NULL,
  `phone` varchar(12) NOT NULL,
  `Mot_de_passe` varchar(100) DEFAULT NULL,
  `Adresse_livraison` varchar(255) DEFAULT NULL,
  `Adresse_facturation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`ID_utilisateur`, `Nom`, `Prenom`, `Adresse_email`, `phone`, `Mot_de_passe`, `Adresse_livraison`, `Adresse_facturation`) VALUES
(4, 'Nathalie', 'Ntsu', 'nathalie@gmail.com', '0345678456', '1234578', 'Imandry', 'Imandry');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `avis_produits`
--
ALTER TABLE `avis_produits`
  ADD PRIMARY KEY (`ID_avis`),
  ADD KEY `ID_utilisateur` (`ID_utilisateur`),
  ADD KEY `ID_produit` (`ID_produit`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`ID_categorie`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`idC`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`ID_commande`),
  ADD KEY `ID_utilisateur` (`ID_utilisateur`);

--
-- Index pour la table `details_commande`
--
ALTER TABLE `details_commande`
  ADD PRIMARY KEY (`ID_detail`),
  ADD KEY `ID_commande` (`ID_commande`),
  ADD KEY `ID_produit` (`ID_produit`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`ID_notification`),
  ADD KEY `ID_utilisateur` (`ID_utilisateur`);

--
-- Index pour la table `packs`
--
ALTER TABLE `packs`
  ADD PRIMARY KEY (`ID_pack`);

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`ID_panier`),
  ADD KEY `ID_utilisateur` (`ID_utilisateur`),
  ADD KEY `ID_produit` (`ID_produit`);

--
-- Index pour la table `panier_temporaire`
--
ALTER TABLE `panier_temporaire`
  ADD PRIMARY KEY (`ID_temp_panier`),
  ADD KEY `ID_produit` (`ID_produit`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`ID_produit`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `produits_packs`
--
ALTER TABLE `produits_packs`
  ADD PRIMARY KEY (`ID_produit_pack`),
  ADD KEY `ID_pack` (`ID_pack`),
  ADD KEY `ID_produit` (`ID_produit`);

--
-- Index pour la table `produit_entree`
--
ALTER TABLE `produit_entree`
  ADD PRIMARY KEY (`id_entree`);

--
-- Index pour la table `produit_sortie`
--
ALTER TABLE `produit_sortie`
  ADD PRIMARY KEY (`id_sortie`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`ID_utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avis_produits`
--
ALTER TABLE `avis_produits`
  MODIFY `ID_avis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `ID_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `idC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `ID_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `details_commande`
--
ALTER TABLE `details_commande`
  MODIFY `ID_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `ID_notification` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `packs`
--
ALTER TABLE `packs`
  MODIFY `ID_pack` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `ID_panier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT pour la table `panier_temporaire`
--
ALTER TABLE `panier_temporaire`
  MODIFY `ID_temp_panier` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `ID_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `produits_packs`
--
ALTER TABLE `produits_packs`
  MODIFY `ID_produit_pack` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `produit_entree`
--
ALTER TABLE `produit_entree`
  MODIFY `id_entree` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `produit_sortie`
--
ALTER TABLE `produit_sortie`
  MODIFY `id_sortie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `ID_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis_produits`
--
ALTER TABLE `avis_produits`
  ADD CONSTRAINT `avis_produits_ibfk_1` FOREIGN KEY (`ID_utilisateur`) REFERENCES `utilisateurs` (`ID_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `avis_produits_ibfk_2` FOREIGN KEY (`ID_produit`) REFERENCES `produits` (`ID_produit`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`ID_utilisateur`) REFERENCES `utilisateurs` (`ID_utilisateur`) ON DELETE CASCADE;

--
-- Contraintes pour la table `details_commande`
--
ALTER TABLE `details_commande`
  ADD CONSTRAINT `details_commande_ibfk_1` FOREIGN KEY (`ID_commande`) REFERENCES `commandes` (`ID_commande`) ON DELETE CASCADE,
  ADD CONSTRAINT `details_commande_ibfk_2` FOREIGN KEY (`ID_produit`) REFERENCES `produits` (`ID_produit`) ON DELETE CASCADE;

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`ID_utilisateur`) REFERENCES `utilisateurs` (`ID_utilisateur`) ON DELETE CASCADE;

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`ID_utilisateur`) REFERENCES `utilisateurs` (`ID_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`ID_produit`) REFERENCES `produits` (`ID_produit`) ON DELETE CASCADE;

--
-- Contraintes pour la table `panier_temporaire`
--
ALTER TABLE `panier_temporaire`
  ADD CONSTRAINT `panier_temporaire_ibfk_1` FOREIGN KEY (`ID_produit`) REFERENCES `produits` (`ID_produit`) ON DELETE CASCADE;

--
-- Contraintes pour la table `produits_packs`
--
ALTER TABLE `produits_packs`
  ADD CONSTRAINT `produits_packs_ibfk_1` FOREIGN KEY (`ID_pack`) REFERENCES `packs` (`ID_pack`) ON DELETE CASCADE,
  ADD CONSTRAINT `produits_packs_ibfk_2` FOREIGN KEY (`ID_produit`) REFERENCES `produits` (`ID_produit`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
