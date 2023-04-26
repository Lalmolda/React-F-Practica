import classNames from 'classnames';
// import './styles.css';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { getAllAds } from './service';

const AdsPage = () => {
    const a = 1;
    return(
        <div className={styles.adsPage}>
            Hola soy AdsPage
        </div>
    )
};
export default AdsPage;
