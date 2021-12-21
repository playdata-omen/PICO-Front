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
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ImageSearchPage from './pages/ImageSearchPage/ImageSearchPage';
import ChatRoomPage from './pages/ChatRoomPage/ChatRoomPage';
import ProfileUpdatePage from './pages/ProfileUpdatePage/ProfileUpdatePage';
import UploadWorkPage from './pages/UploadWorkPage/UploadWorkPage';
import WorkPage from './pages/WorkPage/WorkPage';

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
        <Route exact path="/register" element={<RegisterPage />}/>
        <Route exact path="/imageSearch" element={<ImageSearchPage />}/>
        <Route exact path="/work/:workIdx" element={<WorkPage />}/>
        <Route exact path="/imageRecommended" element={<imageRecommendedPage />}/>
        <Route exact path="/profile/:userIdx" element={<ProfilePage />}/>
        <Route 
          exact path="/myPage"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <MyPage user={auth.user}/>
            </PrivateRoute>
          }
        />
        <Route 
          exact path="/myPage/profile"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              {/* <ProfilePage />        */}
              <ProfilePage user={auth.user}/>       
            </PrivateRoute>
          }
        />
        <Route 
          path="/user/update"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <ProfileUpdatePage user={auth.user}/>
            </PrivateRoute>
          }
        />
        <Route 
          exact path="/estimate/:estimateIdx/:applyIdx"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <EstimatePage/>
            </PrivateRoute>
          }
        />
        <Route 
          exact path="/chat/:photographerIdx/:applyIdx"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <ChatRoomPage />
            </PrivateRoute>
          }
        />
        <Route 
          exact path="/estimateRequest"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <EstimateRequestPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/estimateRequest/:photographerIdx"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <EstimateRequestPage />
            </PrivateRoute>

          }
        />
        <Route 
          path="/uploadWork"
          element={
            <PrivateRoute authenticated={auth.authenticated}>
              <UploadWorkPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
