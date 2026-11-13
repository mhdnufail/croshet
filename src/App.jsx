import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import Home from './pages/home'
import Products from './pages/products'
import NotFound from './pages/notFound'


 function App() {
  return (
     <MainLayout>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
     </MainLayout>
    
  )
}

export default App