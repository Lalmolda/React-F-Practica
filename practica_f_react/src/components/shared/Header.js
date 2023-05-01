import Button from './button';
import { logout } from '../auth/service';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/context';

const Header = () => {
  const { onLogOut, isLogged } = useContext(AuthContext);


  const handleLogOut = async () => {
    await logout();
    onLogOut();
  };

  return (
    isLogged &&
    <header className="Header">
        <form className= "loginPage" onSubmit={handleLogOut}>
        <Button type="submit" variant="primary"> Logout </Button>
        </form>
    </header>
  );
};

export default Header;