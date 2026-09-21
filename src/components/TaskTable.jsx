import React from 'react';

export function TaskTable({ tasks, onEdit, onDelete, onStatusToggle }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' };
      case 'MEDIUM':
        return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      case 'LOW':
      default:
        return { bg: '#e0f2fe', text: '#075985', border: '#bae6fd' };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { bg: '#dcfce7', text: '#166534', label: 'Completed' };
      case 'IN_PROGRESS':
        return { bg: '#e0e7ff', text: '#3730a3', label: 'In Progress' };
      case 'TODO':
      default:
        return { bg: '#f1f5f9', text: '#475569', label: 'To Do' };
    }
  };

  if (tasks.length === 0) {
    return (
      <div
        data-testid="empty-state"
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px dashed #cbd5e1',
          color: '#64748b'
        }}
      >
        <div style={{ fontSize: '15px', fontWeight: 600 }}>No tasks found</div>
        <div style={{ fontSize: '13px', marginTop: '4px' }}>Try adjusting your search or filters, or create a new task.</div>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Title & Description</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Category</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Priority</th>
            <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const priorityStyle = getPriorityStyle(task.priority);
            const statusStyle = getStatusStyle(task.status);
            return (
              <tr
                key={task.id}
                data-testid={`task-row-${task.id}`}
                style={{ borderBottom: '1px solid #f1f5f9' }}
              >
                <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                  <button
                    type="button"
                    onClick={() => onStatusToggle(task.id)}
                    title="Click to toggle status"
                    style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {statusStyle.label}
                  </button>
                </td>
                <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{task.title}</div>
                  <div style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{task.description}</div>
                </td>
                <td style={{ padding: '12px 16px', verticalAlign: 'top', color: '#334155' }}>
                  {task.category}
                </td>
                <td style={{ padding: '12px 16px', verticalAlign: 'top' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: priorityStyle.bg,
                      color: priorityStyle.text,
                      border: `1px solid ${priorityStyle.border}`
                    }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', verticalAlign: 'top', textAlign: 'right' }}>
                  <button
                    type="button"
                    onClick={() => onEdit(task)}
                    style={{
                      marginRight: '8px',
                      padding: '4px 8px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(task.id)}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#fee2e2',
                      border: '1px solid #fca5a5',
                      color: '#991b1b',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
