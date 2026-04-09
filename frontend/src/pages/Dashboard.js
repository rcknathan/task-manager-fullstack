import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from '../services/tasks';
import ConfirmModal from '../components/ConfirmModal';

function Dashboard({ setIsAuth }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [unchecking, setUnchecking] = useState(null);
  const [deletingTasks, setDeletingTasks] = useState(new Set());

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data || []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    await createTask(title);
    setTitle('');
    await loadTasks();
    setLoading(false);
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      // Adiciona a tarefa à lista de deletando para animação
      setDeletingTasks(prev => new Set(prev).add(taskToDelete));
      setShowConfirmDelete(false);
      
      // Aguarda a animação terminar antes de deletar
      setTimeout(async () => {
        await deleteTask(taskToDelete);
        await loadTasks();
        setDeletingTasks(prev => {
          const newSet = new Set(prev);
          newSet.delete(taskToDelete);
          return newSet;
        });
        setTaskToDelete(null);
      }, 400); // Tempo da animação
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setTaskToDelete(null);
  };

  const handleToggle = async (task) => {
    // Se está marcado como completo e vamos desmarcar, adiciona animação
    if (task.completed) {
      setUnchecking(task.id);
      setTimeout(() => setUnchecking(null), 500);
    }
    
    await updateTask(task.id, {
      title: task.title,
      completed: !task.completed
    });

    await loadTasks();
  };

  const handleLogoutClick = () => {
    setShowConfirmLogout(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <>
      <div className="full-screen-container">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>My Tasks</h1>
            <p className="task-progress">
              {completedCount} of {tasks.length} completed
            </p>
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>

        <div className="task-form">
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="add-btn">
              {loading ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>

        <div className="tasks-list">
          {tasks && tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li 
                  key={task.id} 
                  className={`${task.completed ? 'completed' : ''}${deletingTasks.has(task.id) ? ' deleting' : ''}`}
                >
                  <button 
                    className={`check-btn${unchecking === task.id ? ' unchecking' : ''}`}
                    onClick={() => handleToggle(task)}
                    title={task.completed ? 'Mark as pending' : 'Mark as completed'}
                    aria-label="Toggle task completion"
                  >
                    {task.completed ? '✓' : '○'}
                  </button>

                  <div className="task-content">
                    <span className="task-title">
                      {task.title}
                    </span>
                  </div>

                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteClick(task.id)}
                    title="Delete task"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No tasks. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
      </div>

      <ConfirmModal
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <ConfirmModal
        title="Logout"
        message="Are you sure you want to logout?"
        isOpen={showConfirmLogout}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowConfirmLogout(false)}
      />
    </>
  );
}

export default Dashboard;