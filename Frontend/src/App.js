import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    // Import des scripts dans componentDidMount()
    this.importScripts();
  }

  importScripts() {
    // Création d'un tableau des chemins des scripts
    const scriptPaths = [
      '../public/js/jquery-1.11.3.min.js',
      '../public/bootstrap/js/bootstrap.min.js',
      '../public/js/jquery.countdown.js',
      '../public/js/jquery.isotope-3.0.6.min.js',
      '../public/js/waypoints.js',
      '../public/js/owl.carousel.min.js',
      '../public/js/jquery.magnific-popup.min.js',
      '../public/js/jquery.meanmenu.min.js',
      '../public/js/sticker.js',
      '../public/js/main.js'
    ];

    // Boucle sur le tableau pour charger chaque script
    scriptPaths.forEach(path => {
      const script = document.createElement('script');
      script.src = path;
      script.async = true;
      document.body.appendChild(script);
    });
  }

  render() {
    return (
      <div>
        {/* Votre contenu JSX */}
      </div>
    );
  }
}

export default App;
