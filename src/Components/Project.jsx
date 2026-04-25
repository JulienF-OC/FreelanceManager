import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProjectTable from '../components/ProjectTable';
import { getProjects } from '../services/api';
import './Projects.css';

const EMPTY = { name: '', client: '', status: 'En cours', revenue: '' };

export default function Projects() {
  const [projects, setProjects] = useState(getProjects());
  const [modal, setModal] = useState(null); // null | 'add' | project object
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (p) => { setForm(p); setModal(p); };
  const closeModal = () => setModal(null);

  const handleSave = () => {
    if (!form.name.trim() || !form.client.trim()) return;
    if (modal === 'add') {
      setProjects([...projects, { ...form, id: Date.now(), revenue: Number(form.revenue) || 0 }]);
    } else {
      setProjects(projects.map(p => p.id === form.id ? { ...form, revenue: Number(form.revenue) || 0 } : p));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce projet ?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-body">
          <div className="projects-header fade-up">
            <div>
              <h1>Mes Projets</h1>
              <p>{projects.length} projets au total</p>
            </div>
            <button className="btn-primary" onClick={openAdd}>+ Nouveau Projet</button>
          </div>

          <ProjectTable projects={projects} onEdit={openEdit} onDelete={handleDelete} />

          {modal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal" onClick={e => e.stopPropagation()}>
                <h2>{modal === 'add' ? 'Nouveau Projet' : 'Éditer le Projet'}</h2>
                <div className="form-grid">
                  <label>Nom du projet
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="ex: Site E-Commerce" />
                  </label>
                  <label>Client
                    <input value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="ex: Dupont SARL" />
                  </label>
                  <label>Statut
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option>En cours</option>
                      <option>Terminé</option>
                      <option>En attente</option>
                    </select>
                  </label>
                  <label>Revenus (€)
                    <input type="number" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })} placeholder="0" />
                  </label>
                </div>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={closeModal}>Annuler</button>
                  <button className="btn-primary" onClick={handleSave}>Enregistrer</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}