const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET - Listar marcas (deve vir antes das rotas com ID)
router.get('/marcas/listar', async (req, res) => {
  try {
    const query = 'SELECT * FROM marca ORDER BY marca';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Listar tamanhos (deve vir antes das rotas com ID)
router.get('/tamanhos/listar', async (req, res) => {
  try {
    const query = 'SELECT * FROM tamanho ORDER BY tamanho';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar tamanhos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Listar todos os produtos com marca e tamanho
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.idproduto,
        p.nome,
        p.descricao,
        p.valor_item,
        m.marca,
        t.tamanho
      FROM produto p
      INNER JOIN marca m ON p.idmarca = m.idmarca
      INNER JOIN tamanho t ON p.idtamanho = t.idtamanho
      ORDER BY p.nome
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        p.idproduto,
        p.nome,
        p.descricao,
        p.valor_item,
        p.idmarca,
        p.idtamanho,
        m.marca,
        t.tamanho
      FROM produto p
      INNER JOIN marca m ON p.idmarca = m.idmarca
      INNER JOIN tamanho t ON p.idtamanho = t.idtamanho
      WHERE p.idproduto = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Verificar se produto pode ser removido
router.get('/:id/verificar-remocao', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se existe na tabela compras_itens
    const comprasResult = await pool.query(
      'SELECT COUNT(*) as total FROM compras_itens WHERE idproduto = $1', 
      [id]
    );
    
    const temCompras = parseInt(comprasResult.rows[0].total) > 0;
    
    res.json({
      podeRemover: !temCompras,
      temCompras: temCompras,
      mensagem: temCompras 
        ? 'Este produto não pode ser removido pois está vinculado a compras. Serão removidos os registros relacionados automaticamente.' 
        : 'Produto pode ser removido sem problemas.'
    });
  } catch (error) {
    console.error('Erro ao verificar remoção:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar novo produto
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, idmarca, idtamanho, valor_item } = req.body;
    
    // Validações
    if (!nome || !idmarca || !idtamanho || !valor_item) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }
    
    // Primeiro, buscar o próximo ID disponível
    const maxIdResult = await pool.query('SELECT COALESCE(MAX(idproduto), 0) + 1 as next_id FROM produto');
    const nextId = maxIdResult.rows[0].next_id;
    
    const query = `
      INSERT INTO produto (idproduto, nome, descricao, idmarca, idtamanho, valor_item)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING idproduto
    `;
    
    const result = await pool.query(query, [nextId, nome, descricao, idmarca, idtamanho, valor_item]);
    
    res.status(201).json({ 
      id: result.rows[0].idproduto,
      message: 'Produto criado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, idmarca, idtamanho, valor_item } = req.body;
    
    // Validações
    if (!nome || !idmarca || !idtamanho || !valor_item) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }
    
    const query = `
      UPDATE produto 
      SET nome = $1, descricao = $2, idmarca = $3, idtamanho = $4, valor_item = $5
      WHERE idproduto = $6
      RETURNING idproduto
    `;
    
    const result = await pool.query(query, [nome, descricao, idmarca, idtamanho, valor_item, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Remover produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Primeiro, remover registros relacionados na tabela compras_itens
    await pool.query('DELETE FROM compras_itens WHERE idproduto = $1', [id]);
    
    // Depois, remover o produto
    const query = 'DELETE FROM produto WHERE idproduto = $1 RETURNING idproduto';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router; 