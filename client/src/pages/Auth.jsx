import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/api';
import styles from './Auth.module.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', email: '', phone: '', password: '', dob: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      const res = await fetchWithAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-card']}>
        <h2>{isLogin ? 'Welcome Back' : 'Join Civic Track'}</h2>
        <p className={styles['auth-subtitle']}>
          {isLogin ? 'Sign in to report and track issues' : 'Create an account to make a difference'}
        </p>

        {error && <div className={styles['auth-error']}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles['auth-form']}>
          {!isLogin && (
            <div className={styles['form-row']}>
              <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required />
            </div>
          )}
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          {!isLogin && (
            <>
              <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
              <input type="date" name="dob" onChange={handleChange} required />
            </>
          )}
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          
          <button type="submit" className={styles['auth-btn']}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className={styles['auth-toggle']}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
