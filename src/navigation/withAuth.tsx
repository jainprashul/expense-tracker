import Loading from '@/components/shared/Loading'
import supabase from '@/lib/supabase'
import { authActions } from '@/store/context/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { LOGIN } from './route'

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = React.useState(true)

    const isAuthenticated = useAppSelector((state) => !!state.auth.session)

    useEffect(() => {
      
      supabase.auth.getSession().then((data) => {
        dispatch(authActions.setSession(data.data.session))
        if (data.data.session) {
          dispatch(authActions.setUser(data.data.session.user!))
        }
      }).finally(() => {
        setLoading(false)
      })

      supabase.auth.onAuthStateChange((event, session) => {
        dispatch(authActions.setSession(session))
        if (event === 'SIGNED_IN' && session) {
          dispatch(authActions.setUser(session.user!))
        }
        if (event === 'SIGNED_OUT')
          dispatch(authActions.setUser(null))
      })
    }, [])

    if (loading) {
      return <Loading />
    }
    
    if (!isAuthenticated) {
      return <Navigate to={LOGIN} />
    }

    return <Component {...props} />
  }
}

export default withAuth