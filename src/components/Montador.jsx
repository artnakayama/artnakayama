import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase'; // Certifique-se de que o Firebase está corretamente configurado

function Montador({ user }) {
    const [status, setStatus] = useState(''); // Estado para armazenar o status atual
    const [escolhido, setEscolhido] = useState(''); // Estado para armazenar o campo escolhido
    const [loading, setLoading] = useState(true); // Estado de carregamento
  
    useEffect(() => {
      if (user && user.uid) {
        // Referência ao caminho do status e escolhido no Firebase
        const statusRef = ref(db, `users/${user.uid}/status`);
        const escolhidoRef = ref(db, `users/${user.uid}/escolhido`);
  
        // Escuta em tempo real o status do carrinho
        const unsubscribeStatus = onValue(statusRef, (snapshot) => {
          if (snapshot.exists()) {
            const currentStatus = snapshot.val();
            setStatus(currentStatus);
          } else {
            setStatus(''); // Reseta o status se não encontrado
          }
          setLoading(false); // Finaliza o carregamento
        });
  
        // Escuta em tempo real o campo escolhido (rebocador designado)
        const unsubscribeEscolhido = onValue(escolhidoRef, (snapshot) => {
          if (snapshot.exists()) {
            const currentEscolhido = snapshot.val();
            setEscolhido(currentEscolhido);
          } else {
            setEscolhido(''); // Reseta o escolhido se não encontrado
          }
        });
  
        // Cleanup das funções onValue ao desmontar o componente
        return () => {
          unsubscribeStatus();
          unsubscribeEscolhido();
        };
      }
    }, [user]);
  
    // Função para solicitar a remoção do carrinho
    const handleSolicitarRemocao = async () => {
      if (user && user.uid) {
        const userRef = ref(db, `users/${user.uid}`);
        try {
          await update(userRef, { status: 'solicitado' });
          console.log('Status atualizado para "solicitado"');
        } catch (error) {
          console.error('Erro ao atualizar o status:', error);
        }
      }
    };
  
    // Função para confirmar a devolução do carrinho e redefinir campos
    const handleConfirmarDevolucao = async () => {
      if (user && user.uid) {
        const userRef = ref(db, `users/${user.uid}`);
        const rebocadorRef = ref(db, `users/${escolhido.uid}`); // Acessa o rebocador pelo uid

        try {
          // Atualiza o status para "cheio" e define "rebocadores" e "escolhido" como "null"
          await update(userRef, {
            status: 'cheio',
            rebocadores: 'null',
            escolhido: 'null'
          });
          await update(rebocadorRef, {
            status: true, // Rebocador fica disponível novamente
            carrinho: 'nao-retirado', // Reseta o status do carrinho
            montador: 'null', // Reseta o campo montador no rebocador
          });
          console.log('Carrinho devolvido confirmado, status redefinido para "cheio"');
        } catch (error) {
          console.error('Erro ao confirmar a devolução:', error);
        }
      }
    };
  
    if (loading) {
      return <p>Carregando o status do carrinho...</p>;
    }
  
    return (
      <div>

        {/* Status = Cheio: Botão para solicitar a remoção */}
        {status === 'cheio' && (
          <>
          <p className="text-lg text-gray-800 mb-4">Você tem um carrinho na sua estação de montagem!</p>
          <p className="text-lg text-gray-800 mb-4">Deseja solicitar o rebocador já para maior eficiência no tempo de montagem?</p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full" onClick={handleSolicitarRemocao}>
            Solicitar
          </button>
          </>
        )}
  
        {/* Status = Solicitado: Exibir mensagem baseada no campo escolhido */}
        {status === 'solicitado' && (
          <>
            {escolhido === 'null' ? (
              <p className="text-lg text-gray-800 mb-4">Procurando rebocador...</p>
            ) : (
              <p className="text-lg text-gray-800 mb-4">Rebocador encontrado, vindo tirar o carrinho.</p>
            )}
          </>
        )}
  
        {/* Status = Retirado: Exibir mensagem de carrinho retirado */}
        {status === 'retirado' && (
          <p className="text-lg text-gray-800 mb-4">Carrinho foi retirado pelo rebocador.</p>
        )}
  
        {/* Status = Devolvido: Exibir caixa de confirmação para devolução */}
        {status === 'devolvido' && (
          <>
            <p className="text-lg text-gray-800 mb-4">Carrinho devolvido. Confirme a devolução abaixo:</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full" onClick={handleConfirmarDevolucao}>
              Confirmar Devolução
            </button>
          </>
        )}
      </div>
    );
  }

export default Montador;
