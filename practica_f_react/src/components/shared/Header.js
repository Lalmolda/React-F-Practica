import Button from './button';
import { logout } from '../auth/service';
import { useContext } from 'react';
import { AuthContext } from '../auth/context';
import { useState } from 'react';


const Header = () => {
  const { onLogOut, isLogged } = useContext(AuthContext);
  const [confirmation, setConfirmation] = useState(false);

  const handleLogOut = async () => {
    await logout();
    onLogOut();
  };

  const handleConfirm = event => {
    event.preventDefault();
    setConfirmation(true);
  };

  const handleReject = event => {
    event.preventDefault();
    setConfirmation(false);
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