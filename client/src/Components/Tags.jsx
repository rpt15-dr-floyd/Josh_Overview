import React from 'react';
import styles from '../../../public/style.css';

// add on hover

const Tags = (props) => {
  return (
    <>
      <div id={styles.tagsDesc} className={`${styles.details} ${styles.pdBottomSmall}`}>
        Popular user-defined tags for this product:
      </div>
      <div id={styles.tags}>
        {props.userTags.map((tag) => {
          let url = `https://store.steampowered.com/tags/en/${tag}`
          return (
            <a className={styles.tags} href={url} key={tag}>{tag}</a>
          );
        })}
      </div>
    </>
  );
}

export default Tags;