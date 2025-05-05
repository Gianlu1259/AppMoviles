import React, { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Purchase from './components/Navbar/Purchase';
import AlertPurchase from './components/AlertPurchase/AlertPurchase';

const Layout = ({ children }) => {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

    const handlePurchase = () => {
        Purchase(() => setShowPopup(true));
    };

    const handleClosePopup = () => {
        localStorage.removeItem('cart');
        setShowPopup(false);
        window.location.reload();
    };

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div>
      <Navbar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handlePurchase={handlePurchase}
      />
      {showPopup && <AlertPurchase onClose={handleClosePopup} />}
      <main id='container'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout