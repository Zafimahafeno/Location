import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/LayoutAdmin'
import { deleteDB, getAll } from '../../services/Api';
import { FaChevronCircleLeft, FaChevronCircleRight, FaTrashAlt } from 'react-icons/fa';
import AlertMessage from '../../components/alertMessage';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const getDataDB = async () => {
    try {
      const result = await getAll('utilisateur');
      setClients(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const deleteDataDB = async (id) => {
    await deleteDB(`utilisateur/${id}`)
    .then((result) => {
      setAlertMsg(result.success);
      setAlertOpen(true);
      getDataDB();
    }).catch((err) => {
      console.log(err);
    });
  };
  const filteredProducts = clients.filter((client) =>
    client.Nom.toLowerCase().includes(search.toLowerCase()) ||
    client.Prenom.toLowerCase().includes(search.toLowerCase()) ||
    client.Adresse_email.toLowerCase().includes(search.toLowerCase()) ||
    client.Adresse_livraison.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    getDataDB();
  }, []);
  return (
    <LayoutAdmin search={search} setSearch={setSearch}>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      {currentProducts.length > 0 ? <section class="table__body">
        <table>
          <thead>
            <tr>
              <th>Nom et prenom</th>
              <th>Adresse email</th>
              <th>Adresse livraison</th>
              <th>Numero Tel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((client) => (
              <tr key={client.ID_utilisateur}>
                <td>{client.Nom + ' ' + client.Prenom}</td>
                <td>{client.Adresse_email}</td>
                <td>{client.Adresse_livraison}</td>
                <td>{client.phone}</td>
                <td>
                  {/* <FaEdit />*/}
                  <FaTrashAlt onClick={()=>deleteDataDB(client.ID_utilisateur)} color='red' style={{cursor:'pointer', fontSize:20, marginLeft:5}}  />
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </section> : (
        <div className="no-products">Pas de client enregistre</div>
      )}
      <div style={{textAlign:'end', padding:25, fontSize:25}}>
        <FaChevronCircleLeft onClick={handlePrevPage} />
        <span style={{marginInline:5}}>{currentPage}</span>
        <FaChevronCircleRight onClick={handleNextPage} />
      </div>
    </LayoutAdmin>
  )
}

export default Clients
