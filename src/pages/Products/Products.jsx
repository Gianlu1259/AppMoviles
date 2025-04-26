import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FilterByName } from '../../components/Navbar/Search';

const Products = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            await setProducts(await FilterByName(query));
          } catch (err) {
            console.error('Error al obtener productos:', err)
          }
        }
        fetchProducts()
    }, [query])


    return (
        <div className="home-container">
                <div key={query} className="category-block">
                    <h2 className="category-title">{query}</h2>
                    <div className="products-grid">
                        {products
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
            
        </div>
    )
}

export default Products