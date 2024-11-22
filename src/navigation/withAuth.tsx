import React from 'react'
import { Navigate } from 'react-router-dom'

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }

    return <Component {...props} />
  }
}

export default withAuth