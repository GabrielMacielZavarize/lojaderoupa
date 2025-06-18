const express = require('express');
const cors = require('cors');
const produtosRoutes = require('./routes/produtos');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // URL do seu frontend React
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/produtos', produtosRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API da Loja de Roupas funcionando!',
    endpoints: {
      produtos: '/api/produtos',
      marcas: '/api/produtos/marcas/listar',
      tamanhos: '/api/produtos/tamanhos/listar'
    }
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota para requisições não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`🔗 Frontend: http://localhost:5173`);
}); 