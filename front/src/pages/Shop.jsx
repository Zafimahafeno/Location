// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import { create, getAll, getUserConnect } from '../services/Api';
// import { v4 as uuidv4 } from 'uuid';
// import AlertMessage from '../components/alertMessage';
// import { useLocation } from 'react-router-dom';

// function Shop() {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [counts, setCounts] = useState({});
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMsg, setAlertMsg] = useState('');
//   const [user, setUser] = useState(null);
//   const [sessionID, setSessionID] = useState(''); // Pour gérer les utilisateurs non connectés
//   const [dateLocation, setDateLocation] = useState({});
//   const [dateRetour, setDateRetour] = useState({});
//   const location = useLocation();
  

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await getUserConnect();
//       setUser(userData);

//       if (!userData) {
//         const storedSessionID = localStorage.getItem('session_id');
//         if (!storedSessionID) {
//           const newSessionID = uuidv4();
//           localStorage.setItem('session_id', newSessionID);
//           setSessionID(newSessionID);
//         } else {
//           setSessionID(storedSessionID);
//         }
//       }
//     };

//     fetchUser();
//     getDataDB();
//   }, [location.search]);

//   const getDataDB = async () => {
//     const data = await getAll('produit'); // Récupération de tous les produits
//     console.log('Données récupérées:', data); 
//     setData(data);
//   };

//   const handleCloseAlert = () => {
//     setAlertOpen(false);
//   };

  
// const setPanierDB = async (id) => {
//   const produit = data.find(item => item.ID_produit === id); // Trouve le produit sélectionné
//   const panierData = {
//     ID_produit: id,
//     quantite: counts[id] || 1,
//     date_ajout: new Date(),
//     date_location: dateLocation[id] || null,
//     date_retour: dateRetour[id] || null,
//   };

//   try {
//     if (user) {
//       // Utilisateur connecté
//       panierData.ID_client = user.ID_client;
//       await create('panier', panierData);
//     } else {
//       // Utilisateur non connecté : vérifie `sessionID`
//       let session_id = sessionID || localStorage.getItem('session_id');
//       if (!session_id) {
//         session_id = uuidv4();
//         localStorage.setItem('session_id', session_id);
//         setSessionID(session_id);
//       }
//       panierData.session_id = session_id;
//       await create('panier_temporaire', panierData);
//       console.log("Session ID:", session_id); // Vérification de l'ID session
//     }

//     setAlertMsg('Produit ajouté au panier');
//     setAlertOpen(true);
//   } catch (error) {
//     console.error("Erreur lors de l'ajout au panier :", error);
//   }
// };

//   const handleIncrement = (id, type) => {
//     setCounts(prevCounts => ({
//       ...prevCounts,
//       [id]: type === 'plus' ? (prevCounts[id] || 1) + 1 : Math.max((prevCounts[id] || 1) - 1, 1)
//     }));
//   };
//   const handleDateLocationChange = (id, date) => {
//     setDateLocation(prev => ({ ...prev, [id]: date }));
//   };

//   const handleDateRetourChange = (id, date) => {
//     setDateRetour(prev => ({ ...prev, [id]: date }));
//   };

//   const filteredData = data.filter(item => (
//     (item.marque.toLowerCase().includes(search.toLowerCase()) ||
//       item.nom_produit.toLowerCase().includes(search.toLowerCase()) ||
//       item.detail.toLowerCase().includes(search.toLowerCase())) ||
//       (item.prix && item.prix.toString().toLowerCase().includes(search.toLowerCase()))
//   ));

//   return (
//     <div className='content'>
//       <div className='headers'>
//         <Header searchInput search={search} setSearch={setSearch} />
//       </div>

//       <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />

//       <div className='row'>
//         {filteredData.length > 0 ? filteredData.map(item => (
//           <div key={item.ID_produit} className='card'>
//             <img src={`http://localhost:4000/${item.photoProduit}`} alt="produit" />
//             <div className='marque'>{item.marque}</div>
//             <div className='contain'>
//               <div className='nom'>{item.nom_produit}</div>
//               <div className='detail'>{item.detail}</div>
//               <div className="footer">
//                 <div className='prix'>{item.prix} Ar</div>
//                 <div className="quantite">
//                   <div className="btn" onClick={() => handleIncrement(item.ID_produit, 'moins')}>-</div>
//                   <div className="nbQuante">{counts[item.ID_produit] || 1}</div>
//                   <div className="btn" onClick={() => handleIncrement(item.ID_produit, 'plus')}>+</div>
                  
