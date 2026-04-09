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
      await deleteTask(taskToDelete);
      await loadTasks();
      setShowConfirmDelete(false);
      setTaskToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setTaskToDelete(null);
  };

  const handleToggle = async (task) => {
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
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Minhas Tarefas</h1>
          <p className="task-progress">
            {completedCount} de {tasks.length} concluídas
          </p>
          <button className="logout-btn" onClick={handleLogoutClick}>
            Sair
          </button>
        </div>

        <div className="task-form">
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="add-btn">
              {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
          </form>
        </div>

        <div className="tasks-list">
          {tasks && tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <div className="task-content">
                    <span
                      className="task-title"
                      onClick={() => handleToggle(task)}
                      title="Clique para marcar como concluído"
                    >
                      {task.title}
                    </span>
                  </div>

                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteClick(task.id)}
                    title="Deletar tarefa"
                  >
                    Deletar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>Nenhuma tarefa. Adicione uma para começar!</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        title="Deletar Tarefa"
        message="Tem certeza que deseja deletar esta tarefa? Esta ação não pode ser desfeita."
        isOpen={showConfirmDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <ConfirmModal
        title="Sair"
        message="Tem certeza que deseja sair da sua conta?"
        isOpen={showConfirmLogout}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowConfirmLogout(false)}
      />
    </>
  );
}

export default Dashboard;