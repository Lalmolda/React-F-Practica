import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAd } from './service';

const AdvertPage = ({id,name, price, sale, tags }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ad, setAd] = useState(null);
  console.log("PARAMETROS "+params.adId);

  useEffect(() => {
    getAd(params.adId)
      .then(ad => setAd(ad))
      }, 
      [params.adId]);

      //console.log("SOY AD DESPUES DE GETAD "+ ad.name);

  // if (error?.status === 404) {
  //   return <Navigate to="/404" />;
  // }

  return (
    ad && 
    <div>
    {ad.name}
    <br></br>
    {ad.price}
    <br></br>
    {ad.sale?<span> venta </span>
    :<span> compra </span>}
    <br></br>
    {ad.tags}
    <hr></hr>
    </div>
    //<Layout title="Tweet detail">{tweet && <div>{tweet.content}</div>}</Layout>
  );
};

export default AdvertPage;