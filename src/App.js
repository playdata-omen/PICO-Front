import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './components/Login';
import MyPage from './pages/MyPage';

import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

function App() {

  const authenticated = useSelector(store => store.auth.authenticated)

  return (
    <div className="App">
      <Header authenticated/>
      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route 
          path="/myPage"
          element={
            <PrivateRoute authenticated>
              <MyPage />
            </ PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
