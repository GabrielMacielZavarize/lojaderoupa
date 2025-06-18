import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Roupas from './pages/roupas'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <NavLink to="/" className="nav-logo">
              Loja de Roupas
            </NavLink>
            <ul className="nav-menu">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/roupas" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Gerenciar Roupas
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="home-page">
                <h2>Bem-vindo à Loja de Roupas</h2>
                <p>Sistema de gerenciamento de produtos</p>
                <NavLink to="/roupas" className="btn-primary">
                  Gerenciar Roupas
                </NavLink>
              </div>
            } />
            <Route path="/roupas" element={<Roupas />} />
          </Routes>
        </main>

        {/* Toast Container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '10px',
              fontSize: '14px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App
