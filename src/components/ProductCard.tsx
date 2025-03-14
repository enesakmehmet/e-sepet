import { Product } from '../store/cartStore';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);
  
  const isInCart = items.some(item => item.id === product.id);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {isInCart && (
          <div className="in-cart-badge">Sepette</div>
        )}
      </div>
      <h3>{product.name}</h3>
      <p className="price">{product.price.toLocaleString('tr-TR')} ₺</p>
      <button 
        onClick={() => addToCart(product)} 
        className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
      >
        {isInCart ? 'Sepete Ekle (+1)' : 'Sepete Ekle'}
      </button>
    </div>
  );
};
