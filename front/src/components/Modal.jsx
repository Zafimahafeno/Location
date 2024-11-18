import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import axios from 'axios';
import { Url } from '../services/Api';
import AlertMessage from './alertMessage';

const typeproduit = [
  { id: 1, title: 'Ordinateur' },
  { id: 2, title: 'Imprimante' },
  { id: 3, title: 'Projecteur' },
  { id: 4, title: 'Scanner' },
  { id: 5, title: 'Photocopieuse' },
  // { id: 7, title: 'telephone' } ,
  // { id: 8, title: 'Projecteur' } ,


];

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  const [nom_produit, setNom] = useState('');
  const [detail, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [marque, setMarque] = useState('');
  const [quantite_stock, setQuantiteStock] = useState('');
  const [ID_type, setIdCategorie] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleClear = () => {
    setNom(''); setDescription('');
    setPrix(''); 
    setMarque(''); setQuantiteStock('');
    setIdCategorie(2); imageFile(null);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };


  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nom_produit', nom_produit);
    formData.append('detail', detail);
    formData.append('Prix', prix);
    formData.append('marque', marque);
    formData.append('quantite_stock', quantite_stock);
    formData.append('ID_type', ID_type);
    formData.append('photo', imageFile);

    try {
      const response = await axios.post(`${Url}produit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlertOpen(true)
      setAlertMsg(response.data.success);
      handleClear();
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données au serveur :', error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='sm'>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      <input type="text" name={nom_produit} value={nom_produit} onChange={text => setNom(text.target.value)} placeholder='Nom' />
      <input type="text" name={marque} value={marque} onChange={text => setMarque(text.target.value)} placeholder='Marque' />
      <input type="text" name={detail} value={detail} onChange={text => setDescription(text.target.value)} placeholder='Description' />
      <select name={ID_type} value={ID_type} onChange={text => setIdCategorie(text.target.value)}>
        {typeproduit.map((item) => <option key={item.id} value={item.id}>{item.title}</option>
        )}
      </select>
      <input type="text" name={quantite_stock} value={quantite_stock} onChange={text => setQuantiteStock(text.target.value)} placeholder='quantite' />
      <input type="text" name={prix} value={prix} onChange={text => setPrix(text.target.value)} placeholder='prix' />
      <input type="file" value={imageFile} onChange={handleFileChange} />
      <button onClick={handleSubmit}>Save</button>
    </Dialog>
  );
}
export default SimpleDialog