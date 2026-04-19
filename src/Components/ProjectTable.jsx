import React, { useState } from 'react';
import './ProjectTable.css';

const statusBadge = {
  'En cours': 'badge badge-green',
  'Terminé': 'badge badge-orange',
  'En attente': 'badge badge-blue',
};

export default function ProjectTable({ projects, onEdit, onDelete }) {
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = [...projects].sort((a, b) => {
    if (!sortField) return 0;
    const v = sortDir === 'asc' ? 1 : -1;
    return a[sortField] > b[sortField] ? v : -v;
  });

  return (
    <div className="project-table-wrap fade-up fade-up-3">
      <div className="card-header">
        <h2>Mes Projets Récents</h2>
      </div>
      <table className="project-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Projet {sortField === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('client')}>
              Client {sortField === 'client' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
            </th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => (
            <tr key={p.id} style={{ animationDelay: `${0.3 + i * 0.06}s` }} className="fade-up">
              <td className="project-name">{p.name}</td>
              <td className="project-client">
                <span className="client-label">Client :</span> <strong>{p.client}</strong>
              </td>
              <td>
                <span className={statusBadge[p.status] || 'badge badge-gray'}>{p.status}</span>
              </td>
              <td className="project-actions">
                <button className="btn-edit" onClick={() => onEdit && onEdit(p)}>Éditer</button>
                <button className="btn-delete" onClick={() => onDelete && onDelete(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}