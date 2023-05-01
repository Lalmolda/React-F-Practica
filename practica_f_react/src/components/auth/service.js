import { useAuth } from './context';

import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader
  } from '../../api/client';
  import storage from '../../utils/storage';
  
  export const login = (credentials, rememberPass) => {
    return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      if(rememberPass){
        storage.set('auth', accessToken);
      }
    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    })
  }
  