import React, { useEffect } from 'react'
import axios from 'axios';
const logo = require('../img/logo.png');
// const sary = require('../img/a.jpg');

function Accueil() {
 
  useEffect(() => {
    axios.get('http://localhost:4000/produit')
    .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const Header = () => {
    return (
      <div class="top-header-area" id="sticker">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-sm-12 text-center">
              <div class="main-menu-wrap">
                <div class="site-logo">
                  <a href="index.html">
                    <img src={logo} alt="Logo" />
                  </a>
                </div>

                <nav class="main-menu">
                  <ul>
                    <li class="current-list-item"><a href="/">Home</a></li>
                    <li><a href="/categorie">About</a></li>
                    <li><a href="#">Pages</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="shop.html">Shop</a></li>
                    <li>
                      <div class="header-icons">
                        <a class="shopping-cart" href="cart.html"><i class="fas fa-shopping-cart"></i></a>
                        <a class="mobile-hide search-bar-icon" href="#"><i class="fas fa-search"></i></a>
                      </div>
                    </li>
                  </ul>
                </nav>
                <a class="mobile-show search-bar-icon" href="#"><i class="fas fa-search"></i></a>
                <div class="mobile-menu"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Hero = () => {
    return (
      <div class="hero-area hero-bg mb-20">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 offset-lg-2 text-center">
              <div class="hero-text">
                <div class="hero-text-tablecell">
                  <p class="subtitle">Fresh & Organic</p>
                  <h1>Delicious Seasonal Fruits</h1>
                  <div class="hero-btns">
                    <a href="Shop" class="boxed-btn">Fruit Collection</a>
                    <a href="contact.html" class="bordered-btn">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // const Card = () => {
  //   return (
  //     <div className="card shadow mb-5">
  //       <img src={sary} alt="..." style={{ height: 100 }} />
  //       <div className="card-body">
  //         <h5 className="card-title">Card title</h5>
  //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //         <a href="#" className="btn btn-primary">Go somewhere</a>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <Hero />
    </div>
  );
}

export default Accueil
