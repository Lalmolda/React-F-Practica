import Button from './button';
import { logout } from '../auth/service';
import { useContext } from 'react';
import { AuthContext } from '../auth/context';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {  useState } from 'react';


const Header = () => {
  const { onLogOut, isLogged } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);

  const handleLogOut = async () => {
    await logout();
    onLogOut();
  };

  const handleConfirm = event => {
    event.preventDefault();
    console.log("CAMBIO SET CONFIRMATION");
    setConfirmation(true);
  };

  const handleReject = event => {
    event.preventDefault();
    setConfirmation(false);
  };

  const handleRedirect = (event) => {
    //const to = location.state?.from?.pathname || '/adverts/new';   //Navigates to path /
    navigate("/adverts/new");
  };

  return (
    isLogged &&
    <header className="Header" style={{ textAlign: 'center' }}>
            {!confirmation &&
            <Button variant="primary" onClick={handleConfirm}> Logout </Button>
            }
            {confirmation &&
             <div>
              ¿Seguro que deseas hacer logout?
              <form className= "logOutPage" onSubmit={handleLogOut}>
                <Button variant="primary" type="submit"> Sí </Button>
              </form>
                <Button variant="primary" onClick={handleReject}> No </Button>
              </div>}
        
    </header>
  );
};

export default Header;