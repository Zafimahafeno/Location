// import React, { useEffect, useState } from 'react';
// import Header from './../components/Header';
// import { IoTrash } from "react-icons/io5";
// import { Url, deleteDB, getAll, getUserConnect, update, create } from '../services/Api';
// import AlertMessage from '../components/alertMessage';
// import { v4 as uuidv4 } from 'uuid';

// const Panier = () => {
//   const [data, setData] = useState([]);
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMsg, setAlertMsg] = useState('');
//   const [user, setUser] = useState(null);
//   const [sessionID, setSessionID] = useState('');

//   const handleCloseAlert = () => {
//     setAlertOpen(false);
//   };

//   const getDataDB = async (id, sessionID) => {
//     const endpoint = id ? `panierall/${id}` : `panier_temporaire/session/${sessionID}`;
//     const data = await getAll(endpoint);
//     setData(data);
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const userData = await getUserConnect();
//       if (userData) {
//         setUser(userData);
//         getDataDB(userData.idUser);
//       } else {
//         const storedSessionID = localStorage.getItem('session_id');
//         if (!storedSessionID) {
//           const newSessionID = uuidv4();
//           localStorage.setItem('session_id', newSessionID);
//           setSessionID(newSessionID);
//           getDataDB(null, newSessionID);
//         } else {
//           setSessionID(storedSessionID);
//           getDataDB(null, storedSessionID);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   const deleteDataDB = async (id) => {
//     await deleteDB(`panier/${id}`)
//       .then((result) => {
//         setAlertMsg(result.success);
//         setAlertOpen(true);
//         if (user) {
//           getDataDB(user.idUser);
//         } else {
//           getDataDB(null, sessionID);
//         }
//       }).catch((err) => {
//         console.log(err);
//       });
//   };

//   const upQuantite = async (id, type, quant) => {
//     if (type === 'moins' && quant !== 1) {
//       await update(`panier/${id}`, { Quantite: quant - 1 });
//     } else if (type === 'plus') {
//       await update(`panier/${id}`, { Quantite: quant + 1 });
//     }
//     if (user) {
//       getDataDB(user.idUser);
//     } else {
//       getDataDB(null, sessionID);
//     }
//   };

//   const calculateTotalPrice = (items) => {
//     return items.reduce((acc, item) => acc + (item.Prix * item.Quantite), 0);
//   };

//   const handleOrder = async () => {
//     if (!user) {
//       setAlertMsg("Veuillez vous connecter pour passer une commande");
//       setAlertOpen(true);
//       return;
//     }

//     const orderData = {
//       customerId: user.idUser,
//       orderDate: new Date(),
//       details: data.map(item => ({
//         ID_produit: item.ID_produit,
//         ID_pack: item.ID_pack,  // Pour différencier les produits et les packs
//         Quantité: item.quantite,
//         Prix_unitaire: item.Prix,
//         Prix_total: item.Prix * item.quantite,
//         Etat_détail_commande: 'Pending'
//       }))
//     };

//     await create('commande', orderData)
//       .then((result) => {
//         setAlertMsg(result.success);
//         setAlertOpen(true);
//         setData([]);
//       }).catch((err) => {
//         console.log(err);
//       });
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Date(dateString).toLocaleDateString('fr-FR', options);
//   };

//   const calculateRentalDuration = (startDate, endDate) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//     return duration > 0 ? duration : 0;
//   };

//   return (
//     <div className='content'>
//       <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
//       <Header />
//       <div className="panier">
//         <div className="panierLeft">
//           <div className="panierCard">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Produit / Pack</th>
//                   <th>Prix unitaire</th>
//                   <th>Quantité</th>
//                   <th>Date de location</th>
//                   <th>Date de retour</th>
//                   <th>Durée</th>
//                   <th>Prix total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, i) => (
//                   <tr key={item.ID_panier} className={`${data.length - 1 !== i && 'border'}`}>
//                     <td className='produit'>
//                       <img src={`${Url + (item.photoProduit || item.photoPack)}`} alt="img" />
//                       <div className="detail">
//                         <div>{item.marque || item.nom_pack}</div>
//                         <div>{item.nom_produit || item.description}</div>
//                       </div>
//                     </td>
//                     <td className='prix'>{item.Prix} Ar</td>
//                     <td>
//                       <div className="quantite">
//                         <button className="btn" onClick={() => upQuantite(item.ID_panier, 'moins', item.Quantite)}>-</button>
//                         <div className="nbQuante">{item.Quantite}</div>
//                         <button className="btn" onClick={() => upQuantite(item.ID_panier, 'plus', item.Quantite)}>+</button>
//                       </div>
//                     </td>
//                     <td>{formatDate(item.date_location)}</td>
//                     <td>{formatDate(item.date_retour)}</td>
//                     <td>{calculateRentalDuration(item.date_location, item.date_retour)} jours</td>
//                     <td className='prix' style={{ color: '#F7BA00' }}>{parseInt(item.Prix * item.Quantite)} Ar</td>
//                     <td>
//                       <div className='icon' onClick={() => deleteDataDB(item.ID_panier)}><IoTrash /></div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="panierRight">
//           <div className="panierCard">
//             <div className="total">
//               <h3>TTC: {calculateTotalPrice(data)} Ar</h3>
//               <button className="btnOrder" onClick={handleOrder}>Passer la commande</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Panier;


