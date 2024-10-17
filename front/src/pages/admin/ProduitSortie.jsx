import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/LayoutAdmin'
import { FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import { Url, deleteDB, getAll } from '../../services/Api';
import AlertMessage from '../../components/alertMessage';

const ProduitSortie = () => {
  const [produits, setProduits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const getDataDB = async () => {
    try {
      const result = await getAll('sortie');
      setProduits(result);
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
    produit.Nom_produit.toLowerCase().includes(search.toLowerCase())
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
    await deleteDB(`sortie/${id}`)
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
              <th>Photo</th>
              <th>Nom</th>
              <th>Quantite</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {currentProducts.map((produit) => (
              <tr key={produit.id_sortie}>
                <td>
                  <img src={Url + produit.photoProduit} style={{
                    width: 40, height: 40,
                    borderRadius: 50,
                    objectFit: 'cover'
                  }} alt="sary" />
                </td>
                <td>{produit.Nom_produit}</td>
                <td>{produit.quantite_sortie}</td>
                <td>{moment(produit.date_sortie).format('DD-MM-YYYY HH:mm')}</td>
                <td>
                  <FaEdit color='blue' style={{ cursor: 'pointer', fontSize: 20 }} />
                  <FaTrashAlt onClick={() => deleteDataDB(produit.id_sortie)} color='red' style={{ cursor: 'pointer', fontSize: 20, marginLeft: 5 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> : (
        <div className="no-products">Pas de produit enregistre</div>
      )}
      
      <div style={{textAlign:'end', padding:25, fontSize:25}}>
        <FaChevronCircleLeft onClick={handlePrevPage} />
        <span style={{marginInline:5}}>{currentPage}</span>
        <FaChevronCircleRight onClick={handleNextPage} />
      </div>
    </LayoutAdmin>
  )
}

export default ProduitSortie
