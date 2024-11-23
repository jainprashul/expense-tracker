import Home from '@/view/Home'
import Login from '@/view/login/Login'
import Transaction from '@/view/transaction/Transaction'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type Props = {}

const AppRoutes = (_: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/transactions" element={<Transaction/>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes