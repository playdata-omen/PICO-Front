import { useNavigate } from "react-router"

import React from 'react'

function RedirectHandler() {
  let navigate = useNavigate()
  
  const handleServerErr = () => navigate('/err')
  // return (
  //   <div>
      
  //   </div>
  // )
}

export default RedirectHandler

