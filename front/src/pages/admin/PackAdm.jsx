// import React, { useEffect, useState } from 'react';
// import LayoutAdmin from '../../components/LayoutAdmin';
// import CreatePack from '../../components/AddPack';  // Créez ce composant pour gérer l'ajout de packs
// import { Url, deleteDB, update, getAll } from '../../services/Api';
// import { FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaTrashAlt } from 'react-icons/fa';
// import AlertMessage from '../../components/alertMessage';

// const PackAdm = () => {
//   const [packs, setPacks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [packsPerPage] = useState(5);
//   const [search, setSearch] = useState('');

//   // Récupérer les données des packs depuis la base de données
//   const getDataDB = async () => {
//     try {
//       const result = await getAll('packs');
//       setPacks(result);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getDataDB();
//   }, []);

//   const handleNextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     setCurrentPage(currentPage - 1);
//   };

//   // Filtrer les packs en fonction de la recherche
//   const filteredPacks = packs.filter((pack) =>
//     pack.Nom_pack.toLowerCase().includes(search.toLowerCase()) ||
//     pack.Description.toLowerCase().includes(search.toLowerCase()) ||
//     pack.Prix_total.toString().toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLastPack = currentPage * packsPerPage;
//   const indexOfFirstPack = indexOfLastPack - packsPerPage;
//   const currentPacks = filteredPacks.slice(indexOfFirstPack, indexOfLastPack);

//   const [open, openchange] = useState(false);
//   const openDialog = () => {
//     openchange(true);
//   };
//   const closeDialog = () => {
//     openchange(false);
//     getDataDB();
//   };

//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMsg, setAlertMsg] = useState('');
//   const handleCloseAlert = () => {
//     setAlertOpen(false);
//   };

//   // Supprimer un pack
//   const deleteDataDB = async (id) => {
//     await deleteDB(`packs/${id}`)
//       .then((result) => {
//         setAlertMsg(result.success);
//         setAlertOpen(true);
//         getDataDB();
//       }).catch((err) => {
//         console.log(err);
//       });
//   };

//   // Mettre à jour un pack
//   const updateData = async (id, newData) => {
//     await update(`packs/${id}`, newData)
//       .then((result) => {
//         setAlertMsg(result.success);
//         setAlertOpen(true);
//         getDataDB();
//       }).catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <LayoutAdmin search={search} setSearch={setSearch}>
//       <CreatePack closepopup={closeDialog} open={open} />  {/* Composant pour ajouter un pack */}
//       <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
//       {/* <button className="btnRight" onClick={openDialog}>Ajoute Pack</button> */}
      
//       {currentPacks.length > 0 ? (
//         <section className="table__body">
//           <table>
//             <thead>
//               <tr>
//                 <th>Photo</th>
//                 <th>Nom</th>
//                 <th>Description</th>
//                 <th>Prix</th>
//                 <th>Disponibilité</th>
//                 <th>
//                   <button className="btnRight" onClick={openDialog}>Ajoute Pack</button>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentPacks.map((pack) => (
//                 <tr key={pack.ID_pack}>
//                   <td>
//                     <img
//                       src={Url + pack.photoPack}
//                       style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 50,
//                         objectFit: 'cover'
//                       }}
//                       alt="pack"
//                     />
//                   </td>
//                   <td>{pack.Nom_pack}</td>
//                   <td>{pack.Description}</td>
//                   <td>{pack.Prix_total}</td>
//                   <td>{pack.Disponible ? 'Disponible' : 'Indisponible'}</td>
//                   <td>
//                     <FaEdit onClick={() => updateData(pack.ID_pack)} color="blue" style={{ cursor: 'pointer', fontSize: 20 }} />
//                     <FaTrashAlt onClick={() => deleteDataDB(pack.ID_pack)} color="red" style={{ cursor: 'pointer', fontSize: 20, marginLeft: 5 }} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       ) : (
//         <div className="no-packs">Pas de packs disponibles</div>
//       )}
//       <div style={{ textAlign: 'end', padding: 25, fontSize: 25 }}>
//         <FaChevronCircleLeft onClick={handlePrevPage} />
//         <span style={{ marginInline: 5 }}>{currentPage}</span>
//         <FaChevronCircleRight onClick={handleNextPage} />
//       </div>
//     </LayoutAdmin>
//   );
// }

// export default PackAdm;




import React, { useEffect, useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin';
import AddPack from '../../components/AddPack'; // Formulaire d'ajout de Pack
import { FaEdit, FaTrashAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa'; // Icons
import {  deleteDB, getAll, update } from '../../services/Api';
import AlertMessage from '../../components/alertMessage';

const PackAdm = () => {
  const [pack, setPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // Récupération des packs
  const getDataDB = async () => {
    try {
      const result = await getAll('pack');
      setPack(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des packs', error);
    }
  };

  useEffect(() => {
    getDataDB();
  }, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Gestion du changement de statut Actif/Inactif
  const toggleStatus = async (id, status) => {
    try {
      await update(`pack/${id}`, { Disponible: !status });
      setAlertMsg('Statut modifié avec succès');
      setAlertOpen(true);
      getDataDB();
    } catch (error) {
      console.error('Erreur lors de la modification du statut', error);
    }
  };

  // Modifier un pack (ouvrir le formulaire d'édition)
  const handleEdit = (id) => {
    // Logique pour gérer l'édition du pack
    console.log('Modifier pack', id);
  };

  // Supprimer un pack (à éviter selon ton souhait)
  const handleDelete = async (id) => {
    try {
      await deleteDB(`pack/${id}`);
      setAlertMsg('Pack supprimé');
      setAlertOpen(true);
      getDataDB();
    } catch (error) {
      console.error('Erreur lors de la suppression du pack', error);
    }
  };

  return (
    <LayoutAdmin>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      <div className="header-actions">
        <button className="btn-add-pack" onClick={() => setOpen(true)}>
          + Ajouter un Pack
        </button>
      </div>
      <AddPack open={open} closepopup={() => setOpen(false)} /> {/* Formulaire d'ajout */}

      <section className="table__body">
        <table>
          <thead>
            <tr>
              {/* <th>Photo</th> */}
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pack.length > 0 ? (
              pack.map((pack) => (
                <tr key={pack.ID_pack}>
                  {/* <td>
                    <img src={`${Url}${pack.photoPack}`} alt={pack.Nom_pack} className="pack-photo" />
                  </td> */}
                  <td>{pack.Nom_pack}</td>
                  <td>{pack.Description}</td>
                  <td>{pack.Prix_total} Ar</td>
                  <td>
                    {pack.Disponible ? (
                      <FaToggleOn
                        onClick={() => toggleStatus(pack.ID_pack, pack.Disponible)}
                        className="icon-toggle"
                      />
                    ) : (
                      <FaToggleOff
                        onClick={() => toggleStatus(pack.ID_pack, pack.Disponible)}
                        className="icon-toggle"
                      />
                    )}
                  </td>
                  <td>
                    <FaEdit className="icon-edit" onClick={() => handleEdit(pack.ID_pack)} />
                    <FaTrashAlt className="icon-delete" onClick={() => handleDelete(pack.ID_pack)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-packs">Aucun pack disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </LayoutAdmin>
  );
};

export default PackAdm;

