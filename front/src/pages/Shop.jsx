import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { create, getAll, getUserConnect } from '../services/Api';
import { v4 as uuidv4 } from 'uuid';
import AlertMessage from '../components/alertMessage';
import { useLocation } from 'react-router-dom';

function Shop() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [user, setUser] = useState(null);
  const [sessionID, setSessionID] = useState(''); // Pour gérer les utilisateurs non connectés
  const [dateLocation, setDateLocation] = useState({});
  const [dateRetour, setDateRetour] = useState({});
  const location = useLocation();
  

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserConnect();
      setUser(userData);

      if (!userData) {
        const storedSessionID = localStorage.getItem('session_id');
        if (!storedSessionID) {
          const newSessionID = uuidv4();
          localStorage.setItem('session_id', newSessionID);
          setSessionID(newSessionID);
        } else {
          setSessionID(storedSessionID);
        }
      }
    };

    fetchUser();
    getDataDB();
  }, [location.search]);

  const getDataDB = async () => {
    const data = await getAll('produit'); // Récupération de tous les produits
    setData(data);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const setPanierDB = async (id) => {
    const panierData = {
      ID_produit: id,
      Quantite: counts[id] || 1,
      Date_ajout: new Date(),
      date_location: dateLocation[id] || null,  // Date de début de location
      date_retour: dateRetour[id] || null,
    };

    if (user) {
      // Utilisateur connecté
      panierData.ID_utilisateur = user.idUser;
      await create('panier', panierData);
    } else {
      // Utilisateur non connecté - panier temporaire
      panierData.session_id = sessionID;
      await create('panier_temporaire', panierData);
    }

    setAlertMsg('Produit ajouté au panier');
    setAlertOpen(true);
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
    (item.Marque.toLowerCase().includes(search.toLowerCase()) ||
      item.Nom_produit.toLowerCase().includes(search.toLowerCase()) ||
      item.Detail.toLowerCase().includes(search.toLowerCase()) ||
      item.Prix.toString().toLowerCase().includes(search.toLowerCase()))
  ));

  return (
    <div className='content'>
      <div className='headers'>
        <Header searchInput search={search} setSearch={setSearch} />
      </div>

      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />

      <div className='row'>
        {filteredData.length > 0 ? filteredData.map(item => (
          <div key={item.ID_produit} className='card'>
            <img src={`http://localhost:4000/${item.photoProduit}`} alt="produit" />
            <div className='marque'>{item.Marque}</div>
            <div className='contain'>
              <div className='nom'>{item.Nom_produit}</div>
              <div className='detail'>{item.Detail}</div>
              <div className="footer">
                <div className='prix'>{item.Prix} Ar</div>
                <div className="quantite">
                  <div className="btn" onClick={() => handleIncrement(item.ID_produit, 'moins')}>-</div>
                  <div className="nbQuante">{counts[item.ID_produit] || 1}</div>
                  <div className="btn" onClick={() => handleIncrement(item.ID_produit, 'plus')}>+</div>
                  
                </div>
                <div className='dates'>
                  <label>Date de location: </label>
                  <input type="date" onChange={(e) => handleDateLocationChange(item.ID_produit, e.target.value)} />
                  <label>Date de retour: </label>
                  <input type="date" onChange={(e) => handleDateRetourChange(item.ID_produit, e.target.value)} />
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
