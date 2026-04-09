import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('token')
  );
  const [isLogin, setIsLogin] = useState(true);

  if (isAuth) {
    return <Dashboard setIsAuth={setIsAuth} />;
  }

  return (
    <div className="App">
      <div className="auth-container">
        {isLogin ? (
          <Login setIsAuth={setIsAuth} />
        ) : (
          <Register setIsAuth={setIsAuth} setIsLogin={setIsLogin} />
        )}
      </div>
      <button className="auth-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'}
      </button>
    </div>
  );
}

export default App;