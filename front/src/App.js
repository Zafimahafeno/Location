import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Accueil from "./pages/Accueil";
// import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Notification from "./pages/Notification";
import ProduitAdm from "./pages/admin/ProduitAdm";
import CommandeAdm from "./pages/admin/CommandeAdm";
import Produit from "./pages/Produit";
import Commande from "./pages/Commande";
import Categorie from "./pages/Categorie";
import Panier from "./pages/Panier";
import Detail from "./pages/Detail";
import NotiAdm from "./pages/admin/NotiAdm";
import UserAdm from "./pages/admin/UserAdm";
import ProduitEntre from "./pages/admin/ProduitEntre";
import ProduitSortie from "./pages/admin/ProduitSortie";
import Contact from "./pages/Contact";
import Setting from "./pages/admin/Setting";
import Clients from "./pages/admin/Clients";
import Profil from './pages/Profil';
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import AuthForm from "./components/AuthForm";
import Packs from "./pages/Packs";
import Dashboard from "./pages/admin/Dashboard";





function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Accueil,
    },
    // {
    //   path: "/home",
    //   Component: Home,
    // },
    {
      path: "/produit",
      Component: Produit,
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
      path: "/admin/notification",
      Component: NotiAdm,
    },
    {
      path: "/userAdm",
      Component: UserAdm,
    },
    {
      path: "/admin/produit/entree",
      Component: ProduitEntre,
    },
    {
      path: "/admin/produit/sortie",
      Component: ProduitSortie,
    },
    {
      path: "/admin/commande",
      Component: CommandeAdm
    },
    {
      path: "/admin/produit",
      Component: ProduitAdm
    },
    {
      path: "/admin/",
      Component: ProduitAdm
    },
    {
      path: "/admin/parametre",
      Component: Setting
    },
    {
      path: "/admin/client",
      Component: Clients
    },
    {
      path: "/Notification",
      Component: Notification,
    },
    {
      path: "/admin/profil",
      Component: Profil,
    },
    {
      path: "/authentification",
      Component: Login,
    },
    {
      path: "/shop",
      Component: Shop,
    },
    {
      path: "/Contact",
      Component: Contact,
    },
    {
      path: "/login",
      Component: AuthForm,
    },
    {
      path: "/signIn",
      Component: SignIn,
    },
    {
      path: "/packs",
      Component: Packs,
    },

    {
      path: "/dashboard",
      Component: Dashboard,
    },
    
    
    
      
  ]);
  
  return <RouterProvider router={router} />
}

export default App
