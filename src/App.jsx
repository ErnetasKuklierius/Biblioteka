import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Books } from './pages/books'
import { Navbar } from './components/Navbar'

import './App.css'

function App() {

  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
   <Route path = "/" element={<Books />} />
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
