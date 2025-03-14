import { useCartStore } from '../store/cartStore';

export const Cart = () => {
  const { items, total, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="cart empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" className="empty-cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p>Sepetiniz boş</p>
        <p className="empty-cart-subtitle">Ürünleri keşfetmeye başlayın!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Sepetim ({items.length} ürün)
      </h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{item.price.toLocaleString('tr-TR')} ₺</p>
              <div className="quantity-controls">
                <button 
                  onClick={() => decreaseQuantity(item.id)}
                  className="quantity-button"
                  title="Azalt"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => increaseQuantity(item.id)}
                  className="quantity-button"
                  title="Artır"
                >
                  +
                </button>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="remove-item"
              title="Ürünü Kaldır"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="remove-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <div className="cart-total-details">
          <span>Toplam ({items.reduce((sum, item) => sum + item.quantity, 0)} ürün)</span>
          <h3>{total.toLocaleString('tr-TR')} ₺</h3>
        </div>
        <button className="checkout-button">
          Ödemeye Geç
          <svg xmlns="http://www.w3.org/2000/svg" className="checkout-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
