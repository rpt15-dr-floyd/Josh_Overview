import React from 'react';
import styles from '../../../public/style.css';

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let percentage = this.props.percent.split(".")[0];
    let totalReviews = this.props.reviews.length;
    let rating = '';

    if (this.props.posOrNeg.includes('Negative')) {
      rating = 'negative';
    } else {
      rating = 'positive';
    }

    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipLabel}>
         {percentage}% of the {totalReviews} user reviews in the last 30 days are {rating}.
        </div>
      </div>
    )
  }
}

export default Tooltip;