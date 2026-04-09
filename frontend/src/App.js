import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem('token')
  );
  const [isLogin, setIsLogin] = useState(true);

  if (isAuth) {
    return <Dashboard setIsAuth={setIsAuth} />;
  }

  return (
    <>
      {isLogin ? (
        <Login setIsAuth={setIsAuth} />
      ) : (
        <Register setIsAuth={setIsAuth} setIsLogin={setIsLogin} />
      )}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'}
      </button>
    </>
  );
}

export default App;