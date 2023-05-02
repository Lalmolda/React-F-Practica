import client from '../../api/client';

const adsUrl = '/api/v1/adverts';

export const getAllAds = () => {
  return client.get(adsUrl); //client ya llevo el http://localhost, retorna una promesa que se consume desde el componente
};

export const getAd = adId => {
  const url = `${adsUrl}/${adId}`;
  console.log("LLEGO A GETAD "+url);
  return client.get(url);
};

export const deletetAd = adId => {
  const url = `${adsUrl}/${adId}`;
  return client.delete(url);
};

export const createAd = ad => {
  const url = adsUrl;
  return client.post(url, ad, {});
};

