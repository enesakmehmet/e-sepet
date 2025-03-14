import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { Loading } from './Loading';
import '../styles/Orders.css';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore(state => state.user);

  useEffect(() => {
    // Burada Firebase'den kullanıcının siparişlerini çekeceğiz
    setLoading(false);
  }, [user]);

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Onay Bekliyor';
      case 'processing':
        return 'Hazırlanıyor';
      case 'shipped':
        return 'Kargoya Verildi';
      case 'delivered':
        return 'Teslim Edildi';
      default:
        return status;
    }
  };

  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  if (loading) {
    return <Loading message="Siparişleriniz yükleniyor..." />;
  }

  return (
    <div className="orders">
      <h2>Siparişlerim</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Henüz siparişiniz bulunmuyor.</p>
          <Link to="/" className="browse-products">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                  <span className="order-number">Sipariş No: {order.id}</span>
                </div>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.productId} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-quantity">Adet: {item.quantity}</p>
                      <p className="item-price">₺{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="shipping-address">
                  <h4>Teslimat Adresi</h4>
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city} - {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
                <div className="order-total">
                  <span>Toplam:</span>
                  <span className="total-amount">₺{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 