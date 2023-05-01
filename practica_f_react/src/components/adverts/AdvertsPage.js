import classNames from 'classnames';
// import './styles.css';
import styles from './styles.module.css';
import { useRef, useEffect, useState } from 'react';
import { getAllAds } from './service';
import { Link } from 'react-router-dom';
import Advert from './Advert';
import Button from '../shared/button';

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Post your ad!!</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Create ad
    </Button>
  </div>
);

const AdsPage = () => {
    let arrayPrueba = [];
    const [searchValue, setSearch] = useState();
    const [searchRadioValue, setRadioValue] = useState();
    let  adAuxArray = useRef([]);
    const [ads, setAds] = useState([]); // lo defino como vacio el array, si lo defino null al llamar al array dara error al ser null.
    //ads recive la promesa

   
    
    const handleSubmit =  event => {
      event.preventDefault();
      const array = [];
      ads.forEach((ad) => {
        console.log("SUBMITO Y VIENE TYPEOF  y searchradiovalue vale "+searchRadioValue);
          if(ad.name.toLowerCase().includes(searchValue) && ad.sale == searchRadioValue){
            console.log("ENTRO EN IF y searchradio value es "+searchRadioValue);
            array.push(ad);
          } 
        })
        setAds(array);
    }

    const handleSearch = event => {
      console.log(event.target.value);
      setSearch(event.target.value);
    };

    const handleCheckBox = event => {
      if(event.target.value=="true"){
        setRadioValue(true);
      }
      if(event.target.value=="false"){
          setRadioValue(false);
        }
        
      //}
    };

    

    useEffect(() => {
        getAllAds().then(ads => 
            setAds(ads),       
        );
        console.log("LENGTH DE EMPTY ARRAY "+adAuxArray.length);
       //if(adAuxArray.length==undefined){
          let pruebas = [1,4,5];
          //arrayPrueba = ads.map((ad) => ad)
          arrayPrueba = [... pruebas]
          console.log("SOY ADAUX DE PRUEBA "+ads);
      }, []);

      useEffect(() => {
        let array = [];
        ads &&
        ads.forEach((ad) => {
          //console.log("ENTRO EN IF y searchradio value es "+searchRadioValue);
            if(ad.name.toLowerCase().includes(searchValue) && ad.sale==searchRadioValue){
              array.push(ad);
            } 
          }
        );
        if(array.length>0){
          //setAds(array);
        }

        if(searchValue==0){
          console.log("INTENTO SETEAR ADS CON AUX ARRAY");
          console.log("SOY ADS AUX ARRAY SETEANDO "+adAuxArray);
            getAllAds().then(ads => 
              setAds(ads),
            );
          //setAds(adAuxArray);
        }

        console.log(array)

      }, 
      [searchValue]);

        return(
          ads &&
          ads.length===0?<EmptyList />
          :<div className={styles.AdvertsPage}>
            <ul> 
              {ads.map(ad => (
                <li key={ad.id}>
                     <Link to={`/adverts/${ad.id}`}>
                        <Advert {...ad} />
                    </Link>
                </li>
              ))}
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
          onClick={handleCheckBox}
        /> 
        Ambos

        <Button type="submit" variant="primary" onClick={handleSubmit}>
          Search!
        </Button>
        </form>
          </div>
        );
      };
export default AdsPage;
