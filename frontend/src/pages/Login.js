import { useState } from 'react';
import { login } from '../services/auth';

function Login({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem('token', data.token);
      setIsAuth(true);
    } else {
      setError(data.error || 'Erro ao fazer login');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: '#f5576c', marginBottom: '15px', textAlign: 'center' }}>⚠ {error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login;