import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage/LoginPage';

import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const authenticated = useSelector(store => store.auth.authenticated)

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route exact path="/login" element={<LoginPage />}/>
        <Route 
          path="/myPage"
          element={
            <PrivateRoute authenticated>
              <MyPage authenticated/>
            </ PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
