import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAd, deletetAd } from './service';
import Button from '../shared/button';
import Header from '../shared/Header';

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ad, setAd] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [deleted, setAdDeleted] = useState(false);
  
  console.log("PARAMETROS "+params.adId);

  const handleRedirect =  () => {
    setInterval(() => {
      return navigate('/adverts');
    }, 3000);
}

  const handleConfirmation =  event => {
      event.preventDefault();
      setConfirmation(true);
  }

  const handleRejection =  event => {
    event.preventDefault();
    setConfirmation(false);
}

  const handleDelete =  async event => {
    event.preventDefault();
    deletetAd(params.adId).then(ad => setAd(ad)).
    catch(error => {
      if (error.message==404) {
        return navigate('/404');
      }
      console.log(error.message);
      setError(error);
    });
    setConfirmation(false);
    setAdDeleted(true);
    //navigate('/'); //Redirecciono a home porque la api es tan rapida que no le da tiempo a actualizar adeverts y que no salga el eliminado
  }

  useEffect(() => {
    getAd(params.adId)
      .then(ad => setAd(ad)).
      catch(error => {
        if (error.message==404) {
          console.log("ENTRO EN ERROR STATUS "+error.statusCode);
          return navigate('/404');
        }
        console.log(error.message);
        setError(error);
      });
    }, [params.adId]);


  return (
    ad && 
    <div>
      <Header></Header>
    {ad.name}
    <br></br>
    {ad.price}
    <br></br>
    {ad.sale?<span> venta </span>
    :<span> compra </span>}
    <br></br>
    {ad.tags}
    <br></br>
    {ad.photo!=null?
    <img src={ad.photo} width="100px" height="70px"></img>
    :<div>No hay foto</div>}
    <hr></hr>
    <Button type="submit" variant="primary" onClick={handleConfirmation}>
      Eliminar anuncio
    </Button>
    {confirmation && 
    <div>
      <p>Are you sure you want to delete?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleRejection}>No</button>
    </div>}
    {deleted &&

      <div>Anuncio eliminado, redireccionando a anuncios en 3 segundos...
        {handleRedirect()}
      </div>
    }
    </div> 
    //<Layout title="Tweet detail">{tweet && <div>{tweet.content}</div>}</Layout>
  );
};

export default AdvertPage;