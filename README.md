# Canto do Gabriel/Decisões&Notes

Optei por utilizar docker por estar trabalhando com microsserviços.

antes de iniciar a aplicação, sete as **environment variables** no .env:
```
MONGO_USER=
MONGO_PASSWORD=
MONGO_DB=
MONGO_PORT=
AUTH_API_PORT=
JWT_SECRET=
RABBIT_USER=
RABBIT_PASS=
VIDEOS_API_PORT=
YOUTUBE_API_KEY=
```

para iniciar a aplicação, na raiz do projeto rode `docker compose up --build`

Explicando:
    auth-service: responsavel pelo login/registro (nao interage com rabbit)
    videos-service: tem logica de busca de videos e registra os favoritos por mensageria
    fvorites-service: recebe os favoritados por mensageria e adiciona no banco

auth-service:
* api recebe as credenciais no formato: `{ "name": "username", "pass": "pass" }`
* fazer login: POST `http://localhost:3000/api/auth/login` - possíveis respostas:  `BAD_REQUEST` `UNAUTHORIZED` `INTERNAL_SERVER_ERROR` `OK`
* registrar user: POST `http://localhost:3000/api/auth/register` - possíveis respostas: `BAD_REQUEST` `CONFLICT` `CREATED`
* Ao registrar conta, dados sensíveis vão criptografados para o banco
* Ao logar, é retornado o token JWT
### Setup

videos-service:
* possui middleware de autenticação
* enviar no authorization o token retornado ao fazer login
* listar videos: GET `http://localhost:3001/api/videos?q=Query`
* registrar favorito: POST `http://localhost:3001/api/videos`
* ver favoritos: GET `http://localhost:3001/api/favorites`
* Ao logar, é retornado o token JWT

### `postman.json` > Contendo modelos das requests no postman

favorite-service:
* serviço simples
* recebe mensagens e registra o video como favorito

### Pendências
* testes jest > ficou pouco tempo, nao é o suficiente para eu entender e criar
* front-end > tempo também, não é dificil adicionar um conteiner pro front tbm
*


# Desafio BlueFlow

Crie uma aplicação **API** com proteção de acesso (**autenticação + autorização**) que **liste, pesquise e permita favoritar vídeos do YouTube com um CRUD de favoritos** usando a **API oficial e gratuita do YouTube**.

⚠️ **Se atente as regras!**

## 🎯 Objetivo
Entregar um sistema **simples, funcional e bem estruturado**, com **backend** construído em **microsserviços** (ex.: `auth-service`, `videos-service`, `favorites-service`).

---

## 🏗️ Arquitetura (exigida)
- **Microsserviços** no backend (ex.: serviço de **auth**, **vídeos**, **favoritos**).
- Comunicação entre serviços via RabbitMQ.
- Aplicar **POO** e **design patterns** adequados (**Factory**, **Strategy**, **Adapter**, etc.).
- Testes automatizados com **Jest** ou similares.


## ✅ Funcionalidades Mínimas
- **Autenticação/Autorização**: fluxo de login e controle de acesso a rotas protegidas.
- **Listagem/Pesquisa**: consumir a **API gratuita do YouTube** para listar e pesquisar vídeos.
- **Favoritos**: marcar/desmarcar vídeos como favoritos **por usuário autenticado**.
- **Persistência**: armazenar **favoritos** e **usuários** (banco à sua escolha; **preferência: PostgreSQL e/ou MongoDB**).

---

## 💾 Persistência
- Pode ser qualquer banco relacional ou não relacional (**preferência pelo PostgreSQL e/ou MongoDB**).
- Modele as tabelas/coleções **mínimas** para: `users`, `favorites`.

---

## 🧪 O que será avaliado
- **Qualidade do código**: organização, legibilidade, **testes básicos**.
- **Arquitetura**: **isolamento** entre serviços, **contratos claros** e mensagens/erros compreensíveis.
- **Boas práticas**: **SOLID**, tratamento de erros, logs, variáveis de ambiente.
- **Segurança**: proteção de rotas, **armazenamento seguro** de credenciais/chaves.
- **UX essencial**: interface **simples** e **funcional** no frontend.
- Fazer um frontend é um diferencial.

---

## 📦 Entregáveis
- **Repositório** com o código de **todos os serviços**.
- **README** explicando **setup**, `**.env.example**`, scripts de build/run.
- **Instruções de execução locais** (**Docker opcional**).
- **Coleção de APIs** (arquivo `.http`, `curl` ou **Postman**).

---

## 💡 Dicas finais
- **Documente** decisões técnicas e **trade-offs**.
- **Foque no essencial**: faça o **feijão com arroz**.
- Não se preocupe em não conseguir implementar algo, analisarei o trabalho como um todo e em que ponto parou.

## Atenção!
Para entrega, faça um **FORK** desse repositório e mande um Pull Request do seu desafio até às 23:59:59h do dia 16 de outubro de 2025 no fuso horário de Brasília.

Prove seu valor e boa sorte!
