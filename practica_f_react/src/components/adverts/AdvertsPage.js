import classNames from 'classnames';
// import './styles.css';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { getAllAds } from './service';
import { AuthContext } from '../auth/context';


const AdsPage = () => {
    //const { isLogged } = useContext(AuthContext);
    const [ads, setAds] = useState([]); // lo defino como vacio el array, si lo defino null al llamar al array dara error al ser null.
    //ads recive la promesa
    useEffect(() => {
        getAllAds().then(ads => 
            setAds(ads),
        );
      }, []);

      console.log(ads);

        return(
            <div
            //   className={className}
            className={styles.AdvertsPage}
            //   style={{
            //     backgroundColor: theme === 'light' ? 'lightblue' : 'darkblue',
            //   }}
          >
            <ul>
              {ads.map(ad => (
                <li key={ad.id}>{ad.name}</li>
              ))}
            </ul>
          </div>
        );
      };
export default AdsPage;
