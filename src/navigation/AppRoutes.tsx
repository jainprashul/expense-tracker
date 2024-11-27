import Layout from '@/components/shared/Layout'
import Home from '@/view/home/Home'
import Login from '@/view/login/Login'
import TransactionForm from '@/view/transaction/TransactionForm'
import Transaction from '@/view/transaction/TransactionPage'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import onAppStart from './onAppStart'
import Signup from '@/view/signup/Signup'
import TransactionDetail from '@/view/transaction/TransactionDetail'
import { ANALYTICS, HOME, LOGIN, PROFILE, REGISTER, RESET_PASSWORD, SETTINGS, TRANSACTION_ADD, TRANSACTION_DETAIL, TRANSACTION_EDIT, TRANSACTIONS } from './route'
import ResetPassword from '@/view/login/ResetPassword'
import Analytics from '@/view/analytics/Analytics'
import Profile from '@/view/profile/Profile'
import Settings from '@/view/settings/Settings'

type Props = {}

const AppRoutes = (_: Props) => {
  useEffect(() => {
    onAppStart();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Signup/>} />
        <Route path={RESET_PASSWORD} element={<ResetPassword/>} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path={HOME} element={<Home />} />
              <Route path={PROFILE} element={<Profile />} />
              <Route path={SETTINGS} element={<Settings />} />
              <Route path={TRANSACTIONS} element={<Transaction />} />
              <Route path={TRANSACTION_DETAIL} element={<TransactionDetail />} />
              <Route path={TRANSACTION_EDIT} element={<TransactionForm edit />} />
              <Route path={TRANSACTION_ADD} element={<TransactionForm />} />
              <Route path={ANALYTICS} element={<Analytics />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes