import { useState } from 'react'
import './TabelaRoupas.css'

const TabelaRoupas = ({ roupas, onEditar, onRemover }) => {
  const [filtro, setFiltro] = useState('')
  const [ordenacao, setOrdenacao] = useState('id')

  // Usar dados da API ou dados mockados como fallback
  const produtosParaExibir = roupas || []

  // Função para limpar todos os filtros
  const limparFiltros = () => {
    setFiltro('')
    setOrdenacao('id')
  }

  // Filtrar e ordenar dados
  const dadosFiltrados = produtosParaExibir
    .filter(produto => {
      // Filtro por texto (nome, marca, descrição)
      if (filtro) {
        return produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
               produto.marca.toLowerCase().includes(filtro.toLowerCase()) ||
               (produto.descricao && produto.descricao.toLowerCase().includes(filtro.toLowerCase()))
      }
      
      return true
    })
    .sort((a, b) => {
      if (ordenacao === 'nome') return a.nome.localeCompare(b.nome)
      if (ordenacao === 'valor') return a.valor_item - b.valor_item
      if (ordenacao === 'marca') return a.marca.localeCompare(b.marca)
      if (ordenacao === 'id') return a.idproduto - b.idproduto
      return 0
    })

  const handleEditar = (produto) => {
    onEditar(produto)
  }

  const handleRemover = (produto) => {
    onRemover(produto.idproduto, produto.nome)
  }

  // Verificar se há filtros ativos
  const temFiltros = filtro || ordenacao !== 'id'

  return (
    <div className="tabela-roupas-container">
      <div className="tabela-header">
        <div className="filtros">
          {/* Filtro por texto */}
          <div className="filtro-grupo">
            <label htmlFor="filtro-texto" className="filtro-label">Buscar:</label>
            <input
              type="text"
              id="filtro-texto"
              placeholder="Nome, marca ou descrição..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="filtro-input"
            />
          </div>

          {/* Ordenação */}
          <div className="filtro-grupo">
            <label htmlFor="ordenacao" className="filtro-label">Ordenar:</label>
            <select
              id="ordenacao"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="ordenacao-select"
            >
              <option value="id">Por ID</option>
              <option value="nome">Por Nome</option>
              <option value="valor">Por Valor</option>
              <option value="marca">Por Marca</option>
            </select>
          </div>

          {/* Botão Limpar Filtros */}
          {temFiltros && (
            <button
              onClick={limparFiltros}
              className="btn-limpar-filtros"
              title="Limpar todos os filtros"
            >
              🗑️ Limpar Filtros
            </button>
          )}
        </div>

        <div className="tabela-info">
          <span>📦 {dadosFiltrados.length} produto{dadosFiltrados.length !== 1 ? 's' : ''} encontrado{dadosFiltrados.length !== 1 ? 's' : ''}</span>
          {temFiltros && (
            <span className="filtros-ativos">
              🔍 Filtros ativos
            </span>
          )}
        </div>
      </div>

      <div className="tabela-wrapper">
        <table className="tabela-roupas">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Marca</th>
              <th>Tamanho</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((produto) => (
              <tr key={produto.idproduto}>
                <td>{produto.idproduto}</td>
                <td>{produto.nome}</td>
                <td>
                  <span className="descricao-text">
                    {produto.descricao || 'Sem descrição'}
                  </span>
                </td>
                <td>
                  <span className={`marca-badge marca-${produto.marca.toLowerCase().replace(/\s+/g, '-')}`}>
                    {produto.marca}
                  </span>
                </td>
                <td>
                  <span className="tamanho-badge">
                    {produto.tamanho}
                  </span>
                </td>
                <td>
                  <span className="valor-text">
                    R$ {parseFloat(produto.valor_item).toFixed(2)}
                  </span>
                </td>
                <td>
                  <div className="acoes-botoes">
                    <button
                      onClick={() => handleEditar(produto)}
                      className="btn-editar"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleRemover(produto)}
                      className="btn-remover"
                      title="Remover"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dadosFiltrados.length === 0 && (
        <div className="sem-dados">
          <p>Nenhum produto encontrado com os filtros aplicados.</p>
          {temFiltros && (
            <button onClick={limparFiltros} className="btn-limpar-filtros-inline">
              Limpar Filtros
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default TabelaRoupas
