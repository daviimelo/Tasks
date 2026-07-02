# Tasks App

O **Tasks** é uma solução completa de gestão de tarefas, projetada para ser simples, rápida e eficiente.

---

## Demonstração

| Tela de Autentificação | Tela Inicial (Dashboard) | Adicionar Tarefa | Menu / Perfil |
| :---: | :---: | :---: | :---: |
| <img width="225" height="425" alt="image" src="https://github.com/user-attachments/assets/93e7a637-bfde-4db0-bbd0-b4cd8f9ce827" /> | <img width="225" height="425" alt="image" src="https://github.com/user-attachments/assets/f5fa509e-7a67-4eca-bbda-50cd317cbf45" /> | <img width="225" height="425" alt="image" src="https://github.com/user-attachments/assets/3016410d-5625-4318-9eb0-9672dccfa775" /> | <img width="225" height="425" alt="image" src="https://github.com/user-attachments/assets/3f48025d-8cff-40f9-bc6b-3961f795713b" />


> **Fotos** retiradas do Android Studio.

---

## Tecnologias

### Frontend
* **React Native** com **TypeScript**
* **React Navigation** (para fluxos de tela)

### Backend
* **Node.js** com **Express**
* **Knex.js** (Query Builder)
* **PostgreSQL** (Banco de dados relacional)

---

## Principais Funcionalidades
*   **Gestão de Tarefas:** Adicione, edite, conclua e remova tarefas com facilidade.
*   **Interface Responsiva:** Design focado na experiência do usuário móvel.
*   **Sincronização:** Comunicação fluida com a API para persistência de dados.

---

## Como Executar

### Pré-requisitos
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Yarn](https://yarnpkg.com/) ou npm

### Passo a Passo
1. Clone o repositório:
   `git clone https://github.com/daviimelo/Tasks.git`
2. Entre na pasta: `cd Tasks`
3. **Backend:**
   * Acesse `cd TasksBackend`
   * Instale as dependências: `npm install`
   * Configure o arquivo `.env` (baseado no `.env.example`) com suas credenciais do PostgreSQL.
   * Execute as migrações: `npx knex migrate:latest`
   * Inicie a API: `npm start`
4. **Frontend:**
   * Acesse `cd ../ProjectTasks`
   * Instale as dependências: `npm install`
   * Inicie o projeto: `npm run android`

---

## Autor
**Davi Melo**  
[LinkedIn](https://www.linkedin.com/in/davimelodev/)
