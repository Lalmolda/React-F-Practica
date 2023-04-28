import classNames from 'classnames';
// import './styles.css';
import styles from './styles.module.css';
import { useEffect, useState, useContext } from 'react';
import { getAllAds } from './service';
import { AuthContext } from '../auth/context';
import { Navigate } from 'react-router-dom';


const AdsPage = () => {
    const { isLogged } = useContext(AuthContext);
    const [ads, setAds] = useState([]); // lo defino como vacio el array, si lo defino null al llamar al array dara error al ser null.
    //ads recive la promesa
    useEffect(() => {
        getAllAds().then(ads => //setAds(ads)
        console.log(ads)
        );
      }, []);
   /* if(isLogged){*/
        return(
            <div className={styles.adsPage}>
                Hola soy AdsPage
            </div>
        )
    //}
    /*else{
        return(
            <Navigate to="/login"></Navigate>
        )
    }*/
};
export default AdsPage;
