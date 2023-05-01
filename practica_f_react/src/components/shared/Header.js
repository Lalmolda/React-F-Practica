import Button from './button';
import { logout } from '../auth/service';
import { useContext } from 'react';
import { AuthContext } from '../auth/context';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
  const { onLogOut, isLogged } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    onLogOut();
  };

  const handleRedirect = (event) => {
    const to = location.state?.from?.pathname || '/adverts/new';   //Navigates to path /
    navigate(to);
  };

  return (
    isLogged &&
    <header className="Header">
        <form className= "logOutPage" onSubmit={handleLogOut}>
            <Button type="submit" variant="primary"> Logout </Button>
            <Button type="button" variant="primary "onClick={handleRedirect}>
                Crea un nuevo anuncio
            </Button>
        </form>
    </header>
  );
};

export default Header;