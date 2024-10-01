import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase'; // Certifique-se de que o Firebase está corretamente configurado

function Rebocador({ user }) {
    const [status, setStatus] = useState(true); // Estado para armazenar o status atual (true ou false)
    const [montador, setMontador] = useState(null); // Estado para armazenar os dados do montador
    const [carrinho, setCarrinho] = useState(''); // Estado para armazenar o status do carrinho
    const [loading, setLoading] = useState(true); // Estado de carregamento
  
    useEffect(() => {
      if (user && user.uid) {
        console.log(`Rebocador identificado: ${user.uid}`);
  
        // Referências ao status, montador e carrinho no Firebase
        const statusRef = ref(db, `users/${user.uid}/status`);
        const montadorRef = ref(db, `users/${user.uid}/montador`);
        const carrinhoRef = ref(db, `users/${user.uid}/carrinho`);
  
        // Escuta em tempo real o campo status
        const unsubscribeStatus = onValue(statusRef, (snapshot) => {
          if (snapshot.exists()) {
            const currentStatus = snapshot.val();
            console.log(`Status atual: ${currentStatus}`);
            setStatus(currentStatus);
          } else {
            console.log('Status não encontrado.');
            setStatus(true); // Reseta o status para true se não encontrado
          }
          setLoading(false); // Finaliza o carregamento após obter os dados
        }, (error) => {
          console.error('Erro ao ler o status:', error);
          setLoading(false); // Finaliza o carregamento mesmo em caso de erro
        });
  
        // Escuta em tempo real o campo montador (referência ao UID do montador)
        const unsubscribeMontador = onValue(montadorRef, (snapshot) => {
          if (snapshot.exists()) {
            const montadorData = snapshot.val();
            console.log('Dados do montador encontrados:', montadorData);
            setMontador(montadorData);
          } else {
            console.log('Montador não encontrado.');
            setMontador(null); // Reseta o montador se não encontrado
          }
        }, (error) => {
          console.error('Erro ao ler o montador:', error);
        });
  
        // Escuta em tempo real o campo carrinho
        const unsubscribeCarrinho = onValue(carrinhoRef, (snapshot) => {
          if (snapshot.exists()) {
            const carrinhoStatus = snapshot.val();
            console.log(`Status do carrinho: ${carrinhoStatus}`);
            setCarrinho(carrinhoStatus);
          } else {
            console.log('Status do carrinho não encontrado.');
            setCarrinho('nao-retirado'); // Reseta o carrinho se não encontrado
          }
        }, (error) => {
          console.error('Erro ao ler o status do carrinho:', error);
        });
  
        // Cleanup das funções onValue ao desmontar o componente
        return () => {
          unsubscribeStatus();
          unsubscribeMontador();
          unsubscribeCarrinho();
        };
      } else {
        console.error('Rebocador não identificado.');
        setLoading(false); // Finaliza o carregamento se o usuário não estiver presente
      }
    }, [user]);
  
    // Função para marcar o carrinho como retirado e atualizar o status do montador para retirado
    const handleCarrinhoRetirado = async () => {
      if (user && user.uid && montador && montador.uid) {
        const userRef = ref(db, `users/${user.uid}`);
        const montadorRef = ref(db, `users/${montador.uid}`);
        try {
          // Atualiza o campo carrinho do rebocador e o status do montador para "retirado"
          await update(userRef, { carrinho: 'retirado' });
          await update(montadorRef, { status: 'retirado' });
          console.log('Carrinho marcado como retirado, status do montador atualizado para retirado.');
        } catch (error) {
          console.error('Erro ao marcar o carrinho como retirado:', error);
        }
      }
    };
  
    // Função para marcar o carrinho como devolvido e atualizar o status do montador para devolvido
    const handleCarrinhoDevolvido = async () => {
      if (user && user.uid && montador && montador.uid) {
        const userRef = ref(db, `users/${user.uid}`);
        const montadorRef = ref(db, `users/${montador.uid}`);
        try {
          // Atualiza o campo carrinho do rebocador e o status do montador para "devolvido"
          await update(userRef, { carrinho: 'devolvido' });
          await update(montadorRef, { status: 'devolvido' });
          console.log('Carrinho marcado como devolvido, status do montador atualizado para devolvido.');
        } catch (error) {
          console.error('Erro ao marcar o carrinho como devolvido:', error);
        }
      }
    };
  
    if (loading) {
      return <p className="text-xl text-gray-800 mb-4">Carregando solicitações...</p>;
    }
  
    return (
      <div>
        {/* Se o status for true, exibir que está esperando uma solicitação */}
        {status === true && <p className="text-xl text-gray-800 mb-4">Esperando solicitação de retirada de carrinho...</p>}
  
        {/* Se o status for false e o montador tiver dados válidos */}
        {status === false && montador && montador.uid && (
          <div>
            <p className="text-xl text-gray-800 mb-4">{montador.displayName} fez uma solicitação para a estação de montagem.</p>
            <p className="text-xl text-gray-800 mb-4">Detalhes da solicitação:</p>
            <ul>
              <li className="text-lg text-gray-500 pl-2 mb-4">Nome do Montador: {montador.displayName}</li>
              <li className="text-lg text-gray-500 pl-2 mb-4">Estação de montagem: 3</li>
            </ul>
  
            {/* Verificação do status do carrinho */}
            {carrinho === 'nao-retirado' && (
              <div>
                <p className="text-xl text-gray-800 mb-4">O carrinho ainda não foi retirado.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full" onClick={handleCarrinhoRetirado}>
                  Retirado
                </button>
              </div>
            )}
  
            {carrinho === 'retirado' && (
              <div>
                <p className="text-xl text-gray-800 mb-4">Carrinho retirado, reabasteça e leve de volta a estação de montagem 3.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full" onClick={handleCarrinhoDevolvido}>
                  Devolvido
                </button>
              </div>
            )}
  
            {carrinho === 'devolvido' && (
              <p className="text-xl text-gray-800 mb-4">O carrinho foi devolvido com sucesso.</p>
            )}
          </div>
        )}
  
        {/* Se o status for false mas o montador ainda estiver "null", exibir outra mensagem */}
        {status === false && (!montador || montador === "null") && (
          <p>Aguardando mais detalhes do montador...</p>
        )}
      </div>
    );
  }

export default Rebocador;