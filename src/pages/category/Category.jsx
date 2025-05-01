import React, { useEffect, useState } from 'react'
import './Category.css'
import { useParams } from 'react-router-dom';
import { GetProductsByCategory } from '../../Services/Fake_Store';
import ProductCard from '../../components/Product Card/ProductCard';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProduct] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(()=>{
    GetProductsByCategory(categoryName).then((res)=>{
      if(res){
        setProduct(res);
      }
    })
  },[])

  const changeOrderPrice = (value) => {
    setFilter(value)
    const temp = products;
    if (value === 'asc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (value === 'desc') {
      temp.sort((a, b) => b.price - a.price);
    }

    setProduct(temp);
  };

  return (
    <div key={categoryName} className="category-block">
      <div className='title-category'>
        <h2 className="category-title">{categoryName}</h2>
        <select
          value={filter}
          onChange={e => changeOrderPrice(e.target.value)}
          className="select-orderPrice"
        >
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>
      <div className="products-grid">
        {products
          .map((prod) => (
            <ProductCard key={prod.id} product={prod}></ProductCard>
          ))}
      </div>
    </div>
  )
}

export default Category