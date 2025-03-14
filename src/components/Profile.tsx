import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { updateProfile, updateEmail, updatePassword, signOut } from 'firebase/auth';
import { useUserStore } from '../store/userStore';
import '../styles/Profile.css';

export const Profile = () => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (!user) throw new Error('Kullanıcı bulunamadı');

      if (formData.displayName !== user.displayName) {
        await updateProfile(user, { displayName: formData.displayName });
      }

      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
        await updatePassword(user, formData.newPassword);
      }

      setMessage('Profil başarıyla güncellendi');
    } catch (error: any) {
      setError('Profil güncellenirken bir hata oluştu');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      setError('Çıkış yapılırken bir hata oluştu');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profil Bilgileri</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Soyad</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Yeni Şifre</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Güncelleniyor...' : 'Profili Güncelle'}
          </button>
        </form>
        <button onClick={handleLogout} className="logout-button">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}; 