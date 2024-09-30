# INTRODUÇÃO   #
![image](https://github.com/user-attachments/assets/8ad5ffb1-e34c-4c18-bc27-eb564618dfb4)

A empresa Jhon Deere sofre ,atualmente, uma serie de problemas relacionados a tempo e logistica dentro de sua fábrica durante a operação de reabastecimento da linha. Esse fluxo de ações ocrre de maneira desenfreada gera perda 
 de recursos decorrente de sua organização atualmente e disponibilidde de rebocadores dentro do perímetro de sua fabrica. 

 Diante disso, a empresa nos propôs um projeto para diminuir o tempo e o custo de recursos enquanto aumenta a efetividade de sua operação. O projeto tem como objetivo, criar uma rede de monitoramento e rastreamento de seus rebocadores e operadores além de criar estratégias que consigam administrar a logística dentro da fábrica.
 No projeto D.A.T.A, a aplicação acontecerá com o rastreamento em tempo real dos rebocadores com a cooperação de um site capaz de gerenciar o fluxo e agilizar as ações ao automatizar processos.

 




# DESENVOLVIMENTO #

O PROJETO D.A.T.A 


FUNCIONALIDADES:


- Triangulação Wi-Fi: O sistema utiliza múltiplos pontos de acesso Wi-Fi para calcular a localização do ESP32 com base na intensidade do sinal.

- Monitoramento de Disponibilidade: Um site web se comunica com o ESP32 para mostrar em tempo real quando ele está "livre" (sem peso na balança).

- Balança Integrada: O ESP32 é equipado com um sensor de peso que, quando detecta 0 peso, envia uma notificação ao site, indicando que o dispositivo está disponível.

- Comunicação via HTTP: A comunicação entre o site e o ESP32 é feita por requisições HTTP simples.
  


Como Funciona: 


O projeto tem a ideia base de construir um software capaz de rastrear os robocadores a partir de roteadores e o microcontroladro esp32, ( explicação ).   O sit deve ser atuar como um facilitador e organizador da operação, de modo que, ele coopere com as ações que ocorrem simultaneamente. É a partir do site que o indivído para a requisição e o mesmo que operará e indicará qual o rebocador disponivel para buscar as peças, após isso, o rebocador fará o processo rotineiro até a entrega dos materiasi, no local, haverá a célula de carga conectada a um esp32, essa célula, ou balança, enviará sinais de como se desenvolve essa requisição; a partir do peso máxmimo e o quanto do mesmo já foi descarregado. Quando a balança chegar a 0, o rebocador poderá ser marcado como "disponível".



Arquitetura do projeto 










Tecnologias envolvidas: 


- Firebase : realtime database - servidor em nuvem que hospeda a aplicação 
- framework - react - Foi utilizado para criar o site que coopera com os esp32
- Célula de Carga - utilizado para o desenvolvimento da ação0
- Microcontrolador Esp32- - usado pela facilidade de aplicação e conexão wifi que possibilitará o reconhecimento de sua posição e seu movimento


    



* Codigo Fonte *

* Resultados Esperados

Contudo, os resultados esperados são o funcionamento do sofware em conjunto do hardware capaz de organizar e agilizar o processo de requisição, de modo que o sofware consiga identificar o rebocador mais próximo e que tenha a maior eficiencia em atender a linha, para evitar perda de tempo, com isso, o mesmo sistema irá acompanhar todo fluxo de ações até o fim do processo. Além de, com o aplicativo, o indivíduo que requisitou o material saberá do desenvolvimento de cada ação até o fim da operação.

A empresa Jhon Deere sofre ,atualmente, uma serie de problemas relacionados a tempo e logistica dentro de sua fábrica durante a operação de reabastecimento da linha. Esse fluxo de ações ocrre de maneira desenfreada gera perda 
 de recursos decorrente de sua organização atualmente e disponibilidde de rebocadores dentro do perímetro de sua fabrica. 

 Diante disso, a empresa nos propôs um projeto para diminuir o tempo e o custo de recursos enquanto aumenta a efetividade de sua operação. O projeto tem como objetivo, criar uma rede de monitoramento e rastreamento de seus rebocadores e operadores além de criar estratégias que consigam administrar a logística dentro da fábrica.
 No projeto D.A.T.A, a aplicação acontecerá com o rastreamento em tempo real dos rebocadores com a cooperação de um site capaz de gerenciar o fluxo e agilizar as ações ao automatizar processos.

 




# DESENVOLVIMENTO #

O PROJETO D.A.T.A 


FUNCIONALIDADES:


- Triangulação Wi-Fi: O sistema utiliza múltiplos pontos de acesso Wi-Fi para calcular a localização do ESP32 com base na intensidade do sinal.

- Monitoramento de Disponibilidade: Um site web se comunica com o ESP32 para mostrar em tempo real quando ele está "livre" (sem peso na balança).

- Balança Integrada: O ESP32 é equipado com um sensor de peso que, quando detecta 0 peso, envia uma notificação ao site, indicando que o dispositivo está disponível.

- Comunicação via HTTP: A comunicação entre o site e o ESP32 é feita por requisições HTTP simples.
  


Como Funciona: 


O projeto tem a ideia base de construir um software capaz de rastrear os robocadores a partir de roteadores e o microcontroladro esp32, ( explicação ).   O sit deve ser atuar como um facilitador e organizador da operação, de modo que, ele coopere com as ações que ocorrem simultaneamente. É a partir do site que o indivído para a requisição e o mesmo que operará e indicará qual o rebocador disponivel para buscar as peças, após isso, o rebocador fará o processo rotineiro até a entrega dos materiasi, no local, haverá a célula de carga conectada a um esp32, essa célula, ou balança, enviará sinais de como se desenvolve essa requisição; a partir do peso máxmimo e o quanto do mesmo já foi descarregado. Quando a balança chegar a 0, o rebocador poderá ser marcado como "disponível".



Arquitetura do projeto 


https://drive.google.com/file/d/1iMaaeDuGcrGalyFycIakm_qp9zVC51uC/view?usp=sharing






Tecnologias envolvidas: 


- Firebase : realtime database - servidor em nuvem que hospeda a aplicação 
- framework - react - Foi utilizado para criar o site que coopera com os esp32
- Célula de Carga - utilizado para o desenvolvimento da ação0
- Microcontrolador Esp32- - usado pela facilidade de aplicação e conexão wifi que possibilitará o reconhecimento de sua posição e seu movimento


  Bibliotecas:
  - Esp_now
  - Firebase ESP32 Client


    




# Resultados Esperados #

Contudo, os resultados esperados são o funcionamento do sofware em conjunto do hardware capaz de organizar e agilizar o processo de requisição, de modo que o sofware consiga identificar o rebocador mais próximo e que tenha a maior eficiencia em atender a linha, para evitar perda de tempo, com isso, o mesmo sistema irá acompanhar todo fluxo de ações até o fim do processo. Além de, com o aplicativo, o indivíduo que requisitou o material saberá do desenvolvimento de cada ação até o fim da operação.
