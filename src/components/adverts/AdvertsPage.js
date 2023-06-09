// import './styles.css';
import { useEffect, useState } from 'react';
import { getAllAds } from './service';
import { Link } from 'react-router-dom';
import Advert from './Advert';
import Button from '../shared/button';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>No hay anuncios, postea tu anuncio!</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Crea un nuevo anuncio
    </Button>
  </div>
);

const AdsPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearch] = useState();
    const [searchRadioValue, setRadioValue] = useState(undefined);
    const [ads, setAds] = useState([]); 

    const handleSubmit =  event => {
      event.preventDefault();
      const array = [];
      ads.forEach((ad) => {
      //Controls that, if search value is empty, it only uses the sale state to search
        if(searchValue==undefined){
          if(searchRadioValue==undefined){
            array.push(ad);
          }  
          else{
            if(ad.sale == searchRadioValue){
              array.push(ad);
            } 
          }
        }

        if(searchValue!="" && ad.name.toLowerCase().includes(searchValue) && searchRadioValue==undefined){
          array.push(ad);
        }
        else{
          if(searchValue!="" && ad.name.toLowerCase().includes(searchValue) && ad.sale == searchRadioValue){
            array.push(ad);
          } 
        }
      })
      setAds(array);
    }

    const handleReset = event => {
      event.preventDefault();
      navigate('/');
    }

    const handleSearch = event => {
      setSearch(event.target.value);
    };

    const handleCheckBox = event => {
      if(event.target.value=="true"){
        setRadioValue(true);
      }
      if(event.target.value=="false"){
          setRadioValue(false);
      }
      if(event.target.value=="both"){
        setRadioValue(undefined);
      }
    };   

    useEffect(() => {
        getAllAds().then(ads => 
            setAds(ads),       
        );
    }, []);
    return(
      ads &&
      ads.length===0?
        <EmptyList />
        :
        <div style={{ textAlign: 'center' }}>
          <Header></Header>
            <ul> 
              {ads.map(ad => (
                <li key={ad.id}>
                  <Link to={`/adverts/${ad.id}`}>
                    <Advert {...ad} />
                  </Link>
                </li>
              )
              )
              }
            </ul>
            
          <form className= "searchForm">
          <h1>Busqueda en AdPop</h1>
            <div>
              <input
                type="text"
                name="nameSearch"
                value={searchValue}
                onChange={handleSearch}
                placeholder='Search the name'
                autoFocus
              />
            </div>
            <br></br>
            <input
              type="radio"
              name="inputSearch"
              value="true"
              onChange={handleCheckBox}
            /> 
             Venta  
            <input
              type="radio"
              name="inputSearch"
              value="false"
              onChange={handleCheckBox}
            /> 
             Compra
            <input
              type="radio"
              name="inputSearch"
              value="both"
              onClick={handleCheckBox}
              defaultChecked
            /> 
             Ambos
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              Buscar
            </Button>
            <Button type="submit" variant="primary" onClick={handleReset}>
              Resetea la búsqueda
            </Button>
            <br></br>
            <br></br>
            <Button as={Link} variant="primary" to="/adverts/new">
              ¿Crear un nuevo anuncio?
            </Button>
          </form>
        </div>
      );
    };
export default AdsPage;
