import { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContext } from '../../App';
import '../../styles/Auth.css';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useContext(ToastContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      addToast('Hesabınız başarıyla oluşturuldu!', 'success');
      navigate('/');
    } catch (err: unknown) {
      console.error('Kayıt hatası:', err);
      if (err instanceof Error) {
        setError(`Kayıt oluşturulamadı: ${err.message}`);
      } else {
        setError('Kayıt oluşturulamadı. Lütfen bilgilerinizi kontrol edin.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Hesap Oluştur</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Hesap oluşturuluyor...' : 'Kayıt Ol'}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/login">Zaten hesabınız var mı? Giriş yapın</Link>
        </div>
      </div>
    </div>
  );
}; 