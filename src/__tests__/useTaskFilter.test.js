import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTaskFilter } from '../hooks/useTaskFilter';

const mockTasks = [
  { id: '1', title: 'Setup Vitest Runner', description: 'Configure ESM testing', status: 'COMPLETED', priority: 'HIGH', category: 'Testing' },
  { id: '2', title: 'Create Header Bar', description: 'Responsive nav layout', status: 'IN_PROGRESS', priority: 'MEDIUM', category: 'UI' },
  { id: '3', title: 'Fix SQL Query Bug', description: 'Database query timeout', status: 'TODO', priority: 'HIGH', category: 'Backend' },
  { id: '4', title: 'Write Documentation', description: 'Draft API reference', status: 'TODO', priority: 'LOW', category: 'Docs' }
];

describe('useTaskFilter', () => {
  it('returns all tasks and calculates correct metrics when no filters are set', () => {
    const { result } = renderHook(() =>
      useTaskFilter(mockTasks, { searchQuery: '', statusFilter: 'ALL', priorityFilter: 'ALL' })
    );

    expect(result.current.filteredTasks).toHaveLength(4);
    expect(result.current.metrics.total).toBe(4);
    expect(result.current.metrics.completed).toBe(1);
    expect(result.current.metrics.inProgress).toBe(1);
    expect(result.current.metrics.highPriority).toBe(1); // Task 3 is HIGH & not completed; Task 1 is HIGH but completed
    expect(result.current.metrics.completionRate).toBe(25);
  });

  it('filters tasks correctly by status', () => {
    const { result } = renderHook(() =>
      useTaskFilter(mockTasks, { searchQuery: '', statusFilter: 'COMPLETED', priorityFilter: 'ALL' })
    );

    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].title).toBe('Setup Vitest Runner');
  });

  it('filters tasks correctly by priority', () => {
    const { result } = renderHook(() =>
      useTaskFilter(mockTasks, { searchQuery: '', statusFilter: 'ALL', priorityFilter: 'HIGH' })
    );

    expect(result.current.filteredTasks).toHaveLength(2);
  });

  it('filters tasks by search query across title and description', () => {
    const { result } = renderHook(() =>
      useTaskFilter(mockTasks, { searchQuery: 'database', statusFilter: 'ALL', priorityFilter: 'ALL' })
    );

    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].id).toBe('3');
  });
});