//                 </div>
//                 <div className='form-date'>
//                   <label>Date de location: </label>
//                   <input type="date" onChange={(e) => handleDateLocationChange(item.ID_produit, e.target.value)} />
//                   <label>Date de retour: </label>
//                   <input type="date" onChange={(e) => handleDateRetourChange(item.ID_produit, e.target.value)} />
//                 </div>
//               </div>
//               <button onClick={() => setPanierDB(item.ID_produit)}>Ajouter au panier</button>
//             </div>
//           </div>
//         )) : (
//           <div className="no-products">Pas de produit disponible</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Shop;


// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import { create, getAll, getUserConnect } from '../services/Api';
// import { v4 as uuidv4 } from 'uuid';
// import AlertMessage from '../components/alertMessage';
// import { useLocation } from 'react-router-dom';

// function Shop() {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [counts, setCounts] = useState({});
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMsg, setAlertMsg] = useState('');
//   const [user, setUser] = useState(null);
//   const [sessionID, setSessionID] = useState(''); 
//   const [dateLocation, setDateLocation] = useState({});
//   const [dateRetour, setDateRetour] = useState({});
//   const location = useLocation();
  
//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await getUserConnect();
//       setUser(userData);

//       if (!userData) {
//         const storedSessionID = localStorage.getItem('session_id');
//         if (!storedSessionID) {
//           const newSessionID = uuidv4();
//           localStorage.setItem('session_id', newSessionID);
//           setSessionID(newSessionID);
//         } else {
//           setSessionID(storedSessionID);
//         }
//       }
//     };

//     fetchUser();
//     getDataDB();
//   }, [location.search]);

//   const getDataDB = async () => {
//     const data = await getAll('produit'); 
//     setData(data);
//   };

//   const handleCloseAlert = () => {
//     setAlertOpen(false);
//   };

//   const setPanierDB = async (id) => {
//     const produit = data.find(item => item.ID_produit === id);
//     const panierData = {
//       ID_produit: id,
//       quantite: counts[id] || 1,
//       date_ajout: new Date(),
//       date_location: dateLocation[id] || null,
//       date_retour: dateRetour[id] || null,
//       prix: produit?.prix,
//     };
  
//     try {
//       if (user) {
//         panierData.ID_client = user.ID_client;
//         await create('panier', panierData);
//       } else {
//         panierData.session_id = sessionID;
//         await create('panier_temporaire', panierData);
//       }
  
//       setAlertMsg('Produit ajouté au panier');
//       setAlertOpen(true);
//     } catch (error) {
//       console.error("Erreur lors de l'ajout au panier :", error);
//     }
//   };
    

//   const handleIncrement = (id, type) => {
//     setCounts(prevCounts => ({
//       ...prevCounts,
//       [id]: type === 'plus' ? (prevCounts[id] || 1) + 1 : Math.max((prevCounts[id] || 1) - 1, 1)
//     }));
//   };
//   const handleDateLocationChange = (id, date) => {
//     setDateLocation(prev => ({ ...prev, [id]: date }));
//   };

//   const handleDateRetourChange = (id, date) => {
//     setDateRetour(prev => ({ ...prev, [id]: date }));
//   };

//   const filteredData = data.filter(item => (
//     (item.marque.toLowerCase().includes(search.toLowerCase()) ||
//       item.nom_produit.toLowerCase().includes(search.toLowerCase()) ||
//       item.detail.toLowerCase().includes(search.toLowerCase())) ||
//       (item.prix && item.prix.toString().toLowerCase().includes(search.toLowerCase()))
//   ));

//   return (
//     <div className='content'>
//       <div className='headers'>
//         <Header searchInput search={search} setSearch={setSearch} />
//       </div>

//       <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />

