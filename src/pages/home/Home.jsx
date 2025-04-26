import React, { useEffect, useState } from 'react'
import './Home.css'

import Product_Card from '../../components/Product Card/Product_Card.jsx'
import { GetRecords } from '../../Services/Records'
import { GetProductById } from '../../Services/Fake_Store'
import { Link } from 'react-router-dom'

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
        const products = await Promise.all(recordedIds.map(id => GetProductById(id))); // Trae los productos
        setRecords(products);
      } catch (err) {
        console.error('Error al obtener productos del historial:', err);
      }
    };
  
    fetchRecords();
  }, []);

  return (
    <div className="home-container">
      <div className="category-block">
        <h2 className="category-title">Previously visited</h2>
        <div className="products-grid">
          {records
            .map((prod) => (
              <Product_Card key={prod.id} product={prod}></Product_Card>
            ))}
        </div>
      </div>
      {categories.map((cat) => (
        <div key={cat} className="category-block">
          <h2 className="category-title">{cat.toUpperCase()}</h2>
          <div className="products-grid">
            {products
              .filter((prod) => prod.category === cat)
              .map((prod) => (
                <Product_Card key={prod.id} product={prod}></Product_Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
