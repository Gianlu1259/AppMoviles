import React, { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

const Layout = ({children}) => {
  
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
        />
        <main id='container'>
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout