import { useMemo } from 'react';

export function useTaskFilter(tasks, { searchQuery = '', statusFilter = 'ALL', priorityFilter = 'ALL' }) {
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Status filter
      if (statusFilter !== 'ALL' && task.status !== statusFilter) {
        return false;
      }
      // Priority filter
      if (priorityFilter !== 'ALL' && task.priority !== priorityFilter) {
        return false;
      }
      // Search query filter (title or description or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = task.title?.toLowerCase().includes(query);
        const descMatch = task.description?.toLowerCase().includes(query);
        const categoryMatch = task.category?.toLowerCase().includes(query);
        return titleMatch || descMatch || categoryMatch;
      }
      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
    const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
    const highPriority = tasks.filter((t) => t.priority === 'HIGH' && t.status !== 'COMPLETED').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, highPriority, completionRate };
  }, [tasks]);

  return { filteredTasks, metrics };
}
