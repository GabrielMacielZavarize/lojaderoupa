const pool = require('./database');

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com PostgreSQL...');
    
    // Teste básico de conexão
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Conexão bem-sucedida!');
    console.log('⏰ Hora atual do banco:', result.rows[0].current_time);
    
    // Teste de consulta na tabela produto
    const produtos = await pool.query('SELECT COUNT(*) as total FROM produto');
    console.log('📦 Total de produtos:', produtos.rows[0].total);
    
    // Teste de consulta na tabela marca
    const marcas = await pool.query('SELECT COUNT(*) as total FROM marca');
    console.log('🏷️ Total de marcas:', marcas.rows[0].total);
    
    // Teste de consulta na tabela tamanho
    const tamanhos = await pool.query('SELECT COUNT(*) as total FROM tamanho');
    console.log('📏 Total de tamanhos:', tamanhos.rows[0].total);
    
    console.log('\n🎉 Todos os testes passaram! O banco está funcionando perfeitamente.');
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.log('\n🔧 Possíveis soluções:');
    console.log('1. Verifique se o PostgreSQL está rodando');
    console.log('2. Confirme a senha no arquivo config.env');
    console.log('3. Verifique se o banco "lojaderoupa" existe');
    console.log('4. Teste a conexão no pgAdmin 4');
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection(); 