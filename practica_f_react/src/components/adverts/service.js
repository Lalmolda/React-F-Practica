import client from '../../api/client';

const adsUrl = '/api/v1/adverts';

export const getAllAds = () => {
  return client.get(adsUrl); //client ya llevo el http://localhost, retorna una promesa que se consume desde el componente
};