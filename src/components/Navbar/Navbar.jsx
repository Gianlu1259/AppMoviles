import React, { useState, useEffect, useRef } from 'react';
import logo from '../../logos/logo.png';
import cart from '../../logos/cart.png';
import search from '../../logos/search.js';
import './Navbar.css';

const Navbar = ({ query, setQuery, handleSearch }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const cartRef = useRef();

    const onClickCart = () => {
        const cart = localStorage.getItem('cart');
        const cartParsed = cart ? JSON.parse(cart) : [];
        setCartItems(cartParsed);
        setShowCart(!showCart);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setShowCart(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav id='navbar'>
            <a href='/'>
                <img src={logo} alt='logo' />
            </a>
            <div id='search'>
                <input
                    placeholder='Buscar'
                    type='text'
                    id='Search-Input'
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
            <div id='menu' ref={cartRef}>
                <img
                    id='cart'
                    src={cart}
                    alt='cart'
                    onClick={onClickCart}
                    style={{ cursor: 'pointer' }}
                />
                <a href='/'>Inicio</a>

                {showCart && (
                    <div className='cart-popup'>
                        {cartItems.length === 0 ? (
                            <p>Carrito vacío</p>
                        ) : (
                            <>
                                <ul className='cart-items-list'>
                                    {cartItems.map((item) => (
                                        <li key={item.id} className='cart-item'>
                                        <a href={`/product/${item.id}`} className='cart-link'>
                                            <img src={item.image} alt={item.title} />
                                            <div className='cart-details'>
                                            <p className='cart-title'>{item.title}</p>
                                            <p className='cart-price'>${item.price}</p>
                                            </div>
                                        </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className='cart-total'>
                                    Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                                </div>
                            </>
                        )}
                    </div>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
