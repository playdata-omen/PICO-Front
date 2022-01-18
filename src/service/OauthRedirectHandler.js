import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Spinner from '../components/Spinner/Spinner';
import { auth_actions } from '../_actions/auth_action';

function OauthRedirectHandler() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // respons code 받기
  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');

  // provider
  let provider = url.pathname.substr(url.pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(auth_actions.fetchUser(navigate, code, provider));
  }, []);

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default OauthRedirectHandler;
