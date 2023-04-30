import classNames from 'classnames';
// import './styles.css';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
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
    const [searchValue, setSearch] = useState(0);
    const [filteredAds, setFilteredAds] = useState([]);
    const [ads, setAds] = useState([]); // lo defino como vacio el array, si lo defino null al llamar al array dara error al ser null.
    //ads recive la promesa

    const FilterList = () => (
      <form className= "loginPage">
      <h1>Busqueda en AdPop</h1>
        <input
          type="text"
          name="nameSearch"
          onChange={handleSearch}
          value={searchValue}
          placeholder='Search the name of the product'
          autoFocus
        />
        <Button type="submit" variant="primary">
          Search!
        </Button>
        </form>
    );

    const handleSearch = event => {
      console.log(event.target.value);
      setSearch(event.target.value);
    };

    useEffect(() => {
        getAllAds().then(ads => 
            setAds(ads),
        );
      }, []);

      useEffect(() => {
        let array = [];
        ads &&
        ads.forEach((ad) => {
          if(ad.name.toLowerCase().includes(searchValue)){
            console.log("ENTRO EN IF");
            array.push(ad);
          } 
        }
        );
        if(array.length>0){
          console.log("ASIGNO");
          setAds(array);
        }
        console.log(array)

        
        //const result = setFilteredAds(ads.map(ads.name === searchValue)
        //);
        //console.log("searchvalue en useffect "+ads[2].name);
      }, 
      [setAds, searchValue]);

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
            <FilterList />
          </div>
        );
      };
export default AdsPage;
