import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

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

  return (
    <div className="home-container">
      {categories.map((cat) => (
        <div key={cat} className="category-block">
          <h2 className="category-title">{cat.toUpperCase()}</h2>
          <div className="products-grid">
            {products
              .filter((prod) => prod.category === cat)
              .map((prod) => (
                <Link to={`/product/${prod.id}`} className="product-card">
                    <img src={prod.image} alt={prod.title} className="product-image" />
                    <div className="product-info">
                      <h3>{prod.title}</h3>
                      <p className="price">${prod.price}</p>
                      <p className="rating">⭐ {prod.rating.rate} ({prod.rating.count})</p>
                    </div>
                  </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
