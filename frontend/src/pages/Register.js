import { useState } from 'react';
import { register } from '../services/auth';

function Register({ setIsAuth, setIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = await register(email, password);

    if (data.id) {
      alert('Conta criada! Faça login');
      setIsLogin(true); // Switch to login view
    } else {
      alert('Erro ao registrar: ' + (data.error || 'Erro desconhecido'));
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;