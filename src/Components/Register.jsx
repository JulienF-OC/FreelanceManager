import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login({ email: form.email, name: form.name });
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo-icon">◈</span>
          <span className="auth-logo-text"><strong>Freelance</strong> Manager</span>
        </div>
        <h2 className="auth-tagline">Votre activité freelance,<br />enfin bien organisée.</h2>
        <div className="auth-decorations">
          <div className="deco deco-1" />
          <div className="deco deco-2" />
          <div className="deco deco-3" />
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Créer un compte</h1>
          <p className="auth-subtitle">C'est gratuit et rapide ✨</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Nom complet
              <input
                type="text"
                placeholder="Alex Martin"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                autoFocus
              />
            </label>
            <label>
              Adresse email
              <input
                type="email"
                placeholder="vous@exemple.fr"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
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
            <label>
              Confirmer le mot de passe
              <input
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
              />
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <p className="auth-switch">
            Déjà un compte ?{' '}
            <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}