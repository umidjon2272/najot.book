import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import Cart from './pages/Cart/Cart'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound/NotFound'



const App = () => {
    return (
        <div style={{ background: '#1a1a2e', minHeight: '100vh', color: 'white' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/najot-admin-7x9k2" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App