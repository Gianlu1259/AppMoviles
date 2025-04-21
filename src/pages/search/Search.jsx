import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FilterByName } from '../../components/Navbar/Search';
import './Search.css';

const Products = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            setProducts(await FilterByName(query));
          } catch (err) {
            console.error('Error al obtener productos:', err)
          }
        }
        fetchProducts()
    }, [query])

    const changeOrderPrice = (value) => {
        setFilter({ ...filter, orderPrice: value })
        if (value === 'asc') {
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            setProducts(sortedProducts);
        } else if (value === 'desc') {
            const sortedProducts = [...products].sort((a, b) => b.price - a.price);
            setProducts(sortedProducts);
        } else {
            setProducts(products)
        }
    }

    return (
        <div className="home-container">
                <div>
                    <select value={filter.orderPrice} defaultValue={'ordenar precio'} onChange={(e) => changeOrderPrice(e.target.value)} className="select-orderPrice">
                        <option value="ordenar precio" disabled>Ordenar por precio</option>
                        <option value="asc">Menor a mayor</option>
                        <option value="desc">Mayor a menor</option>
                    </select>
                </div>
                <div key={query} className="category-block">
                    <h2 className="category-title">{query}</h2>
                    <div className="products-grid">
                        {products
                            .map((prod) => (
                                <Link key={prod.id} to={`/product/${prod.id}`} className="product-card">
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