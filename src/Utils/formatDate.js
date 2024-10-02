const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" }; // Options for day, abbreviated month, and year
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default formatDate;
