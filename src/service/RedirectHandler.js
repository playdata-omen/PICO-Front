import React, { useEffect } from 'react'
import { useNavigate } from "react-router"



function RedirectHandler() {
  let navigate = useNavigate()
  
  useEffect(() => {
    navigate('/err')
  }, [])

  return (
    <div>
    </div>
  )
}

export default RedirectHandler

