import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    // Simulation d'une authentification (à remplacer par un vrai appel API)
    await new Promise(r => setTimeout(r, 700));
    const name = form.email.split('@')[0];
    login({ email: form.email, name: name.charAt(0).toUpperCase() + name.slice(1) });
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo-icon">◈</span>
          <span className="auth-logo-text"><strong>Freelance</strong> Manager</span>
        </div>
        <h2 className="auth-tagline">Gérez vos missions<br />freelance facilement.</h2>
        <div className="auth-decorations">
          <div className="deco deco-1" />
          <div className="deco deco-2" />
          <div className="deco deco-3" />
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Connexion</h1>
          <p className="auth-subtitle">Bon retour parmi nous 👋</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Adresse email
              <input
                type="email"
                placeholder="vous@exemple.fr"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoFocus
              />
            </label>
            <label>
              Mot de passe
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="auth-switch">
            Pas encore de compte ?{' '}
            <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}