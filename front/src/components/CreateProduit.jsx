import { Dialog, DialogTitle, IconButton, } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react";
import { MdClose } from "react-icons/md";
import AlertMessage from "./alertMessage";
import axios from "axios";
import { Url } from "../services/Api";


const typeproduit = [
  { id: 1, title: 'Ordinateur' },
  { id: 2, title: 'Imprimante' },
  { id: 3, title: 'Projecteur' },
  { id: 4, title: 'Scanner' },
  { id: 5, title: 'Photocopieuse' }
];

const CreateProduit = ({
  closepopup = () => { }, open
}) => {
  const [nom_produit, setNom] = useState('');
  const [detail, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [marque, setMarque] = useState('');
  const [quantite_stock, setQuantiteStock] = useState('');
  const [ID_type, setIdTypeproduit] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleClear = () => {
    setNom(''); setDescription('');
    setMarque(''); setQuantiteStock('');
    setIdTypeproduit(1); imageFile(null);
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
    formData.append('nom_produit',nom_produit);
    formData.append('detail',detail);
    formData.append('prix',prix);
    formData.append('marque',marque);
    formData.append('quantite_stock',quantite_stock);
    formData.append('ID_type',ID_type);
    formData.append('photoProduit',imageFile);

    try {
      const response = await axios.post(`${Url}produit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      closepopup();
      setAlertOpen(true)
      setAlertMsg(response.data.success);
      handleClear();
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données au serveur :', error);
    }
  };

  return (
    <div className='add' style={{ textAlign: 'center' }}>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
      <Dialog
        open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>User Registeration  <IconButton onClick={closepopup} style={{ float: 'right' }}><MdClose color="primary"></MdClose></IconButton>  </DialogTitle>
        <div className="dialogueContent formInput">
          <input type="text" name={nom_produit} value={nom_produit} onChange={text => setNom(text.target.value)} placeholder='Nom' />
          <input type="text" name={marque} value={marque} onChange={text => setMarque(text.target.value)} placeholder='marque' />
          <input type="text" name={detail} value={detail} onChange={text => setDescription(text.target.value)} placeholder='Desc' />
          <select name={ID_type} value={ID_type} onChange={text => setIdTypeproduit(text.target.value)}>
            {typeproduit.map((item) => <option key={item.id} value={item.id}>{item.title}</option>
            )}
          </select>
          <input type="text" name={quantite_stock} value={quantite_stock} onChange={text => setQuantiteStock(text.target.value)} placeholder='quantite' />
          <input type="text" name={prix} value={prix} onChange={text => setPrix(text.target.value)} placeholder='prix' />
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file" />
          <label htmlFor="file" className="inputImg">Select image</label>
        <button onClick={handleSubmit} style={{ width: 350 }}>Save</button>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateProduit;