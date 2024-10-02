const todayDate = () => {
  const date = new Date();

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // Gets full month name
  const year = date.getFullYear();

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month}, ${year}`;
};

export default todayDate;
