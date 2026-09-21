import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTaskFilter } from './hooks/useTaskFilter';
import { StatCard } from './components/StatCard';
import { TaskTable } from './components/TaskTable';
import { TaskModal } from './components/TaskModal';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Implement Playwright End-to-End Test Suite',
    description: 'Create POM-based regression suites covering authentication and checkout workflows.',
    category: 'QA / Testing',
    priority: 'HIGH',
    status: 'COMPLETED',
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Build Responsive React Navigation & Filter Bar',
    description: 'Develop accessible tab navigation with URL parameter state sync.',
    category: 'UI/UX',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Integrate Postman Collection into GitHub Actions CI',
    description: 'Automate REST endpoint status and JSON schema validation on push events.',
    category: 'DevOps',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Optimize Database Indexing for MySQL Queries',
    description: 'Add composite indexes on user_id and transaction_timestamp tables.',
    category: 'Engineering',
    priority: 'LOW',
    status: 'TODO',
    updatedAt: new Date().toISOString()
  }
];

export function App() {
  const [tasks, setTasks] = useLocalStorage('analytics_dashboard_tasks', INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { filteredTasks, metrics } = useTaskFilter(tasks, {
    searchQuery,
    statusFilter,
    priorityFilter
  });

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) => prev.map((t) => (t.id === taskData.id ? taskData : t)));
    } else {
      setTasks((prev) => [taskData, ...prev]);
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus =
          t.status === 'TODO' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'COMPLETED' : 'TODO';
        return { ...t, status: nextStatus, updatedAt: new Date().toISOString() };
      })
    );
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
              Workflow & Task Analytics Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              React.js component-based task management with real-time metrics & persistent state
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreateModal}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 18px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            + New Task
          </button>
        </header>

        {/* Metrics Grid */}
        <section style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <StatCard label="Total Tasks" value={metrics.total} subtitle="Across all categories" color="blue" />
          <StatCard label="In Progress" value={metrics.inProgress} subtitle="Currently active" color="amber" />
          <StatCard label="Completed" value={metrics.completed} subtitle={`${metrics.completionRate}% completion rate`} color="green" />
          <StatCard label="High Priority" value={metrics.highPriority} subtitle="Pending attention" color="rose" />
        </section>

        {/* Filter Toolbar */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <div style={{ flex: '1 1 240px' }}>
            <input
              type="text"
              role="searchbox"
              placeholder="Search by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label htmlFor="priority-filter-select" style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
              Priority:
            </label>
            <select
              id="priority-filter-select"
              aria-label="Filter by priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'TODO', 'IN_PROGRESS', 'COMPLETED'].map((statusKey) => (
              <button
                key={statusKey}
                data-testid={`filter-btn-${statusKey.toLowerCase()}`}
                type="button"
                onClick={() => setStatusFilter(statusKey)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: statusFilter === statusKey ? '1px solid #2563eb' : '1px solid #cbd5e1',
                  backgroundColor: statusFilter === statusKey ? '#eff6ff' : '#ffffff',
                  color: statusFilter === statusKey ? '#1d4ed8' : '#475569'
                }}
              >
                {statusKey === 'ALL' ? 'All' : statusKey === 'TODO' ? 'To Do' : statusKey === 'IN_PROGRESS' ? 'In Progress' : 'Completed'}
              </button>
            ))}
          </div>
        </section>

        {/* Task Table */}
        <main style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <TaskTable
            tasks={filteredTasks}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
            onStatusToggle={handleStatusToggle}
          />
        </main>

        {/* Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          initialTask={editingTask}
        />
      </div>
    </div>
  );
}

export default App;
