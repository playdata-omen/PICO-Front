import React, { useEffect } from 'react'

function OauthRedirectHandler() {

  let code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    console.log(code)
  })

  return(
    <div>
      {code}
    </div>
  )

}

export default OauthRedirectHandler
