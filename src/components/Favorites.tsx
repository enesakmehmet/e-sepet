import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../store/favoritesStore';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import '../styles/Favorites.css';

export const Favorites = () => {
  const favorites = useFavoritesStore(state => state.favorites);
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className="favorites">
      <h2>Favori Ürünlerim</h2>
      {favoriteProducts.length === 0 ? (
        <div className="no-favorites">
          <p>Henüz favori ürününüz bulunmuyor.</p>
          <Link to="/" className="browse-products">
            Ürünlere Göz At
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}; 