import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (!product) return <div className="error">Producto no encontrado.</div>;

  return (
    <section className={styles['Product-Main']}>
      <div className={styles['Product-Image']}>
        <img src={product.image} alt={product.title} className={styles['product-image']} />
      </div>
      <div className={styles['product-info']}>
        <div className={styles['Product-Info']}>
          <h1 className={styles['product-title']}>{product.title}</h1>
          <p className={styles['product-category']}>{product.category}</p>
          <p className={styles['product-price']}>${product.price}</p>
        </div>
        <div className={styles['Product-Buttons']}>
          <button className={styles['product-btn']}>Agregar al carrito</button>
        </div>
        <div className={styles['Product-Description']}>
          <p className={styles['product-Description']}>{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Product;