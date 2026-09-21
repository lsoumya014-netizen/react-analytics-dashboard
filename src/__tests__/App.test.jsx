import React from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';
import { taskApi } from '../services/taskApi';

describe('App Dashboard Integration', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the dashboard title, API status badge, and initial stat cards', () => {
    render(<App />);

    expect(screen.getByText(/Workflow & Task Analytics Dashboard/i)).toBeInTheDocument();
    expect(screen.getByTestId('api-status-badge')).toHaveTextContent('REST API: Ready');
    expect(screen.getByTestId('stat-card-total-tasks')).toBeInTheDocument();
    expect(screen.getByTestId('stat-card-in-progress')).toBeInTheDocument();
    expect(screen.getByTestId('stat-card-completed')).toBeInTheDocument();
  });

  it('filters tasks when typing in the search input', () => {
    render(<App />);

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'Playwright' } });

    expect(screen.getByText(/Implement Playwright End-to-End Test Suite/i)).toBeInTheDocument();
    expect(screen.queryByText(/Optimize Database Indexing for MySQL Queries/i)).not.toBeInTheDocument();
  });

  it('filters tasks when clicking a status button', () => {
    render(<App />);

    const completedBtn = screen.getByTestId('filter-btn-completed');
    fireEvent.click(completedBtn);

    // Only completed task should be visible
    expect(screen.getByText(/Implement Playwright End-to-End Test Suite/i)).toBeInTheDocument();
    expect(screen.queryByText(/Build Responsive React Navigation & Filter Bar/i)).not.toBeInTheDocument();
  });

  it('opens and closes the task creation modal', () => {
    render(<App />);

    const newTaskBtn = screen.getByRole('button', { name: /\+ New Task/i });
    fireEvent.click(newTaskBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('triggers REST API sync when clicking Sync REST API button', async () => {
    const mockSyncedTasks = [
      {
        id: '10',
        title: 'Remote API Integration Task',
        description: 'Synchronized via REST fetch',
        category: 'Engineering',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        updatedAt: new Date().toISOString()
      }
    ];

    vi.spyOn(taskApi, 'fetchTasks').mockResolvedValue(mockSyncedTasks);

    render(<App />);

    const syncBtn = screen.getByTestId('sync-api-btn');
    fireEvent.click(syncBtn);

    await waitFor(() => {
      expect(screen.getByTestId('api-status-badge')).toHaveTextContent('REST API: Synced 4 tasks');
    });

    expect(taskApi.fetchTasks).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Remote API Integration Task/i)).toBeInTheDocument();
  });
});
