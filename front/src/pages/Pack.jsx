import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAll, create, getUserConnect } from '../services/Api';
import AlertMessage from '../components/alertMessage';

function Pack() {
  const [pack, setPack] = useState([]);
  const [user, setUser] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    getDataPack();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userData = await getUserConnect();
    setUser(userData);
  };

  const getDataPack = async () => {
    const data = await getAll('pack');
    setPack(data);
  };

  const setPanierDB = async (id) => {
    if (!user) {
      setAlertMsg('Vous devez être connecté pour ajouter au panier');
      setAlertOpen(true);
      return;
    }

    await create('panier', {
      ID_utilisateur: user.idUser,
      ID_pack: id, // Indique qu'il s'agit d'un pack
      Quantite: 1,
      Date_ajout: new Date(),
      date_location: new Date(), // Exemple de gestion de la date de location
      date_retour: new Date(new Date().setDate(new Date().getDate() + 7)) // 7 jours de location
    })
      .then((result) => {
        setAlertMsg(result.success);
        setAlertOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div className="content">
      <Header />
      <div className="packs-container">
        <h2 className="packs-title">Nos Packs</h2>
        <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />

        <div className="packs-grid">
          {pack.length > 0 ? (
            pack.map((pack) => (
              <div key={pack.ID_pack} className="pack-card">
                <img src={`http://localhost:4000/${pack.photoPack}`} alt={pack.Nom_pack} className="pack-image" />
                <div className="pack-info">
                  <h3 className="pack-name">{pack.Nom_pack}</h3>
                  <p className="pack-description">{pack.Description}</p>
                  <div className="pack-footer">
                    <div className="pack-price">{pack.Prix_total} Ar</div>
                    <button className="pack-btn" onClick={() => setPanierDB(pack.ID_pack)}>
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-packs">Aucun pack disponible</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pack;
