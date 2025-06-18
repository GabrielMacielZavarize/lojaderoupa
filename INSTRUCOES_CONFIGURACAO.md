# 🚀 INSTRUÇÕES DE CONFIGURAÇÃO - LOJA DE ROUPAS

## ✅ O que já foi feito:

1. ✅ Backend criado com Express + PostgreSQL
2. ✅ API REST completa para produtos
3. ✅ Frontend atualizado para usar a API
4. ✅ Dependências do backend instaladas
5. ✅ Estrutura de arquivos organizada

## 🔧 PRÓXIMOS PASSOS:

### 1. Configurar a Senha do PostgreSQL

**IMPORTANTE:** Você precisa editar o arquivo `backend/config.env` e substituir `sua_senha_aqui` pela sua senha real do PostgreSQL.

```bash
# Abra o arquivo backend/config.env e altere:
DB_PASSWORD=sua_senha_aqui
# Para:
DB_PASSWORD=SUA_SENHA_REAL_AQUI
```

### 2. Testar a Conexão

1. **Inicie o servidor backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Verifique se aparece:**
   ```
   🚀 Servidor rodando na porta 3001
   ✅ Conectado ao PostgreSQL
   ```

### 3. Iniciar o Frontend

1. **Em outro terminal, na pasta raiz:**
   ```bash
   npm run dev
   ```

2. **Acesse:** `http://localhost:5173`

## 🎯 O que você verá:

- **Tabela de produtos** com dados do seu banco PostgreSQL
- **Formulário para adicionar/editar** produtos
- **Filtros e ordenação** funcionando
- **Marcas e tamanhos** carregados do banco

## 🔍 Se algo não funcionar:

### Erro de Conexão com Banco:
- Verifique se o PostgreSQL está rodando
- Confirme a senha no `config.env`
- Teste no pgAdmin 4

### Erro de CORS:
- Certifique-se que o backend está na porta 3001
- Frontend na porta 5173

### Erro de Dependências:
- Execute `npm install` na pasta raiz também

## 📞 Suporte:

Se encontrar problemas, verifique:
1. Logs do terminal do backend
2. Console do navegador (F12)
3. Se o banco tem os dados inseridos

## 🎉 Pronto!

Após seguir esses passos, você terá um CRUD completo conectado ao seu PostgreSQL local! 🚀 