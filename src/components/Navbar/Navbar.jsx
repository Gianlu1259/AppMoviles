import React, { useState, useEffect, useRef } from 'react';
import logo from '../../logos/logo.png';
import cart from '../../logos/cart.png';
import search from '../../logos/search.js';
import delete_icon from '../../logos/delete_icon.svg'
import './Navbar.css';
import { GetCategorys } from '../../Services/Fake_Store.js';
//import Purchase from './Purchase.js';

const Navbar = ({ query, setQuery, handleSearch, handlePurchase }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [categories, setCategories] = useState([])
    const cartRef = useRef();

    useEffect(() => {
        
          GetCategorys().then((res)=>{
            if(res){
                console.log(res)
                setCategories(res);
            }
          });
          
        
      }, []);

    const onClickCart = () => {
        const cart = localStorage.getItem('cart');
        const cartParsed = cart ? JSON.parse(cart) : [];
        setCartItems(cartParsed);
        setShowCart(!showCart);
    }

    const removeProductCart = (id) =>{
        const cart = localStorage.getItem('cart');
        const cartParsed = cart ? JSON.parse(cart) : [];
        const newCart = cartParsed.filter((item) => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
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
            <div id='navbar-content'>
                <div id='content-logo'>
                    <a href='/'>
                        <img src={logo} alt='logo' />
                    </a>
                    <ul id='nav-categories'>
                        <li className='category'>
                            <a href={`/`}>
                                <button>
                                    HOME
                                </button>
                            </a>
                        </li>
                        {
                            categories.map((cat, indx)=>{
                                return <li key={cat} className='category'>
                                            <a href={`/category/${cat}`}>
                                                <button>
                                                    {cat.toUpperCase()}
                                                </button>
                                            </a>
                                        </li>
                            })
                        }
                    </ul>
                </div>
                <div id='menu' ref={cartRef}>
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
                    <img
                        id='cart'
                        src={cart}
                        alt='cart'
                        onClick={onClickCart}
                        style={{ cursor: 'pointer' }}
                    />
                    {showCart && (
                        <div className='cart-popup'>
                            {cartItems.length === 0 ? (
                                <p>Carrito vacío</p>
                            ) : (
                                <>
                                    <ul className='cart-items-list'>
                                        {cartItems.map((item) => (
                                            <li key={item.id} className='cart-item'>
                                                <div id='cart-item-details'>
                                                    <a href={`/product/${item.id}`} className='cart-link'>
                                                        <img src={item.image} alt={item.title} />
                                                        <div className='cart-details'>
                                                            <p className='cart-title'>{item.title}</p>
                                                            <p className='cart-price'>${item.price}</p>
                                                        </div>
                                                    </a>
                                                    <button className='Delete-Button' onClick={()=>removeProductCart(item.id)}>
                                                        <img src={delete_icon} alt="" />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className='Cart-Final'>
                                        <p className='Cart-Total-Price'>Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                                        <button className='Buy-Button' onClick={handlePurchase}>Buy</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>
            <ul id='nav-categories-mobile'>
                    {
                        categories.map((cat, indx)=>{
                            return <li key={cat} className='category'>
                                <a href={`/category/${cat}`}>
                                    <button>
                                        {cat.toUpperCase()}
                                    </button>
                                </a>
                            </li>
                        })
                    }
                </ul>
        </nav>
    );
};

export default Navbar;
