import React from 'react'
import { Link } from 'react-router-dom'
import { RecordId } from '../../Services/Records.js';

const Product_Card = ({product}) => {
    return (
        <Link key={product.id} to={`/product/${product.id}`} className="product-card" onClick={() => RecordId(product.id)}>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <p className="rating">⭐ {product.rating.rate} ({product.rating.count})</p>
            </div>
        </Link>
    );
}
export default Product_Card;