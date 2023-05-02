import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAd, deletetAd } from './service';
import Button from '../shared/button';
import Header from '../shared/Header';
import { Link } from 'react-router-dom';

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ad, setAd] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [deleted, setAdDeleted] = useState(false);
  
  const handleRedirect =  () => {
      return navigate('/adverts');
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
  }

  useEffect(() => {
    getAd(params.adId)
      .then(ad => setAd(ad)).
      catch(error => {
        if (error.message==404) {
          return navigate('/404');
        }
        setError(error);
      });
    }, [params.adId]);


  return (
    ad && 
    <div style={{ textAlign: 'center' }}>
      <Header></Header>
      <span>Nombre: {ad.name}</span> 
        <br></br>
        <span>Precio: {ad.price}</span> 
        <br></br>
          {ad.sale?
            <span> En venta </span>
            :<span> Se compra </span>
          }
        <br></br>
        <span>Tags: {ad.tags}</span> 
        <hr></hr>
      {ad.photo!=null?
        <img src={ad.photo} width="100px" height="70px"></img>
        :<div>No hay foto</div>
      }
      <hr></hr>
      <Button type="submit" variant="primary" onClick={handleConfirmation}>
         Eliminar anuncio
      </Button>
      {confirmation && 
        <div>
          <p>Are you sure you want to delete?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleRejection}>No</button>
        </div>
      }
      {deleted &&
      <div>Anuncio eliminado, redireccionando a anuncios en breve...
        {handleRedirect()}
      </div>
      }
      <br></br>
      <br></br>
      <Button as={Link} variant="primary" to="/adverts">
          Ir a anuncios publicados
      </Button>
      </div> 
  );
};

export default AdvertPage;