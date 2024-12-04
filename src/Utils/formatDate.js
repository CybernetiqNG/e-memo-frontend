const formatDate = (dateString) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default formatDate;
