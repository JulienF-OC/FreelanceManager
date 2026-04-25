import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import ProjectTable from '../components/ProjectTable';
import TaskList from '../components/TaskList';
import { BarChart, DonutChart } from '../components/Chart';
import { useAuth } from '../context/AuthContext';
import { getProjects, getTasks, getStats, getRevenueByClient } from '../services/api';
import './Dashboard.css';
 
export default function Dashboard() {
  const { user } = useAuth();
  const stats = getStats();
  const [projects, setProjects] = useState(getProjects());
  const tasks = getTasks();
  const revenueByClient = getRevenueByClient();
 
  const barData = [
    { label: 'En cours', value: projects.filter(p => p.status === 'En cours').length },
    { label: 'Terminé', value: projects.filter(p => p.status === 'Terminé').length },
    { label: 'En attente', value: projects.filter(p => p.status === 'En attente').length },
  ];
 
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
          <div className="dashboard-welcome fade-up">
            <h1>Bienvenue {user?.name || 'Alex Martin'} !</h1>
            <p>Gérez vos missions freelance facilement.</p>
          </div>
 
          <div className="stat-cards fade-up fade-up-2">
            <StatCard label="Projets Actifs" value={stats.activeProjects} color="orange" />
            <StatCard label="Tâches en Cours" value={stats.ongoingTasks} color="blue" />
            <StatCard label="Revenus ce Mois" value={`${stats.monthlyRevenue.toLocaleString('fr-FR')} €`} color="green" />
          </div>
 
          <div className="dashboard-grid">
            <div className="col-main">
              <ProjectTable
                projects={projects}
                onDelete={handleDelete}
              />
            </div>
            <div className="col-side">
              <TaskList initialTasks={tasks} />
            </div>
          </div>
 
          <div className="dashboard-charts">
            <BarChart data={barData} />
            <DonutChart data={revenueByClient} title="Revenus Mensuels" />
          </div>
        </div>
      </div>
    </div>
  );
}
 

