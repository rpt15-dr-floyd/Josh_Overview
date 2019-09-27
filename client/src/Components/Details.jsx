import React from 'react';
import styles from '../../../public/style.css';
import Tooltip from './Tooltip.jsx';


class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      top: 0,
      left: 0
    };
    this.references();
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }
  references() {
    this.toolTipRef = React.createRef();
  };

  handleMouseOver(e) {
    let currentElement = e.currentTarget;

    if (currentElement != null) {
      let rect = currentElement.getBoundingClientRect();    }
    this.setState({ visible: true });
  }

  handleMouseOut() {
    this.setState({ visible: false });
  }

  render() {
    let developerUrl = `https://store.steampowered.com/developer/${this.props.developer}`;
    let publisherUrl = `https://store.steampowered.com/publisher/${this.props.publisher}`;
    let formattedDate = this.props.release_date.slice(0, 10)
    let numRecentReviews = this.props.recent.length;
    let numTotalReviews = this.props.totalReviews.length;

    return (
      <div className={styles.detailsContainer}>
        <div id={styles.item1a} className={`${styles.colLeft} ${styles.details}`} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <a className={styles.details} href="#">
            {
              this.state.visible &&
              <Tooltip ref={this.toolTipRef} percent={this.props.percentRecentPosOrNeg} reviews={this.props.recent} posOrNeg={this.props.recentPosOrNeg} />
            }
            Recent Reviews:
          </a>
        </div>
        <div id={styles.item1b} className={styles.colRight} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <a className={styles.colRight} href="#">
            {
              this.state.visible &&
              <Tooltip ref={this.toolTipRef} percent={this.props.percentRecentPosOrNeg} reviews={this.props.recent} posOrNeg={this.props.recentPosOrNeg} />
            }
            {this.props.recentPosOrNeg} <span className={styles.detailsBody}>({numRecentReviews})</span>
          </a>
        </div>
        <div id={styles.item2a} className={`${styles.colLeft} ${styles.pdBottomSmall} ${styles.details}`} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <a className={styles.details} href="#">
            {
              this.state.visible &&
              <Tooltip ref={this.toolTipRef} percent={this.props.percentTotalReviewsPosOrNeg} reviews={this.props.totalReviews} posOrNeg={this.props.overallPosOrNeg} />
            }
            All Reviews:
          </a>
        </div>
        <div id={styles.item2b} className={`${styles.colRight} ${styles.pdBottomSmall}`} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <a className={styles.colRight} href="#">
            {
              this.state.visible &&
              <Tooltip ref={this.toolTipRef} percent={this.props.percentTotalReviewsPosOrNeg} reviews={this.props.totalReviews} posOrNeg={this.props.overallPosOrNeg} />
            }
            {this.props.overallPosOrNeg} <span className={styles.detailsBody}>({numTotalReviews})</span>
          </a>
        </div>
        <div id={styles.item3a} className={`${styles.colLeft} ${styles.pdBottomBig} ${styles.details}`}>
          Release Date:
        </div>
        <div id={styles.item3b} className={`${styles.pdBottomBig} ${styles.date}`}>
          {formattedDate}
        </div>
        <div id={styles.item4a} className={`${styles.colLeft} ${styles.details}`}>
          Developer:
        </div>
        <div id={styles.item4b} className={`${styles.colRight} ${styles.link}`}>
          <a href={developerUrl}>{this.props.developer}</a>
        </div>
        <div id={styles.item5a} className={`${styles.colLeft} ${styles.pdBottomBig} ${styles.details}`}>
          Publisher:
        </div>
        <div id={styles.item5b} className={`${styles.colRight} ${styles.pdBottomBig} ${styles.link}`}>
          <a href={publisherUrl}>{this.props.publisher}</a>
        </div>
     </div>
    );
  }
}


export default Details;