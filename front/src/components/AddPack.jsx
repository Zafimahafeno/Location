import React, { useState, useEffect } from 'react';
import { create, getAll } from '../services/Api';
import AlertMessage from './alertMessage';

const AddPack = ({ closepopup, open }) => {
  const [packData, setPackData] = useState({
    Nom_pack: '',
    Description: '',
    Prix_total: '',
    Disponible: true,
    photoPack: '',
    selectedProducts: []  // Array to hold selected products
  });

  const [products, setProducts] = useState([]);  // To store all available products
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // Fetch all products to display in the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getAll('produits');  // Adjust to match your API route
        setProducts(result);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackData({ ...packData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPackData({ ...packData, photoPack: e.target.files[0] });
  };

  const handleProductSelect = (productId) => {
    const isSelected = packData.selectedProducts.includes(productId);
    const updatedProducts = isSelected
      ? packData.selectedProducts.filter((id) => id !== productId)
      : [...packData.selectedProducts, productId];
    setPackData({ ...packData, selectedProducts: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Nom_pack', packData.Nom_pack);
    formData.append('Description', packData.Description);
    formData.append('Prix_total', packData.Prix_total);
    formData.append('Disponible', packData.Disponible ? 1 : 0);
    formData.append('photoPack', packData.photoPack);
    formData.append('selectedProducts', JSON.stringify(packData.selectedProducts));  // Pass selected products

    try {
      const result = await create('packs', formData);
      setAlertMsg(result.success);
      setAlertOpen(true);
      closepopup();
    } catch (error) {
      console.error('Erreur lors de la création du pack', error);
      setAlertMsg('Erreur lors de la création du pack');
      setAlertOpen(true);
    }
  };

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Ajouter un Pack</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du Pack</label>
            <input
              type="text"
              name="Nom_pack"
              value={packData.Nom_pack}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="Description"
              value={packData.Description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Prix Total</label>
            <input
              type="number"
              name="Prix_total"
              value={packData.Prix_total}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Disponible</label>
            <select name="Disponible" value={packData.Disponible} onChange={handleChange}>
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </select>
          </div>
          <div className="form-group">
            <label>Photo du Pack</label>
            <input
              type="file"
              name="photoPack"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Dropdown to select multiple products */}
          <div className="form-group">
            <label>Sélectionner les produits</label>
            <div className="product-list">
              {products.map((product) => (
                <div className="product-item" key={product.ID_produit}>
                  <input
                    type="checkbox"
                    value={product.ID_produit}
                    onChange={() => handleProductSelect(product.ID_produit)}
                    checked={packData.selectedProducts.includes(product.ID_produit)}
                  />
                  <label>{product.Nom_produit}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">Ajouter</button>
            <button type="button" className="btn btn-cancel" onClick={closepopup}>Annuler</button>
          </div>
        </form>
      </div>
      <AlertMessage open={alertOpen} message={alertMsg} onClose={handleCloseAlert} />
    </div>
  );
};

export default AddPack;
