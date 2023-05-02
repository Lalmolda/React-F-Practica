import client from '../../api/client';

const adsUrl = '/api/v1/adverts';

export const getAllAds = () => {
  return client.get(adsUrl); 
};

export const getAd = adId => {
  const url = `${adsUrl}/${adId}`;
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

