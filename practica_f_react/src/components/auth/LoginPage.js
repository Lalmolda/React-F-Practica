import './LoginPage.css';
import { useContext, useState } from 'react';
import Button from '../shared/button';
import { login } from './service';
import { AuthContext } from './context';

function LoginPage()  {
  const { onLogin } = useContext(AuthContext);
  const [rememberPass, setRememberPass] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  console.log("RECIBO EN LOGINPAGE "+onLogin);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("SOY EL VALUE DE REMEMBERPASS: "+rememberPass);
    await login(credentials, rememberPass);

    // Estoy logueado
    onLogin();
    console.log("HE LOGEAD")
  };

  const handleChange = event => {
    // if (event.target.name === 'email') {
    //   setCredentials({ ...credentials, username: event.target.value });
    // }
    // if (event.target.name === 'password') {
    //   setCredentials({ ...credentials, password: event.target.value });
    // }
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckBox = event => {
    //event.preventDefault();
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
    <div>
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
    </div>
  );

}


export default LoginPage;