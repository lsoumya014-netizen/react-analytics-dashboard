import React, { useState } from 'react';

export function TaskModal({ isOpen, onClose, onSave, initialTask = null }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [description, setDescription] = useState(initialTask ? initialTask.description : '');
  const [priority, setPriority] = useState(initialTask ? initialTask.priority : 'MEDIUM');
  const [status, setStatus] = useState(initialTask ? initialTask.status : 'TODO');
  const [category, setCategory] = useState(initialTask ? initialTask.category : 'Engineering');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      errs.description = 'Description is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: initialTask ? initialTask.id : Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      category,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '500px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 id="modal-title" style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '14px' }}>
            <label htmlFor="task-title" style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
              Task Title *
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement OAuth2 Authentication"
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: errors.title ? '1px solid #ef4444' : '1px solid #cbd5e1',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            {errors.title && (
              <span role="alert" style={{ color: '#ef4444', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                {errors.title}
              </span>
            )}
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label htmlFor="task-desc" style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
              Description *
            </label>
            <textarea
              id="task-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe acceptance criteria or technical details..."
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '6px',
                border: errors.description ? '1px solid #ef4444' : '1px solid #cbd5e1',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            {errors.description && (
              <span role="alert" style={{ color: '#ef4444', fontSize: '12px', marginTop: '3px', display: 'block' }}>
                {errors.description}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="task-priority" style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="task-status" style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="task-category" style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
              Category
            </label>
            <select
              id="task-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            >
              <option value="Engineering">Engineering</option>
              <option value="QA / Testing">QA / Testing</option>
              <option value="UI/UX">UI/UX</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
