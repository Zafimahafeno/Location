import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import './css/header.css';
import './css/shop.css';
import './css/panier.css';
import './css/layout.css';
import './css/login.css';
import './css/table.css';
import "./css/modal.css";
import "./css/pack.css";
import "./css/dashboard.css";
import "./css/addPack.css";
import "./css/headerAdmin.css";





import App from './App';

const queryClient = new QueryClient(); 

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

