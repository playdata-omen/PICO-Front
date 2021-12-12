import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage/MyPage';
import LoginPage from './pages/LoginPage/LoginPage';

import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import OauthRedirectHandler from './service/OauthRedirectHandler';
import MainPage from './pages/MainPage/MainPage';
import SearchResultPage from './pages/SearchResultPage.js/SearchResultPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import EstimatePage from './pages/EstimatePage/EstimatePage';
import EstimateRequestPage from './pages/EstimateRequestPage/EstimateRequestPage';

function App() {

  const auth = useSelector(store => store.auth)

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
        <Route exact path="/login" element={<LoginPage />}/>
        <Route exact path="/oauth/callback/*" element={<OauthRedirectHandler />}/>
        <Route exact path="/searchResult/:type/:search" element={<SearchResultPage />}/>
        <Route exact path="/user/register" element={<RegisterPage />}/>
        <Route 
          path="/myPage"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <MyPage user={auth.user}/>
              
            </ PrivateRoute>
          }
        />
        <Route 
          path="/myPage/estimate/:estimateIdx"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <EstimatePage/>
            </ PrivateRoute>
          }
        />
        <Route 
          path="/estimateRequest"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <EstimateRequestPage />
            </ PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
