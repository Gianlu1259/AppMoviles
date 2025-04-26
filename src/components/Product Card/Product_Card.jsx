import React from 'react'
import { Link } from 'react-router-dom'
import { CreateRecord } from '../Records/Records'
import styles from './Product_Card.module.css'

const Product_Card = ({product}) => {
    <Link to={`/product/${product.id}`} className="product-card" onClick={}>
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info">
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p className="rating">⭐ {product.rating.rate} ({product.rating.count})</p>
        </div>
    </Link>
}
export default Product_Card;