import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import Montador from './Montador';  // e para Montadores
import Rebocador from './Rebocador';  // e para Rebocadores
import Header from './Header';

function Dashboard({ user }) {
  const [role, setRole] = useState(null); // Estado para armazenar o papel do usuário (Montador ou Rebocador)
  const [additionalData, setAdditionalData] = useState(null); // Para armazenar os dados adicionais do banco de dados
  const [loading, setLoading] = useState(true); // Estado para mostrar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    if (user && user.uid) {
      console.log('UID do usuário:', user.uid); // Verifica se o UID está disponível
      const userRef = ref(db, 'users/' + user.uid); // Referência ao Realtime Database para o usuário

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('Dados adicionais do usuário recuperados:', userData);
            setRole(userData.role); // Define o papel do usuário no estado
            setAdditionalData(userData); // Salva todos os dados adicionais no estado
          } else {
            console.log('Dados do usuário não encontrados no banco de dados.');
            setError('Dados do usuário não encontrados no banco de dados.');
          }
        })
        .catch((error) => {
          console.error('Erro ao recuperar os dados adicionais do usuário:', error);
          setError('Erro ao recuperar os dados adicionais do usuário.');
        })
        .finally(() => {
          setLoading(false); // Finaliza o carregamento após a tentativa de leitura
        });
    } else {
      console.log('UID do usuário não está disponível');
      setError('UID do usuário não está disponível.');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Carregando...</p>; // Mostra uma mensagem de carregamento enquanto os dados estão sendo buscados
  }

  if (error) {
    return <p>{error}</p>; // Exibe qualquer erro que tenha ocorrido durante a busca dos dados
  }

  // Verifica o papel do usuário e exibe o componente correto
  return (
    <div>
      <Header />
      {/* Verificar se o user está definido e usar displayName ou email como fallback */}
      <main class="flex justify-center items-center h-[90vh]">
        <div>
          <h1 className="text-[2rem] font-bold text-green-700 mb-4">Olá, {user?.displayName || user?.email}</h1>
          {role === 'Montador' && <Montador user={user} />}
          {role === 'Rebocador' && <Rebocador user={user} />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

