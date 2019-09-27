import React from 'react';
import styles from '../../../public/style.css';


const BannerImage = (props) => {
    return (
      <div id={styles.banner}>
        <img className={styles.bannerImg} src={props.image} alt="header" />
      </div>
    );
  }

export default BannerImage;