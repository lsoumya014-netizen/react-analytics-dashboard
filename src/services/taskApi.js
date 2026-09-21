/**
 * REST API client for task operations using native Fetch API.
 * Communicates with REST endpoints with error handling and fallback support.
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const taskApi = {
  /**
   * Fetch initial tasks from remote REST endpoint
   */
  async fetchTasks(limit = 5) {
    try {
      const response = await fetch(`${API_BASE_URL}?_limit=${limit}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Map API schema to application Task model
      return data.map((item) => ({
        id: item.id.toString(),
        title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
        description: `API Synchronized task ID #${item.id} from remote server.`,
        category: item.id % 2 === 0 ? 'Engineering' : 'QA / Testing',
        priority: item.id === 1 ? 'HIGH' : item.id === 2 ? 'MEDIUM' : 'LOW',
        status: item.completed ? 'COMPLETED' : 'IN_PROGRESS',
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('REST API fetch failed, falling back to local storage cache:', error);
      throw error;
    }
  },

  /**
   * Create a new task via REST POST
   */
  async createTask(task) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,
        completed: task.status === 'COMPLETED',
        userId: 1
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create task! HTTP ${response.status}`);
    }

    const result = await response.json();
    return { ...task, remoteId: result.id };
  },

  /**
   * Update task status via REST PUT
   */
  async updateTaskStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: status === 'COMPLETED'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update task ${id}! HTTP ${response.status}`);
    }

    return await response.json();
  },

  /**
   * Delete task via REST DELETE
   */
  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task ${id}! HTTP ${response.status}`);
    }

    return true;
  }
};
