import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context';

const RequireAuth = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  const location = useLocation();
  console.log("ENTRO EN REQUIREAUTH");
  if (!isLogged) {
    console.log("ENTRO EN REQUIREAUTH E ISLOGGED ES FALSO");

    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
