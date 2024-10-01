import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Remover qualquer dado de autenticação armazenado (se houver)
        localStorage.removeItem('userToken');
        
        // Redirecionar para a página de login ou home
        navigate('/login');
      })
      .catch((error) => {
        console.error("Erro ao sair: ", error);
      });
  };

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
};

export default LogoutButton;
