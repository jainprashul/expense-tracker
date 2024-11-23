import Layout from '@/components/shared/Layout'
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
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/transactions" element={<Transaction/>} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes