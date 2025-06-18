-- Script para corrigir a estrutura da tabela produto
-- Execute este script no pgAdmin 4

-- 1. Adicionar sequência para auto-incremento
CREATE SEQUENCE IF NOT EXISTS produto_idproduto_seq;

-- 2. Alterar a coluna idproduto para usar a sequência
ALTER TABLE produto ALTER COLUMN idproduto SET DEFAULT nextval('produto_idproduto_seq');

-- 3. Definir a sequência para começar do próximo valor disponível
SELECT setval('produto_idproduto_seq', (SELECT COALESCE(MAX(idproduto), 0) + 1 FROM produto));

-- 4. Alterar a propriedade da coluna para SERIAL
ALTER TABLE produto ALTER COLUMN idproduto SET NOT NULL;

-- 5. Verificar se funcionou
SELECT * FROM produto ORDER BY idproduto DESC LIMIT 5; 