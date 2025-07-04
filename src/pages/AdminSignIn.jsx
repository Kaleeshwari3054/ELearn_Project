import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'nestonlineschooluk@gmail.com';

const AdminSignIn = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (loginData.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized access. Admin only.');
      }

      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-3">
          <h3 className="text-primary">Admin Sign In</h3>
          <p className="text-muted">Only authorized users allowed</p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-envelope-fill me-2"></i>Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-lock-fill me-2"></i>Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing In...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
