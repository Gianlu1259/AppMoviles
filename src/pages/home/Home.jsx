import React, { useEffect, useState } from 'react'
import './Home.css'
import arrow_forward from '../../logos/arrow_forward.svg'
import ProductCard from '../../components/Product Card/ProductCard.jsx'
import { GetRecords } from '../../Services/Records'
import { GetProductById } from '../../Services/Fake_Store'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (err) {
        console.error('Error al obtener categorías:', err)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (err) {
        console.error('Error al obtener productos:', err)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordedIds = await GetRecords();
        const products = await Promise.all(recordedIds.map(id => GetProductById(id)));
        setRecords(products);
      } catch (err) {
        console.error('Error al obtener productos del historial:', err);
      }
    };
  
    fetchRecords();
  }, []);

  return (
    <div className='Home'>
      <aside className='Aside'>
        <img alt='products' src='https://http2.mlstatic.com/D_NQ_616031-MLA83858933470_042025-OO.webp'/>
      </aside>
      <div className="home-container">
        <div className="category-block">
          <h2 className="category-title">PREVIOUSLY VISITED</h2>
          <div className="products-grid">
            {records
              .map((prod) => (
                <ProductCard key={prod.id} product={prod}></ProductCard>
              ))}
          </div>
        </div>
        {categories.map((cat) => (
          <div key={cat} className="category-block">
            <div className='title-category'>
              <h2 className="category-title">{cat.toUpperCase()}</h2>
              <button onClick={() => window.location.href = `/category/${cat}`} className="See-More">
                <a>See more</a>
                <img className="More-Arrow" src={arrow_forward} alt="" />
              </button>
            </div>
            <div className="products-grid">
              {products
                .filter((prod) => prod.category === cat)
                .map((prod) => (
                  <ProductCard key={prod.id} product={prod}></ProductCard>
                ))}
            </div>
          </div>
        ))}
      </div>
      <aside className='Aside'>
        <img alt='products' src='https://http2.mlstatic.com/D_NQ_797982-MLA83858942922_042025-OO.webp'/>
      </aside>
    </div>
  )
}

export default Home
