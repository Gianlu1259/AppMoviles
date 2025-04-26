import React from 'react'
import styles from './Records.module.css'

const Records = async() => {
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
                                    <img src={prod.image} alt={prod.title} className="product-image"/>
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

export default Records;