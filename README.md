# Desafio BlueFlow

Crie uma aplicação **API** com proteção de acesso (**autenticação + autorização**) que **liste, pesquise e permita favoritar vídeos do YouTube com um CRUD de favoritos** usando a **API oficial e gratuita do YouTube**.

> ⚠️ **Se atente as regras!**

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
- **Persistência**: armazenar **favoritos** e **usuários** (banco à sua escolha; **preferência: PostgreSQL**).

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
> Mande o Pronto para o email **izaque.vieira@contabilize.eti.br** com o link do repositório público do seu desafio.

Prove seu valor e boa sorte!
