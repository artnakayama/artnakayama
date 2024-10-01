import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../functions/login'; // Função de login
import logo from '../assets/logo.png';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user = await loginUser(email, password); // Chama a função de login
      console.log('Usuário logado:', user);
      navigate('/dashboard')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <header className="bg-white flex justify-start text-green h-[10vh] w-full px-[3rem]">
        {/* Logotipo ou Título */}
        <img src={logo} alt="Logo" className="h-[100%] mr-3 py-5" /> {/* Usando a imagem do logo */}
    </header>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Entrar</h2>

        <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="E-mail"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Senha"
        />
      </div>
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 my-3 px-6 rounded-full">Login</button>
      <button type='button' onClick={() => navigate('/signup')} className="text-sm text-gray-700 hover:underline">Nao tenho conta</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>

        </div>
        </div>
    </>
  );
}

export default LoginForm;
