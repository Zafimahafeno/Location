// exports.Url = 'http://localhost:4000/';
// const CryptoJS = require('crypto-js');
// const Url = 'http://localhost:4000/';

// exports.getAll = async (route) => {
//   try {
//     const response = await fetch(`${Url+route}`);
//     if (!response.ok) {
//       throw new Error('Erreur lors de la récupération des données');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Erreur getAll:', error);
//     throw error;
//   }
// };

// exports.create = async (route, newData) => {
//   try {
//     const response = await fetch(`${Url+route}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newData),
//     });
//     if (!response.ok) {
//       throw new Error('Erreur lors de la création des données');
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Erreur create:', error);
//     throw error;
//   }
// };

// exports.deleteDB = async (route) => {
//   try {
//     const response = await fetch(`${Url+route}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Erreur lors de la suppression des données');
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Erreur delete:', error);
//     throw error;
//   }
// };

// exports.update = async (route, updatedData) => {
//   try {
//     const response = await fetch(`${Url+route}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });
//     if (!response.ok) {
//       throw new Error('Erreur lors de la mise à jour des données');
//     }
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     console.error('Erreur update:', error);
//     throw error;
//   }
// };

// const secretKey = "8572c14c4e1a07758759c66fd3d40a304ffd47ce8682c5cbc8857ea172edd803";

// exports.handleEncrypt = (data) => {
//   const jsonData = JSON.stringify(data);
//   const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
//   return encrypted;
// };

// exports.handleDecrypt = (datacrypted) => {
//   const bytes = CryptoJS.AES.decrypt(datacrypted, secretKey);
//   const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
//   const decrypted = JSON.parse(decryptedJson);
//   return decrypted;
// };

// exports.getUserConnect = async () => {
//   let user = localStorage.getItem('user');
//   if (user) {
//       user = JSON.parse(user);
//       user = this.handleDecrypt(user);
//       return user;
//   } else {
//       return null;
//   }
// };


const CryptoJS = require('crypto-js');
const Url = 'http://localhost:4000/';

const secretKey = "8572c14c4e1a07758759c66fd3d40a304ffd47ce8682c5cbc8857ea172edd803";

// Fonction pour récupérer toutes les données d'une route donnée
const getAll = async (route) => {
  try {
    const response = await fetch(`${Url+route}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur getAll:', error);
    throw error;
  }
};

// Fonction pour créer une nouvelle entrée dans une route donnée
const create = async (route, newData) => {
  try {
    const response = await fetch(`${Url+route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création des données');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Erreur create:', error);
    throw error;
  }
};

// Fonction pour supprimer une entrée
const deleteDB = async (route) => {
  try {
    const response = await fetch(`${Url+route}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression des données');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Erreur delete:', error);
    throw error;
  }
};

// Fonction pour mettre à jour une entrée
const update = async (route, updatedData) => {
  try {
    const response = await fetch(`${Url+route}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour des données');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Erreur update:', error);
    throw error;
  }
};

// Fonction pour chiffrer des données
const handleEncrypt = (data) => {
  const jsonData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
  return encrypted;
};

// Fonction pour déchiffrer des données
const handleDecrypt = (datacrypted) => {
  const bytes = CryptoJS.AES.decrypt(datacrypted, secretKey);
  const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
  const decrypted = JSON.parse(decryptedJson);
  return decrypted;
};

// Fonction pour récupérer l'utilisateur connecté
const getUserConnect = async () => {
  let user = localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
    user = handleDecrypt(user);
    return user;
  } else {
    return null;
  }
};




// Regroupement de tous les exports à la fin du fichier
module.exports = {
  Url,
  getAll,
  create,
  deleteDB,
  update,
  handleEncrypt,
  handleDecrypt,
  getUserConnect
};
