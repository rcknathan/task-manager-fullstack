import { useState } from 'react';
import { register } from '../services/auth';

function Register({ setIsAuth, setIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const data = await register(email, password);

    if (data.id) {
      setSuccess('Conta criada! Redirecionando para login...');
      setTimeout(() => {
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }, 1500);
    } else {
      setError(data.error || 'Erro ao registrar');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Cadastro</h2>

      {error && <p style={{ color: '#f5576c', marginBottom: '15px', textAlign: 'center' }}>⚠ {error}</p>}
      {success && <p style={{ color: '#667eea', marginBottom: '15px', textAlign: 'center' }}>{success}</p>}

      <form onSubmit={handleRegister}>
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
          {loading ? 'Criando conta...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default Register;