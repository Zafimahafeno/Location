import { Dialog, DialogTitle, IconButton, } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close"
import { useState } from "react";
import { MdClose } from "react-icons/md";
import AlertMessage from "./alertMessage";
import axios from "axios";
import { Url } from "../services/Api";

const categories = [
  { id: 2, title: 'ordinateur' },
  { id: 3, title: 'souris' },
  { id: 4, title: 'clavier' },
  { id: 5, title: 'camera' },
  { id: 6, title: 'telephone' }
];

const CreateProduit = ({
  closepopup = () => { }, open
}) => {
  const [Nom_produit, setNom] = useState('');
  const [Description, setDescription] = useState('');
  const [Prix, setPrix] = useState('');
  const [Marque, setMarque] = useState('');
  const [Quantite_stock, setQuantiteStock] = useState('');
  // const [Modele, setModele] = useState('');
  const [id_categorie, setIdCategorie] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleClear = () => {
    setNom(''); setDescription('');
    // setPrix(''); setModele('');
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
    formData.append('Nom_produit', Nom_produit);
    formData.append('Detail', Description);
    formData.append('Prix', Prix);
    // formData.append('Modele', Modele);
    formData.append('Marque', Marque);
    formData.append('Quantite_stock', Quantite_stock);
    formData.append('id_categorie', id_categorie);
    formData.append('photo', imageFile);

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
          <input type="text" name={Nom_produit} value={Nom_produit} onChange={text => setNom(text.target.value)} placeholder='Nom' />
          <input type="text" name={Marque} value={Marque} onChange={text => setMarque(text.target.value)} placeholder='marque' />
          {/* <input type="text" name={Modele} value={Modele} onChange={text => setModele(text.target.value)} placeholder='model' /> */}
          <input type="text" name={Description} value={Description} onChange={text => setDescription(text.target.value)} placeholder='Desc' />
          <select name={id_categorie} value={id_categorie} onChange={text => setIdCategorie(text.target.value)}>
            {categories.map((item) => <option key={item.id} value={item.id}>{item.title}</option>
            )}
          </select>
          <input type="text" name={Quantite_stock} value={Quantite_stock} onChange={text => setQuantiteStock(text.target.value)} placeholder='quantite' />
          <input type="text" name={Prix} value={Prix} onChange={text => setPrix(text.target.value)} placeholder='prix' />
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file" />
          <label htmlFor="file" className="inputImg">Select image</label>
        <button onClick={handleSubmit} style={{ width: 350 }}>Save</button>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateProduit;