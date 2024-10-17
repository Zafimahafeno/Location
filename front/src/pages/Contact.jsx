import React from 'react';
import '../css/contact.css'
import Header from '../components/Header';




function contact() {
  
  return (
  
    <div className='content'>
     {/* Ajout du Header ici */}
      <Header />
    <div className="contact-page">
      <h1>Contact us</h1>
      <div className="contact-info">
        <div className="contact-detail">
          <h2>Email:</h2>
          <p>contact@majestic.com</p>
        </div>
        <div className="contact-detail">
          <h2>Phone:</h2>
          <p>+1 (261) 345-6789</p>
        </div>
        <div className="contact-detail">
          <h2>Address:</h2>
          <p>123 rue des pièces, Ville, USA</p>
          
        </div>
      </div>
    </div>
    </div>
    
    
  );
  
}

export default contact;
