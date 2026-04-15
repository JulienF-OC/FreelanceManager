import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <nav className="navbar-tabs">
        <NavLink to="/" end className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
          Tableau de Bord
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
          Mes Projets
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
          Mon Profil
        </NavLink>
      </nav>
      <div className="navbar-user">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
        <span className="user-name">{user?.name || 'Alex Martin'}</span>
        <span className="user-chevron">▾</span>
        <button className="logout-btn" onClick={logout} title="Se déconnecter">↪</button>
      </div>
    </header>
  );
}