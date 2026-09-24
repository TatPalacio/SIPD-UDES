import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Login from './Login.jsx'
import Home from './Home.jsx'
import Estudiantes from './Estudiantes.jsx'
import Intervenciones from './Intervenciones.jsx'
import DetalleEstudiante from './DetalleEstudiante.jsx'

function RoutedView({ children }) {
  const navigate = useNavigate()
  const onNavigate = (key) => {
    const routes = {
      dashboard: '/home',
      estudiantes: '/estudiantes',
      intervenciones: '/intervenciones',
    }
    navigate(routes[key] || '/home')
  }

  return children({ navigate, onNavigate })
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<RoutedView>{({ navigate }) => <Login onLogin={() => navigate('/home')} />}</RoutedView>} />
      <Route path="/home" element={<RoutedView>{({ onNavigate, navigate }) => <Home onNavigate={onNavigate} onViewStudent={() => navigate('/estudiantes/EST-1001')} onViewAllRisk={() => navigate('/estudiantes')} />}</RoutedView>} />
      <Route path="/estudiantes" element={<RoutedView>{({ onNavigate, navigate }) => <Estudiantes onNavigate={onNavigate} onViewStudent={(codigo) => navigate(`/estudiantes/${codigo}`)} onAddStudent={() => window.alert('El registro de estudiantes estará disponible próximamente.')} />}</RoutedView>} />
      <Route path="/estudiantes/:codigo" element={<RoutedView>{({ onNavigate, navigate }) => <DetalleEstudiante onNavigate={onNavigate} onBack={() => navigate('/estudiantes')} />}</RoutedView>} />
      <Route path="/intervenciones" element={<RoutedView>{({ onNavigate }) => <Intervenciones onNavigate={onNavigate} />}</RoutedView>} />
      <Route path="/seguimiento" element={<Navigate to="/intervenciones" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export default App