const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  };
const sortUpAscendingBy = (key, value) => {
    const rs = key.concat().sort(sortBy(value))
    return rs;
}

export default sortUpAscendingBy;