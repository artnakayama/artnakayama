import React, { useState } from 'react';
import signUpUser from '../functions/register'; // Função de registro
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Criar o objeto additionalData com os campos adicionais
      const additionalData = {
        role: role // Incluindo a nova opção selecionada no dropdown
      };

      // Chamar a função signUpUser com os novos dados
      const user = await signUpUser(email, password, name, additionalData);
      console.log('Usuário registrado com sucesso:', user);
      navigate('/dashboard');
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
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Registro</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome de Usuário:</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Nome de Usuário"
        />
      </div>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Função:</label>
        <select className="block w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Selecione uma função</option>
          <option value="Montador">Montador</option>
          <option value="Rebocador">Rebocador</option>
        </select>
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
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full my-3" type="submit">Registrar</button>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      {success && <p className="text-green-600 text-center mt-4">Usuário registrado com sucesso!</p>}

      <p className="text-gray-700">Já tem uma conta?</p>
      <button className="text-sm text-green-700 hover:underline" type="button" onClick={() => navigate('/login')}>
        Fazer login
      </button> {/* Botão que redireciona para o Login */}
    </form>
    </div>
    </div>
    </>
  );
}

export default SignUpForm;