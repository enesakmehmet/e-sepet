import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { motion } from 'framer-motion';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const addToCart = useCartStore(state => state.addToCart);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!product) {
    return <div className="error-message">Ürün bulunamadı</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada yorum ve puanlama backend'e gönderilebilir
    console.log('Yorum:', comment, 'Puan:', selectedRating);
    setComment('');
    setSelectedRating(0);
  };

  return (
    <motion.div 
      className="product-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
        <div className="stock-badge">Stokta</div>
      </div>
      
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toLocaleString('tr-TR')} ₺</p>
        
        <div className="product-actions">
          <button onClick={handleAddToCart} className="add-to-cart">
            Sepete Ekle
          </button>
        </div>

        <div className="product-description">
          <h2>Ürün Açıklaması</h2>
          <p>Bu ürün hakkında detaylı açıklama...</p>
        </div>

        <div className="product-reviews">
          <h2>Ürün Yorumları</h2>
          
          <form onSubmit={handleRatingSubmit} className="review-form">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedRating(star)}
                  className={`star ${selectedRating >= star ? 'selected' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ürün hakkında yorumunuzu yazın..."
              rows={4}
            />
            
            <button type="submit" className="submit-review">
              Yorumu Gönder
            </button>
          </form>

          <div className="existing-reviews">
            {/* Örnek yorumlar */}
            <div className="review">
              <div className="review-header">
                <span className="review-stars">★★★★★</span>
                <span className="review-author">Ahmet Y.</span>
              </div>
              <p>Harika bir ürün, çok memnun kaldım!</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
