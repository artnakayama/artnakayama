import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './components/signUpForm';
import LoginForm from './components/loginForm';
import Dashboard from './components/Dashboard';
import Montador from './components/Montador';

function App() {
  const [loading, setLoading] = useState(true); // Carregamento enquanto verifica a autenticação
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
  const [error, setError] = useState(null); // Estado para armazenar erros
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Verificar o estado de autenticação do Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Usuário autenticado:', user); // Verifique o user no console
        setUser(user); // Armazena o objeto completo do usuário
        setLoading(false); // Finaliza o carregamento
        navigate('/dashboard'); // Redireciona para o Dashboard
      } else {
        setUser(null); // Limpa o usuário se não estiver autenticado
        setLoading(false); // Finaliza o carregamento
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
      {/* Verificar se o usuário está definido antes de passar para o Dashboard */}
      {user ? (
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      ) : (
        <Route path="*" element={<SignUpForm />} /> // Redireciona para login se o user for null
      )}
      <Route path="/montador" element={<Montador />} />
    </Routes>
  );
}

export default App;

