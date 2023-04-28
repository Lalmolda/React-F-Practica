import classNames from 'classnames';
// import './styles.css';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { getAllAds } from './service';

const AdsPage = () => {
    const [ads, setAds] = useState([]); // lo defino como vacio el array, si lo defino null al llamar al array dara error al ser null.
    //ads recive la promesa
    useEffect(() => {
        getAllAds().then(ads => //setAds(ads)
        console.log(ads)
        );
      }, []);

    return(
        <div className={styles.adsPage}>
            Hola soy AdsPage
        </div>
    )
};
export default AdsPage;
