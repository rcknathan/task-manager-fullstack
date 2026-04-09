import API_URL from './api';

// 🔑 pega o token salvo
const getToken = () => localStorage.getItem('token');

// 🔹 GET - listar tarefas
export const getTasks = async () => {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error('Erro ao buscar tarefas');

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// 🔹 POST - criar tarefa
export const createTask = async (title) => {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ title })
    });

    if (!res.ok) throw new Error('Erro ao criar tarefa');

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

// 🔹 PUT - atualizar tarefa
export const updateTask = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(updatedData)
    });

    if (!res.ok) throw new Error('Erro ao atualizar tarefa');

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

// 🔹 DELETE - deletar tarefa
export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) throw new Error('Erro ao deletar tarefa');

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};