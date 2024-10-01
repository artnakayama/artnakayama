import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import LogoutButton from './logoutButton';
import logo from '../assets/logo.png';

function Header() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirecionar para a página de login após logout
        navigate('/login');
      })
      .catch((error) => {
        console.error("Erro ao sair: ", error);
      });
  };

  return (
    <header className="bg-white flex justify-between text-green h-[10vh] w-full px-[3rem]">
        {/* Logotipo ou Título */}
        <img src={logo} alt="Logo" className="h-[100%] mr-3 py-5" /> {/* Usando a imagem do logo */}


        {/* Botão de Logout */}
        <LogoutButton />
    </header>
  );
}

export default Header;
