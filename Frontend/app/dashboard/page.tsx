'use client';
import { useEffect, useState } from 'react';
import api from '../../src/lib/axios'; // Correct path to your src folder
import { Trash2, Plus, CheckCircle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const router = useRouter();

 const fetchTasks = async () => {
  try {
    const { data } = await api.get('/tasks');
    
    // Check if data is an array. If not, look for a property like data.tasks
    if (Array.isArray(data)) {
      setTasks(data);
    } else if (data && Array.isArray(data.tasks)) {
      setTasks(data.tasks);
    } else {
      setTasks([]); // Fallback to empty array to avoid the crash
    }
  } catch (err) {
    console.error('Failed to fetch tasks');
    setTasks([]); // Keep it as an array even on error
  }
};

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    try {
      await api.post('/tasks', { title, status: 'OPEN' });
      setTitle('');
      fetchTasks();
    } catch (err) {
      alert('Error creating task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
        
        <form onSubmit={addTask} className="flex gap-2 mb-8">
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's the next goal?"
            className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition shadow-md">
            <Plus size={20} />
          </button>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No tasks found. Add one above!</p>
          ) : (
            tasks.map((task: any) => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="font-medium text-gray-700">{task.title}</span>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}