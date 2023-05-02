import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../shared/button';
import { login } from './service';
import { AuthContext } from './context';
import Header from '../shared/Header';
import { Link } from 'react-router-dom';

function LoginPage()  {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();  
  const { onLogin, isLogged } = useContext(AuthContext);
  const [rememberPass, setRememberPass] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const resetError = () => {
    setError(null);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    resetError();
    try {
      await login(credentials, rememberPass);
      // Estoy logueado
      onLogin();
      const to = location.state?.from?.pathname || '/';   //Navigates to path /
      navigate(to);
    }catch (error) {
      setError(error);
    }
  }

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckBox = event => {
    console.log(event.target.checked);
    if(event.target.checked){
      setRememberPass(true);
    }
    else{
      setRememberPass(false);
    }
  };

  const buttonDisabled = !credentials.email || !credentials.password;

  return (
    isLogged==true?
      <div>
        <Header></Header>
          Ya has iniciado sesión
        <br></br>
        <div>
          <Button as={Link} variant="primary" to="/adverts/new">
            Crea un nuevo anuncio
          </Button>
        </div>
      </div>
      :<div>
        <form className= "loginPage" onSubmit={handleSubmit}>
        <h1>Log in to Wallapop</h1>
          <input
            type="text"
            name="email"
            placeholder='Introduce your email'
            onChange={handleChange}
            value={credentials.email}
          />
          <input
            type="password"
            name="password"
            placeholder='Introduce your password'
            onChange={handleChange}
            value={credentials.password}
          />
          <Button type="submit" variant="primary" disabled={buttonDisabled}>
            Log in
          </Button>
          <hr></hr>
            recordar contraseña
          <input
            type="checkbox"
            onChange={handleCheckBox}
          />
        </form>
        {error && 
          error.message==401?
            <div>Wrong username or password</div>
            :error && <div>{error.message}</div>}
      </div>   
  );
}


export default LoginPage;