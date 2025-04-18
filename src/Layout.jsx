import React from 'react'
import './App.css'
import logo from './logos/logo.png'
import cart from './logos/cart.png'
import search from './logos/search.js'

const Layout = ({children}) => {

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

  const NavBar = () => {
    return (
      <nav id='navbar'>
        <a href='/'>
          <img src={logo}/>
        </a>
        <div id='search'>
          <input placeholder='Buscar' type='text'/>
          <button>
            {search}
          </button>
        </div>
        <div id='menu'>
          <img src={cart}/>
          <a href='/'>Inicio</a>
        </div>
      </nav>
    )
  }
  return (
    <div>
        <NavBar/>
        <main id='container'>
          {children}
        </main>
        <Footer/>
    </div>
  )
}

export default Layout