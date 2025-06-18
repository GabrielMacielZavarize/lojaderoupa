# Loja de Roupas - Sistema de Gerenciamento

Sistema completo de gerenciamento de produtos para loja de roupas com frontend React e backend Node.js conectado ao PostgreSQL.

## 🚀 Funcionalidades

- ✅ CRUD completo de produtos
- ✅ Integração com PostgreSQL
- ✅ Interface moderna e responsiva
- ✅ Filtros e ordenação
- ✅ Validação de formulários
- ✅ Notificações em tempo real

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior)
- pgAdmin 4 (para gerenciamento do banco)

## 🛠️ Configuração

### 1. Banco de Dados PostgreSQL

1. **Crie o banco de dados no pgAdmin 4:**
   - Nome: `lojaderoupa`
   - Usuário: `postgres`
   - Senha: (sua senha do PostgreSQL)

2. **Execute os scripts SQL fornecidos** para criar as tabelas e inserir dados de exemplo.

### 2. Configuração do Backend

1. **Navegue para a pasta backend:**
   ```bash
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Edite o arquivo `config.env`
   - Substitua `sua_senha_aqui` pela sua senha real do PostgreSQL

4. **Inicie o servidor backend:**
   ```bash
   npm run dev
   ```

   O servidor estará disponível em: `http://localhost:3001`

### 3. Configuração do Frontend

1. **Em outro terminal, navegue para a pasta raiz:**
   ```bash
   cd ..
   ```

2. **Instale as dependências (se ainda não instalou):**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

   O frontend estará disponível em: `http://localhost:5173`

## 📁 Estrutura do Projeto

```
lojaderoupa/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── services/          # Serviços de API
│   └── ...
├── backend/               # Backend Node.js
│   ├── routes/            # Rotas da API
│   ├── database.js        # Configuração do banco
│   ├── server.js          # Servidor principal
│   └── config.env         # Variáveis de ambiente
└── ...
```

## 🔧 Endpoints da API

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/:id` - Buscar produto por ID
- `POST /api/produtos` - Criar novo produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Remover produto

### Marcas e Tamanhos
- `GET /api/produtos/marcas/listar` - Listar todas as marcas
- `GET /api/produtos/tamanhos/listar` - Listar todos os tamanhos

## 🎯 Como Usar

1. **Acesse a aplicação:** `http://localhost:5173`
2. **Visualize os produtos** na tabela principal
3. **Adicione novos produtos** clicando em "Adicionar Produto"
4. **Edite produtos** clicando no ícone de edição (✏️)
5. **Remova produtos** clicando no ícone de lixeira (🗑️)
6. **Filtre e ordene** usando os controles na parte superior

## 🔍 Troubleshooting

### Problemas de Conexão com o Banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `config.env`
- Teste a conexão no pgAdmin 4

### Problemas de CORS
- Verifique se o backend está rodando na porta 3001
- Confirme se o frontend está na porta 5173

### Erros de Dependências
- Execute `npm install` em ambas as pastas (raiz e backend)
- Verifique se o Node.js está atualizado

## 📝 Notas Importantes

- **Senha do PostgreSQL:** Sempre use uma senha segura em produção
- **Variáveis de ambiente:** Nunca commite senhas no controle de versão
- **Backup:** Faça backup regular do banco de dados
- **Logs:** Monitore os logs do servidor para identificar problemas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
