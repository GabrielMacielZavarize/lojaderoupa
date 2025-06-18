const API_BASE_URL = 'http://localhost:3001/api';

// Função para fazer requisições HTTP
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição API:', error);
    throw error;
  }
};

// Serviços de Produtos
export const produtosService = {
  // Listar todos os produtos
  listar: () => apiRequest('/produtos'),
  
  // Buscar produto por ID
  buscarPorId: (id) => apiRequest(`/produtos/${id}`),
  
  // Criar novo produto
  criar: (produto) => apiRequest('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto),
  }),
  
  // Atualizar produto
  atualizar: (id, produto) => apiRequest(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto),
  }),
  
  // Remover produto
  remover: (id) => apiRequest(`/produtos/${id}`, {
    method: 'DELETE',
  }),
  
  // Listar marcas
  listarMarcas: () => apiRequest('/produtos/marcas/listar'),
  
  // Listar tamanhos
  listarTamanhos: () => apiRequest('/produtos/tamanhos/listar'),
};

export default apiRequest; 