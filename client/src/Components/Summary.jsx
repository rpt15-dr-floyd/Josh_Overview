import React from 'react';
import styles from '../../../public/style.css';

const Summary = (props) => {
  return (
    <div className={styles.summary}>
      {props.description}
    </div>
  );
}


export default Summary;