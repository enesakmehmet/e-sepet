import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { motion } from 'framer-motion';

interface AddressForm {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

export const Checkout = () => {
  const { items, total } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [step, setStep] = useState<'address' | 'payment' | 'summary'>('address');
  
  const [address, setAddress] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('summary');
  };

  const handleOrder = () => {
    // Burada sipariş işlemi gerçekleştirilebilir
    console.log('Sipariş tamamlandı:', { address, payment, items });
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  return (
    <motion.div 
      className="checkout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="checkout-steps">
        <div className={`step ${step === 'address' ? 'active' : ''}`}>
          1. Adres Bilgileri
        </div>
        <div className={`step ${step === 'payment' ? 'active' : ''}`}>
          2. Ödeme
        </div>
        <div className={`step ${step === 'summary' ? 'active' : ''}`}>
          3. Özet
        </div>
      </div>

      {step === 'address' && (
        <motion.form 
          onSubmit={handleAddressSubmit}
          className="address-form"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2>Teslimat Adresi</h2>
          <div className="form-row">
            <input
              type="text"
              placeholder="Ad"
              value={address.firstName}
              onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Soyad"
              value={address.lastName}
              onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
              required
            />
          </div>
          <textarea
            placeholder="Adres"
            value={address.address}
            onChange={(e) => setAddress({ ...address, address: e.target.value })}
            required
          />
          <div className="form-row">
            <input
              type="text"
              placeholder="Şehir"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Posta Kodu"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              required
            />
          </div>
          <input
            type="tel"
            placeholder="Telefon"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            required
          />
          <button type="submit" className="continue-button">
            Devam Et
          </button>
        </motion.form>
      )}

      {step === 'payment' && (
        <motion.div 
          className="payment-section"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2>Ödeme Yöntemi</h2>
          <div className="payment-methods">
            <button
              className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              Kredi Kartı
            </button>
            <button
              className={`payment-method ${paymentMethod === 'transfer' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('transfer')}
            >
              Havale/EFT
            </button>
          </div>

          {paymentMethod === 'card' && (
            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <input
                type="text"
                placeholder="Kart Üzerindeki İsim"
                value={payment.cardHolder}
                onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Kart Numarası"
                value={payment.cardNumber}
                onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
                maxLength={19}
                required
              />
              <div className="form-row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={payment.expiryDate}
                  onChange={(e) => setPayment({ ...payment, expiryDate: e.target.value })}
                  maxLength={5}
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={payment.cvv}
                  onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                  maxLength={3}
                  required
                />
              </div>
              <button type="submit" className="continue-button">
                Ödemeyi Tamamla
              </button>
            </form>
          )}

          {paymentMethod === 'transfer' && (
            <div className="bank-transfer-info">
              <h3>Banka Hesap Bilgileri</h3>
              <p>Banka: Örnek Bank</p>
              <p>IBAN: TR00 0000 0000 0000 0000 0000 00</p>
              <p>Hesap Sahibi: E-Sepet A.Ş.</p>
              <button onClick={() => setStep('summary')} className="continue-button">
                Devam Et
              </button>
            </div>
          )}
        </motion.div>
      )}

      {step === 'summary' && (
        <motion.div 
          className="order-summary"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2>Sipariş Özeti</h2>
          <div className="summary-section">
            <h3>Teslimat Adresi</h3>
            <p>{address.firstName} {address.lastName}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.zipCode}</p>
            <p>{address.phone}</p>
          </div>

          <div className="summary-section">
            <h3>Ürünler</h3>
            {items.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <h3>Toplam</h3>
            <span>{total.toLocaleString('tr-TR')} ₺</span>
          </div>

          <button onClick={handleOrder} className="order-button">
            Siparişi Onayla
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
