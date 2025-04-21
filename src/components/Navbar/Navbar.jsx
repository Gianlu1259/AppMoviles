import React from 'react'
import logo from '../../logos/logo.png'
import cart from '../../logos/cart.png'
import search from '../../logos/search.js'

const Navbar = ({ query, setQuery, handleSearch }) => {
    return (
        <nav id='navbar'>
            <a href='/'>
                <img src={logo} alt='logo'/>
            </a>
            <div id='search'>
                <input placeholder='Buscar' type='text' id='Search-Input'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                <button onClick={handleSearch}>
                    {search}
                </button>
            </div>
            <div id='menu'>
                <img src={cart} alt='cart'/>
                <a href='/'>Inicio</a>
            </div>
        </nav>
    )
}

export default Navbar;