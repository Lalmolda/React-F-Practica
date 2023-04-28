import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
  } from '../../api/client';
  import storage from '../../utils/storage';
  
  export const login = (credentials, rememberPass) => {
    return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      //console.log("SOY REMEMBER PASS Y SOY "+rememberPass);
      if(rememberPass){
        storage.set('auth', accessToken);
        console.log("SOY REMEMBER PASS Y SOY "+rememberPass);
      }
    });
  };
  /** 
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };
  */