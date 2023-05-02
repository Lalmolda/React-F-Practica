import './App.css';
import AdvertsPage from "./components/adverts/AdvertsPage";
import LoginPage from "./components/auth/LoginPage";
import { useState } from 'react';
import { AuthContext } from './components/auth/context';
import { Route, Routes, Navigate } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import AdvertPage from './components/adverts/AdvertPage';
import NewAdvertPage from './components/adverts/NewAdvertPage';


function App({ isUserLogged }) {
  const [isLogged, setIsLogged] = useState(isUserLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogOut = () => {
    setIsLogged(false);
  };

  const authValue = {
    isLogged: isLogged,
    onlogOut: handleLogOut, 
    onLogin: handleLogin
  };

  return (
    <AuthContext.Provider value={authValue}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route
            path="/adverts"
            element={
              <RequireAuth>
                      <AdvertsPage />
              </RequireAuth>
            }
      />
      <Route
            path="/adverts/:adId"
            element={
              <RequireAuth>
                      <AdvertPage />
              </RequireAuth>
            }
      />
       <Route
            path="/adverts/new"
            element={
              <RequireAuth>
                      <NewAdvertPage />
              </RequireAuth>
            }
      />
      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
    </AuthContext.Provider>
  );
}

export default App;
