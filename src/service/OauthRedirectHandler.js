import React, { useEffect } from 'react'
import serverAxios from '../utils/serverAxios';

function OauthRedirectHandler() {

  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    serverAxios.get('test').then(res=> console.log('test'))
  })

  return(
    <div>
      {code}
    </div>
  )

}

export default OauthRedirectHandler
