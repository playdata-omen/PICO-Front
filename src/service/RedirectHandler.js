import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router"
import Spinner from '../components/Spinner/Spinner'
import { Navigate } from 'react-router'



export const ErrRedirectHandler = () => {
  let navigate = useNavigate()

  useEffect(() => {
    navigate('/err')
  }, [])

  return (
    <div>
    </div>
  )
}


export const UploadWorkRedirectHandler = ({}) => {

  const [loading, setLoading] = useState(true)
  return (

    loading ?
    <Spinner /> 

    :

    <Navigate to="/myPage" />
  )
}