//       <div className='row'>
//         {filteredData.length > 0 ? filteredData.map(item => (
//           <div key={item.ID_produit} className='card'>
//             <img src={`http://localhost:4000/${item.photoProduit}`} alt="produit" />
//             <div className='marque'>{item.marque}</div>
//             <div className='contain'>
//               <div className='nom'>{item.nom_produit}</div>
//               <div className='detail'>{item.detail}</div>
//               <div className="footer">
//                 <div className='prix'>{item.prix} Ar</div>
//                 <div className="quantite">
//                   <div className="btn" onClick={() => handleIncrement(item.ID_produit, 'moins')}>-</div>
//                   <div className="nbQuante">{counts[item.ID_produit] || 1}</div>
//                   <div className="btn" onClick={() => handleIncrement(item.ID_produit, 'plus')}>+</div>
//                 </div>
//                 <div className='form-date'>
//                   <label>Date de location: </label>
//                   <input type="date" onChange={(e) => handleDateLocationChange(item.ID_produit, e.target.value)} />
//                   <label>Date de retour: </label>
//                   <input type="date" onChange={(e) => handleDateRetourChange(item.ID_produit, e.target.value)} />
//                 </div>
//               </div>
//               <button onClick={() => setPanierDB(item.ID_produit)}>Ajouter au panier</button>
//             </div>
//           </div>
//         )) : (
//           <div className="no-products">Pas de produit disponible</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Shop;


import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { create, getAll, getUserConnect } from '../services/Api';
import AlertMessage from '../components/alertMessage';
import { useLocation } from 'react-router-dom';

function Shop() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [user, setUser] = useState(null);
  const [dateLocation, setDateLocation] = useState({});
  const [dateRetour, setDateRetour] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserConnect();
      setUser(userData);
    };

    fetchUser();
    getDataDB();
  }, [location.search]);

  const getDataDB = async () => {
    const data = await getAll('produit');
    setData(data);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const setPanierDB = async (id) => {
    if (!user) {
      setAlertMsg('Veuillez vous connecter pour ajouter des produits au panier.');
      setAlertOpen(true);
      return;
    }

    // Validation pour s'assurer que les dates sont bien sélectionnées
    if (!dateLocation[id] || !dateRetour[id]) {
      setAlertMsg("Veuillez sélectionner la date de location et la date de retour.");
      setAlertOpen(true);
      return;
    }

    const panierData = {
      ID_produit: id,
      quantite: counts[id] || 1,
      date_ajout: new Date(),
      date_location: dateLocation[id],  // Date de début de location
      date_retour: dateRetour[id],      // Date de retour
      ID_client: user.ID_client
    };

    try {
      await create('panier', panierData);
      setAlertMsg('Produit ajouté au panier');
      setAlertOpen(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  };

  const handleIncrement = (id, type) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: type === 'plus' ? (prevCounts[id] || 1) + 1 : Math.max((prevCounts[id] || 1) - 1, 1)
    }));
  };

  const handleDateLocationChange = (id, date) => {
    setDateLocation(prev => ({ ...prev, [id]: date }));
  };

  const handleDateRetourChange = (id, date) => {
    setDateRetour(prev => ({ ...prev, [id]: date }));
  };

  const filteredData = data.filter(item => (
    item.marque.toLowerCase().includes(search.toLowerCase()) ||
    item.nom_produit.toLowerCase().includes(search.toLowerCase()) ||
    item.detail.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <div className='content'>
      <Header searchInput search={search} setSearch={setSearch} />
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />

      <div className='row'>
        {filteredData.length > 0 ? filteredData.map(item => (
          <div key={item.ID_produit} className='card'>
            <img src={`http://localhost:4000/${item.photoProduit}`} alt="produit" />
            <div className='marque'>{item.marque}</div>
            <div className='contain'>
              <div className='nom'>{item.nom_produit}</div>
              <div className='detail'>{item.detail}</div>
              <div className="footer">
                <div className='prix'>{item.prix} Ar</div>
                <div className="quantite">
                  <button className="btn" onClick={() => handleIncrement(item.ID_produit, 'moins')}>-</button>
                  <div className="nbQuante">{counts[item.ID_produit] || 1}</div>
                  <button className="btn" onClick={() => handleIncrement(item.ID_produit, 'plus')}>+</button>
                </div>
                <div className='form-date'>
                  <label>Date de location:</label>
                  <input 
                    type="date" 
                    onChange={(e) => handleDateLocationChange(item.ID_produit, e.target.value)} 
                  />
                  <label>Date de retour:</label>
                  <input 
                    type="date" 
                    onChange={(e) => handleDateRetourChange(item.ID_produit, e.target.value)} 
                  />
                </div>
              </div>
              <button onClick={() => setPanierDB(item.ID_produit)}>Ajouter au panier</button>
            </div>
          </div>
        )) : (
          <div className="no-products">Pas de produit disponible</div>
        )}
      </div>
    </div>
  );
}

export default Shop;

