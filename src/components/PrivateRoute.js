import React from 'react'
import { Navigate } from 'react-router'


function PrivateRoute({ children, authenticated }) {
  return authenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute

