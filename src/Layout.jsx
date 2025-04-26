import React, { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'

const Layout = ({children}) => {
  
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/${encodeURIComponent(query.trim())}`);
    }
  };

  const Footer = () => {
    return (
      <footer id='footer'>
        <div id='footer-links'>
          <a href='/about'>Sobre nosotros</a>
          <a href='/contact'>Contacto</a>
        </div>
      </footer>
    )
  }

  
  return (
    <div>
        <Navbar 
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
        <main id='container'>
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout