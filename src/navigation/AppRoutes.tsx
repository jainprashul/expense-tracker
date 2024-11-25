import Layout from '@/components/shared/Layout'
import Home from '@/view/home/Home'
import Login from '@/view/login/Login'
import AddTransaction from '@/view/transaction/AddTransaction'
import Transaction from '@/view/transaction/TransactionPage'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import onAppStart from './onAppStart'
import Signup from '@/view/signup/Signup'

type Props = {}

const AppRoutes = (_: Props) => {
  useEffect(() => {
    onAppStart();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes