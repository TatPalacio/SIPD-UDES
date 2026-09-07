import { Routes, Route } from 'react-router-dom'

import Login from './Login.jsx'
import Home from './Home.jsx'
import Estudiantes from './Estudiantes.jsx'
import Seguimiento from './Seguimiento.jsx'

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Estudiantes" element={<Estudiantes />} />
      <Route path="/Seguimiento" element={<Seguimiento />} />
    </Routes>
  )
}

export default App