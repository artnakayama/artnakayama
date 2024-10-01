import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../firebase'; // Certifique-se que auth e db estão configurados corretamente

// Função de registro e salvamento de informações adicionais
async function signUpUser(email, password, displayName, additionalData) {
  try {
    // 1. Cria um novo usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Atualiza o perfil do usuário com o displayName (se necessário)
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // 3. Verifica o papel (role) no additionalData para definir campos específicos
    const { role } = additionalData;
    let userData;

    if (role === 'Rebocador') {
      // Se o papel for "Rebocador", adiciona os campos específicos para rebocadores
      userData = {
        email: user.email,
        displayName: displayName || user.email, // Usar displayName ou email se o nome não for definido
        role: role,
        status: true,
        montador: "null",
        carrinho: "nao-retirado"
    };
} else if (role === 'Montador') {
    // Se o papel for "Montador", adiciona os campos específicos para montadores
    userData = {
        email: user.email,
        displayName: displayName || user.email, // Usar displayName ou email se o nome não for definido
        role: role,
        status: "cheio",
        rebocadores: "null",
        escolhido: "null"
      };
    } else {
      // Para outros papéis, você pode definir outros campos
      userData = {
        email: user.email,
        displayName: displayName || user.email,
        role: role
        // Adicione outros campos genéricos ou específicos para outros papéis aqui
      };
    }

    // 4. Salva os dados no Realtime Database, associando ao UID do usuário
    const userRef = ref(db, 'users/' + user.uid);
    await set(userRef, userData);

    console.log('Usuário registrado e informações salvas com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar o usuário e salvar as informações:', error);
    throw error;
  }
}

export default signUpUser;
