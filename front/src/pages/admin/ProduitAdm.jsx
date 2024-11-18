import React, { useEffect, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import CreateProduit from '../../components/CreateProduit';
import { Url, deleteDB, update, getAll } from '../../services/Api';
import { FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
import AlertMessage from '../../components/alertMessage';

const ProduitAdm = () => {
  const [produit, setProduit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const getDataDB = async () => {
    try {
      const result = await getAll('produit'); 
      setProduit(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataDB();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filteredProducts = produit.filter((produit) =>
    produit.nom_produit.toLowerCase().includes(search.toLowerCase()) ||
    produit.marque.toLowerCase().includes(search.toLowerCase()) ||
    produit.nom_type.toLowerCase().includes(search.toLowerCase()) ||
    produit.detail.toLowerCase().includes(search.toLowerCase())||
    produit.prix.toLowerCase().includes(search.toLowerCase())


  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  const [open, openChange] = useState(false);
  const openDialog = () => openChange(true);
  const closeDialog = () => {
    openChange(false);
    getDataDB();
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const deleteDataDB = async (id) => {
    await deleteDB(`produit/${id}`)
      .then((result) => {
        setAlertMsg(result.success);
        setAlertOpen(true);
        getDataDB();
      }).catch((err) => {
        console.log(err);
      });
  };

  const updateData = async (id, newData) => {
    await update(`produit/${id}`, newData)
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
      <CreateProduit closepopup={closeDialog} open={open} />
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      {currentProducts.length > 0 ? (
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Marque</th>
                <th>Categorie</th>
                <th>Detail</th>
                <th>Prix</th> 
                <th>Quantite</th>
                <th>
                  <button className='btnRight' onClick={openDialog}>Ajoute</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((produit) => (
                <tr key={produit.ID_produit}>
                  <td>
                    <img src={Url + produit.photoProduit} style={{
                      width: 40, height: 40,
                      borderRadius: 50,
                      objectFit: 'cover'
                    }} alt="sary" />
                  </td>
                  <td>{produit.nom_produit}</td>
                  <td>{produit.marque}</td>
                  <td>{produit.nom_type}</td>
                  <td>{produit.detail}</td>
                  <td>{produit.prix}</td>
                  <td>{produit.quantite_stock}</td>
                  <td>
                    <FaEdit onClick={() => updateData(produit.ID_produit)} color='blue' style={{ cursor: 'pointer', fontSize: 20 }} />
                    <FaTrashAlt onClick={() => deleteDataDB(produit.ID_produit)} color='red' style={{ cursor: 'pointer', fontSize: 20, marginLeft: 5 }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="no-products">Pas de produit valable</div>
      )}
      <div style={{ textAlign: 'end', padding: 25, fontSize: 25 }}>
        <FaChevronCircleLeft onClick={handlePrevPage} />
        <span style={{ marginInline: 5 }}>{currentPage}</span>
        <FaChevronCircleRight onClick={handleNextPage} />
      </div>
    </LayoutAdmin>
  );
};

export default ProduitAdm;
