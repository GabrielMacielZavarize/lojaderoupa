import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import TabelaRoupas from '../components/tabelaroupas'
import ConfirmModal from '../components/ConfirmModal'
import { produtosService } from '../services/api'
import './Roupas.css'

const Roupas = () => {
  const [produtos, setProdutos] = useState([])
  const [marcas, setMarcas] = useState([])
  const [tamanhos, setTamanhos] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editando, setEditando] = useState(false)
  const [produtoAtual, setProdutoAtual] = useState({
    id: null,
    nome: '',
    descricao: '',
    idmarca: '',
    idtamanho: '',
    valor_item: ''
  })

  // Estados para o modal de confirmação
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: null
  })

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      setLoading(true)
      const [produtosData, marcasData, tamanhosData] = await Promise.all([
        produtosService.listar(),
        produtosService.listarMarcas(),
        produtosService.listarTamanhos()
      ])
      
      setProdutos(produtosData)
      setMarcas(marcasData)
      setTamanhos(tamanhosData)
    } catch (error) {
      toast.error('Erro ao carregar dados: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const limparFormulario = () => {
    setProdutoAtual({
      id: null,
      nome: '',
      descricao: '',
      idmarca: '',
      idtamanho: '',
      valor_item: ''
    })
  }

  const abrirFormularioAdicionar = () => {
    setEditando(false)
    limparFormulario()
    setMostrarFormulario(true)
  }

  const abrirFormularioEditar = (produto) => {
    setEditando(true)
    setProdutoAtual({
      id: produto.idproduto,
      nome: produto.nome,
      descricao: produto.descricao || '',
      idmarca: produto.idmarca || marcas.find(m => m.marca === produto.marca)?.idmarca || '',
      idtamanho: produto.idtamanho || tamanhos.find(t => t.tamanho === produto.tamanho)?.idtamanho || '',
      valor_item: produto.valor_item.toString()
    })
    setMostrarFormulario(true)
  }

  const fecharFormulario = () => {
    setMostrarFormulario(false)
    limparFormulario()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProdutoAtual(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validarFormulario = () => {
    if (!produtoAtual.nome.trim()) {
      toast.error('Por favor, insira o nome do produto')
      return false
    }
    if (!produtoAtual.idmarca) {
      toast.error('Por favor, selecione a marca')
      return false
    }
    if (!produtoAtual.idtamanho) {
      toast.error('Por favor, selecione o tamanho')
      return false
    }
    if (!produtoAtual.valor_item || parseFloat(produtoAtual.valor_item) <= 0) {
      toast.error('Por favor, insira um valor válido')
      return false
    }
    return true
  }

  const salvarProduto = async () => {
    if (!validarFormulario()) return

    try {
      const produtoData = {
        nome: produtoAtual.nome.trim(),
        descricao: produtoAtual.descricao.trim(),
        idmarca: parseInt(produtoAtual.idmarca),
        idtamanho: parseInt(produtoAtual.idtamanho),
        valor_item: parseFloat(produtoAtual.valor_item)
      }

      if (editando) {
        await produtosService.atualizar(produtoAtual.id, produtoData)
        toast.success('Produto atualizado com sucesso!')
      } else {
        await produtosService.criar(produtoData)
        toast.success('Produto adicionado com sucesso!')
      }

      fecharFormulario()
      carregarDados() // Recarregar dados
    } catch (error) {
      toast.error('Erro ao salvar produto: ' + error.message)
    }
  }

  const abrirConfirmacaoRemocao = (id, nome) => {
    setConfirmModal({
      isOpen: true,
      title: 'Remover Produto',
      message: `Tem certeza que deseja remover "${nome}"?\n\n⚠️ ATENÇÃO: Se o produto estiver vinculado a compras, os registros relacionados também serão removidos.`,
      type: 'danger',
      onConfirm: () => removerProduto(id)
    })
  }

  const removerProduto = async (id) => {
    try {
      await produtosService.remover(id)
      toast.success('Produto removido com sucesso!')
      carregarDados() // Recarregar dados
    } catch (error) {
      toast.error('Erro ao remover produto: ' + error.message)
    }
  }

  const fecharConfirmacao = () => {
    setConfirmModal({
      isOpen: false,
      title: '',
      message: '',
      type: 'warning',
      onConfirm: null
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    )
  }

  return (
    <div className="roupas-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Gerenciamento de Produtos</h1>
          <p>Adicione, edite e gerencie o catálogo de produtos</p>
        </div>
        <button 
          onClick={abrirFormularioAdicionar}
          className="btn-adicionar"
        >
          ➕ Adicionar Produto
        </button>
      </div>

      <TabelaRoupas 
        roupas={produtos}
        onEditar={abrirFormularioEditar}
        onRemover={abrirConfirmacaoRemocao}
      />

      {/* Modal do Formulário */}
      {mostrarFormulario && (
        <div className="modal-overlay" onClick={fecharFormulario}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editando ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
              <button onClick={fecharFormulario} className="btn-fechar">✕</button>
            </div>

            <form className="form-roupa" onSubmit={(e) => { e.preventDefault(); salvarProduto(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nome">Nome do Produto *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={produtoAtual.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: Tênis Air Max"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descricao">Descrição</label>
                  <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={produtoAtual.descricao}
                    onChange={handleInputChange}
                    placeholder="Ex: Tênis confortável para corrida"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="idmarca">Marca *</label>
                  <select
                    id="idmarca"
                    name="idmarca"
                    value={produtoAtual.idmarca}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma marca</option>
                    {marcas.map(marca => (
                      <option key={marca.idmarca} value={marca.idmarca}>
                        {marca.marca}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="idtamanho">Tamanho *</label>
                  <select
                    id="idtamanho"
                    name="idtamanho"
                    value={produtoAtual.idtamanho}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um tamanho</option>
                    {tamanhos.map(tamanho => (
                      <option key={tamanho.idtamanho} value={tamanho.idtamanho}>
                        {tamanho.tamanho}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="valor_item">Valor (R$) *</label>
                  <input
                    type="number"
                    id="valor_item"
                    name="valor_item"
                    value={produtoAtual.valor_item}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={fecharFormulario} className="btn-cancelar">
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  {editando ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={fecharConfirmacao}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText="Remover"
        cancelText="Cancelar"
      />
    </div>
  )
}

export default Roupas