import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import { IoTrash } from "react-icons/io5";
import { Url, deleteDB, getAll, getUserConnect, update, create } from '../services/Api';
import AlertMessage from '../components/alertMessage';
import { v4 as uuidv4 } from 'uuid';

const Panier = () => {
  const [data, setData] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [user, setUser] = useState(null);
  const [sessionID, setSessionID] = useState('');

  const handleCloseAlert = () => setAlertOpen(false);

  const getDataDB = async (id, sessionID) => {
    const endpoint = id ? `panierall/${id}` : `panier_temporaire/session/${sessionID}`;
    try {
      const data = await getAll(endpoint);
      setData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setAlertMsg("Erreur lors de la récupération des données");
      setAlertOpen(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserConnect();
      if (userData) {
        setUser(userData);
        getDataDB(userData.ID_client);
      } else {
        const storedSessionID = localStorage.getItem('session_id');
        if (!storedSessionID) {
          const newSessionID = uuidv4();
          localStorage.setItem('session_id', newSessionID);
          setSessionID(newSessionID);
          getDataDB(null, newSessionID);
        } else {
          setSessionID(storedSessionID);
          getDataDB(null, storedSessionID);
        }
      }
    };
    fetchUser();
  }, []);

  const deleteDataDB = async (id) => {
    try {
      const result = await deleteDB(`panier/${id}`);
      setAlertMsg(result.success);
      setAlertOpen(true);
      user ? getDataDB(user.ID_client) : getDataDB(null, sessionID);
    } catch (err) {
      console.error('Erreur lors de la suppression : ', err);
    }
  };

  const upQuantite = async (id, type, quant) => {
    const newQuantity = type === 'moins' && quant > 1 ? quant - 1 : quant + 1;
    try {
      await update(`panier/${id}`, { Quantite: newQuantity });
      user ? getDataDB(user.ID_client) : getDataDB(null, sessionID);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la quantité : ', err);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      const duration = calculateRentalDuration(item.date_location, item.date_retour);
      return acc + (item.prix * item.quantite * duration);
    }, 0);
  };

  const handleOrder = async () => {
    if (!user) {
      setAlertMsg("Veuillez vous connecter pour passer une commande");
      setAlertOpen(true);
      return;
    }

    const orderData = {
      customerId: user.ID_client,
      orderDate: new Date(),
      details: data.map(item => {
        const duration = calculateRentalDuration(item.date_location, item.date_retour);
        return {
          ID_produit: item.ID_produit,
          Quantite: item.quantite,
          Prix_unitaire: item.prix,
          Prix_total: item.prix * item.quantite * duration,
          Etat_détail_commande: 'Pending'
        };
      })
    };

    try {
      const result = await create('commande', orderData);
      setAlertMsg(result.success);
      setAlertOpen(true);
      setData([]);
    } catch (err) {
      console.error('Erreur lors de la création de la commande : ', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const calculateRentalDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return duration > 0 ? duration : 1;  // Minimum 1 jour de location
  };

  return (
    <div className='content'>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      <Header />
      <div className="panier">
        <div className="panierLeft">
          <div className="panierCard">
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix unitaire</th>
                  <th>Quantité</th>
                  <th>Date de location</th>
                  <th>Date de retour</th>
                  <th>Durée</th>
                  <th>Total TTC</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.ID_panier}>
                    <td className='produit'>
                      <img src={`${Url + item.photoProduit}`} alt="img" />
                      <div className="detail">
                        <div>{item.marque}</div>
                        <div>{item.nom_produit}</div>
                      </div>
                    </td>
                    <td className='prix'>{item.prix} Ar</td>
                    <td>
                      <div className="quantite">
                        <button className="btn" onClick={() => upQuantite(item.ID_panier, 'moins', item.quantite)}>-</button>
                        <div className="nbQuante">{item.quantite}</div>
                        <button className="btn" onClick={() => upQuantite(item.ID_panier, 'plus', item.quantite)}>+</button>
                      </div>
                    </td>
                    <td>{formatDate(item.date_location)}</td>
                    <td>{formatDate(item.date_retour)}</td>
                    <td>{calculateRentalDuration(item.date_location, item.date_retour)} jours</td>
                    <td className='prix' style={{ color: '#F7BA00' }}>
                      {(item.prix * item.quantite * calculateRentalDuration(item.date_location, item.date_retour)).toLocaleString()} Ar
                    </td>
                    <td>
                      <div className='icon' onClick={() => deleteDataDB(item.ID_panier)}><IoTrash /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="panierRight">
          <div className="panierCard">
            <div className="total">
              <h3>Prix total: {calculateTotalPrice(data).toLocaleString()} Ar</h3>
              <button className="btnOrder" onClick={handleOrder}>Passer la commande</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;


