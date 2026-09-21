import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { taskApi } from '../services/taskApi';

describe('taskApi REST Integration Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches tasks successfully from remote REST endpoint and maps response schema', async () => {
    const mockApiResponse = [
      { id: 1, title: 'delectus aut autem', completed: false, userId: 1 },
      { id: 2, title: 'quis ut nam facilis', completed: true, userId: 1 }
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse
    }));

    const tasks = await taskApi.fetchTasks(2);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://jsonplaceholder.typicode.com/todos?_limit=2'),
      expect.objectContaining({ method: 'GET' })
    );

    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual(expect.objectContaining({
      id: '1',
      title: 'Delectus aut autem',
      status: 'IN_PROGRESS',
      priority: 'HIGH'
    }));
    expect(tasks[1].status).toBe('COMPLETED');
  });

  it('handles REST API fetch failure by throwing error for fallback handling', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    }));

    await expect(taskApi.fetchTasks(5)).rejects.toThrow('HTTP error! Status: 500');
  });

  it('sends POST request with JSON payload when creating a task', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ id: 101 })
    }));

    const newTask = {
      title: 'Automate API Health Check',
      description: 'Run scheduled check via cron',
      priority: 'HIGH',
      status: 'TODO'
    };

    const created = await taskApi.createTask(newTask);

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"title":"Automate API Health Check"')
      })
    );
    expect(created.remoteId).toBe(101);
  });
});
