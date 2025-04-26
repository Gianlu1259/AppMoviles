import React from 'react'
import logo from '../../logos/logo.png'
import cart from '../../logos/cart.png'
import search from '../../logos/search.js'
import styles from './Navbar.module.css'

const Navbar = ({ query, setQuery, handleSearch }) => {
    return (
        <nav className={styles['navbar']}>
            <a href='/'>
                <img src={logo} />
            </a>
            <div className={styles['search']}>
                <input placeholder='Buscar' type='text' id='Search-Input' className={styles['Search-Input']}
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
            <div className={styles['menu']}>
                <img src={cart} />
                <a href='/'>Inicio</a>
            </div>
        </nav>
    )
}

export default Navbar;