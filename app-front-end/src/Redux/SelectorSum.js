

export default (items) => {
    return items
        .map((item) => item.cost)
        .reduce((sum, value) => sum + value, 0);
  };
  