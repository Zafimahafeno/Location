import React, { useEffect, useState } from 'react'
import { create, getAll } from '../services/Api';
import AlertMessage from './alertMessage';

const AddProduit = ({onClose}) => {
    const [produit, setProduit] = useState([]);
    const [quantite, setQantite] = useState(null);
    const [id_produit, setIdProduit] = useState(null);

    const getDataDB = async () => {
        await getAll('produit')
            .then((result) => {
                setProduit(result);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getDataDB()
    }, [])
    const handleClick = () => {
        create('entree', { quantite_entree: quantite, id_produit: id_produit })
            .then(async (result) => {
                onClose();
                handleClear();
                setAlertMsg(result.success);
                setAlertOpen(true)
                setQantite('')
            }).catch((err) => {
                console.log(err);
            });
    }
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    const handleClear = () => {
        setQantite(null);
        setIdProduit(null);
    }
    return (
        <div className="formInput">
            <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
            <select name={id_produit} value={id_produit} onChange={t => setIdProduit(t.target.value)}>
                <option value={null} disabled>Selecter produit</option>
                {produit.map(item => (<option key={item.ID_produit} value={item.ID_produit}>{item.Nom_produit}</option>))}
            </select>
            <input type="text" placeholder='Quantite entree ...' onChange={t => setQantite(t.target.value)} name={quantite} value={quantite} />
            <button style={{ marginLeft: 10 }} onClick={handleClick}>Ajouter</button>
        </div>
    )
}

export default AddProduit;
