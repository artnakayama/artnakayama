import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Sua configuração do Firebase

// Função reutilizável para fazer login
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuário logado com sucesso:', user);
    localStorage.setItem('userToken', user.accessToken);
    return user;
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    throw error;
  }
}

export default loginUser;
