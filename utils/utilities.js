const isPosOrNeg = (revs) => {
  let pos = 0;
  let neg = 0;
  for (let i = 0; i < revs.length; ++i) {
    if (revs[i].recommended) {
      ++pos;
    } else {
      ++neg;
    }
  }

  let result = [];
  if (pos > neg) {
    let percent = (pos / revs.length) * 100;
    result.push(percent.toString());
    if (percent > 50 && percent < 75) {
      result.push('Very Positive');
    } else if (percent >= 75) {
      result.push('Overwhelmingly Positive');
    }
  } else if (pos < neg) {
    let percent = (pos / revs.length) * 100;
    result.push(percent.toString());
    if (percent > 25 && percent < 50) {
      result.push('Very Negative');
    } else if (percent <= 25) {
      result.push('Overwhelmingly Negative');
    }
  } else if (pos === neg) {
    let percent = (pos / revs.length) * 100;
    result.push(percent.toString());
    result.push('Very Positive');
  }

  return result;
};

export default isPosOrNeg;