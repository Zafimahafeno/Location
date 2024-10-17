import * as React from "react";
import * as ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/all.min.css';
import './css/owl.carousel.css';
import './css/magnific-popup.css';
import './css/animate.css';
import './css/responsive.css';
import './css/meanmenu.min.css';
import './css/main.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Produit from "./page/produit";
import Accueil from "./page/accueil";
import Commande from "./page/commande";
import Categorie from "./page/categorie";
import Panier from "./page/panier";
import NotiAdm from "./page/notiAdm";
import Detail from "./page/detail";
import UserAdm from "./page/userAdm";
import ProduitEntre from "./page/produitEntre";
import ProduitSortie from "./page/produitSortie";
import CommadeAdm from "./page/commadeAdm";
import ProduitAdm from "./page/produitAdm";
import Test from "./page/Test";
import Notification from "./page/notification";
import Shop from "./page/shopView";
// import Produit from "./page/produit";
// import Commande from './page/commande';
// import Panier from './page/panier';
// import Detail from './page/detail';
// import NotiAdm from './page/notiAdm';
// import userAdm from './page/userAdm';
// import ProduitEntre from './page/produitEntre';
// import ProduitSortie from './page/produitSortie';
// import CommadeAdm from './page/commadeAdm';
// import ProduitAdm from './page/produitAdm';
// import Notification from './page/notification';
// import Test from "./page/Test";
// import Accueil from "./page/accueil";
// import Categorie from "./page/categorie";

const router = createBrowserRouter([
  {
    path: "/produit",
    Component: Produit,
  },
  {
    path: "/",
    Component: Accueil,
  },
  {
    path: "/Commande",
    Component: Commande,
  },
  {
    path: "/categorie",
    Component: Categorie,
  },
  {
    path: "/Panier",
    Component: Panier,
  },
  {
    path: "/Detail",
    Component: Detail,
  },
  {
    path: "/NotiAdm",
    Component: NotiAdm,
  },
  {
    path: "/userAdm",
    Component: UserAdm,
  },
  {
    path: "/ProduitEntre",
    Component: ProduitEntre,
  },
  {
    path: "/ProduitSortie",
    Component: ProduitSortie,
  },
  {
    path: "/CommadeAdm",
    Component: CommadeAdm,
  },
  {
    path: "/ProduitAdm",
    Component: ProduitAdm,
  },
  {
    path: "/Notification",
    Component: Notification,
  },
  {
    path: "/Shop",
    Component: Shop,
  },
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);