import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FilterByName } from '../../components/Navbar/Search';
import './Search.css';
import { GetCategorys } from '../../Services/Fake_Store';

const Products = () => {
  const { query } = useParams();
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ orderPrice: '', category: 'all' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const prods = await FilterByName(query);
        setOriginalProducts(prods);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await GetCategorys();
        setCategories(response);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [query]);

  
  useEffect(() => {
    let temp = [...originalProducts];

    
    if (filter.category && filter.category !== 'all') {
      temp = temp.filter(prod => prod.category === filter.category);
    }

    
    if (filter.orderPrice === 'asc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (filter.orderPrice === 'desc') {
      temp.sort((a, b) => b.price - a.price);
    }

    setProducts(temp);
  }, [originalProducts, filter]);

  const changeOrderPrice = (value) => {
    setFilter(prev => ({ ...prev, orderPrice: value }));
  };

  const changeCategory = (value) => {
    setFilter(prev => ({ ...prev, category: value }));
  };

  return (
    <div className="home-container">
      <div className="filters-container">
        <select
          value={filter.category}
          onChange={e => changeCategory(e.target.value)}
          className="select-category"
        >
          <option value="all">Todas las categorías</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filter.orderPrice}
          onChange={e => changeOrderPrice(e.target.value)}
          className="select-orderPrice"
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>

      <div key={query} className="category-block">
        <h2 className="category-title">{query}</h2>
        <div className="products-grid">
          {products.map(prod => (
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
  );
};

export default Products;
