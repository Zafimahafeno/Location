import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/LayoutAdmin'
import { FaCarSide, FaCheckCircle, FaChevronCircleLeft, FaChevronCircleRight, FaEye, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import { deleteDB, getAll, update } from '../../services/Api';
import AlertMessage from '../../components/alertMessage';

const CommandeAdm = () => {
  const [produits, setProduits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const getDataDB = async () => {
    try {
      const result = await getAll('commande');
      setProduits(result);
    } catch (error) {
      console.error(error);
    }
  }

  const livrer = async (id) => {
    try {
      const result = await update(`livrer/${id}`, { Etat_commande: 'Delivered' });
      setAlertMsg(result.success);
      setAlertOpen(true);
      getDataDB();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataDB();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filteredProducts = produits.filter((produit) =>
    produit.Nom.toLowerCase().includes(search.toLowerCase()) ||
    produit.Prenom.toLowerCase().includes(search.toLowerCase()) ||
    produit.Adresse_livraison.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  const deleteDataDB = async (id) => {
    await deleteDB(`commande/${id}`)
      .then((result) => {
        setAlertMsg(result.success);
        setAlertOpen(true);
        getDataDB();
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <LayoutAdmin search={search} setSearch={setSearch}>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      {currentProducts.length > 0 ? <section class="table__body">
        <table>
          <thead>
            <tr>
              <th>Nom client</th>
              <th>Adress delivre</th>
              <th>Total quantite</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {currentProducts.map((produit) => (
              <tr key={produit.id_sortie}>
                <td>{produit.Nom + ' ' + produit.Prenom}</td>
                <td>{produit.Adresse_livraison}</td>
                <td>{produit.Total}</td>
                <td>{moment(produit.Date_commande).format('DD-MM-YYYY HH:mm')}</td>
                <td>{produit.Etat_commande}</td>
                <td>
                  <FaEye color='blue' style={{ cursor: 'pointer', fontSize: 20 }} />
                  <FaTrashAlt onClick={() => deleteDataDB(produit.ID_commande)} color='red' style={{ cursor: 'pointer', fontSize: 20, marginInline: 5 }} />
                  {produit.Etat_commande === 'Loading' ? <FaCarSide color='#555' onClick={() => livrer(produit.ID_commande)} style={{ cursor: 'pointer', fontSize: 20 }} />
                    : <FaCheckCircle color='green' style={{ cursor: 'pointer', fontSize: 20 }} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> : (
        <div className="no-products">Pas de commande enregistre</div>
      )}

<div style={{textAlign:'end', padding:25, fontSize:25}}>
        <FaChevronCircleLeft onClick={handlePrevPage} />
        <span style={{marginInline:5}}>{currentPage}</span>
        <FaChevronCircleRight onClick={handleNextPage} />
      </div>
    </LayoutAdmin>
  )
}

export default CommandeAdm
