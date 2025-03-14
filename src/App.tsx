import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { ProductCard } from './components/ProductCard'
import { Cart } from './components/Cart'
import { ProductDetail } from './components/ProductDetail'
import { Checkout } from './components/Checkout'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { ForgotPassword } from './components/auth/ForgotPassword'
import { Profile } from './components/Profile'
import { Favorites } from './components/Favorites'
import { Orders } from './components/Orders'
import { products } from './data/products'
import { useCartStore } from './store/cartStore'
import { useUserStore } from './store/userStore'
import { ToastContainer, useToast } from './components/ToastContainer'
import './App.css'
import './styles/ProductDetail.css'
import './styles/Checkout.css'
import './styles/Auth.css'
import './styles/Profile.css'
import './styles/Favorites.css'
import './styles/Orders.css'

// Create a context for toast notifications
export const ToastContext = createContext<{
  addToast: (message: string, type: 'success' | 'error') => string;
  removeToast: (id: string) => void;
}>({
  addToast: () => '',
  removeToast: () => {},
});

function App() {
  const items = useCartStore(state => state.items)
  const { user, setUser, setLoading } = useUserStore()
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <Router>
        <div className="app">
          <header>
            <nav>
              <Link to="/" className="logo">E-Sepet</Link>
              <div className="nav-links">
                {user ? (
                  <>
                    <Link to="/profile" className="profile-link">
                      {user.displayName || 'Profil'}
                    </Link>
                    <Link to="/favorites" className="favorites-link">
                      Favoriler
                    </Link>
                    <Link to="/orders" className="orders-link">
                      Siparişlerim
                    </Link>
                    <Link to="/cart" className="cart-link">
                      <div className="cart-icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {items.length > 0 && (
                          <span className="cart-badge">{items.length}</span>
                        )}
                      </div>
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="login-link">Giriş Yap</Link>
                )}
              </div>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={
                <div className="products-grid">
                  {products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-link">
                      <ProductCard product={product} />
                    </Link>
                  ))}
                </div>
              } />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={
                user ? <Cart /> : <Navigate to="/login" />
              } />
              <Route path="/checkout" element={
                user ? <Checkout /> : <Navigate to="/login" />
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={
                user ? <Profile /> : <Navigate to="/login" />
              } />
              <Route path="/favorites" element={
                user ? <Favorites /> : <Navigate to="/login" />
              } />
              <Route path="/orders" element={
                user ? <Orders /> : <Navigate to="/login" />
              } />
            </Routes>
          </main>
          
          {/* Toast Container */}
          <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
      </Router>
    </ToastContext.Provider>
  )
}

export default App