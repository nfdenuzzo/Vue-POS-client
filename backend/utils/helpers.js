module.exports = {
  getWeekDay,
};

function getWeekDay(date) {
  //Create an array containing each day, starting with Sunday.
  const weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  //Use the getDay() method to get the day.
  const day = date.getDay();
  //Return the element that corresponds to that index.
  return weekdays[day];
}
