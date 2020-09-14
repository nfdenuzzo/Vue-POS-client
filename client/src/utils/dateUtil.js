const { formatToTimeZone } = require("date-fns-timezone");
const { startOfMonth } = require('date-fns');
const timeZone = { timeZone: "Africa/Johannesburg" };

// Returns date time in the following format: 2018-01-01 14:00:00
export function helperStandardDateTimeFormat(dateToFormat) {
  return formatToTimeZone(dateToFormat, "YYYY-MM-DD HH:mm:ss", timeZone);
}
// Returns ONLY the DATE in the following format: 2018-01-01
export function helperStandardDateOnlyFormat(dateToFormat) {
  return formatToTimeZone(dateToFormat, "YYYY-MM-DD", timeZone);
}
// Returns ONLY the TIME in the following format: 14:00:00
export function helperStandardTimeOnlyFormat(dateToFormat) {
  return formatToTimeZone(dateToFormat, "HH:mm:ss", timeZone);
}
// Returns ONLY the TIME in the following format: 14:00
export function helperStandardTimeOnlyFormatNoSeconds(dateToFormat) {
  return formatToTimeZone(dateToFormat, "HH:mm", timeZone);
}
// Format the date
export function helperPrettifyDate(dateToFormat) {
  return formatToTimeZone(dateToFormat, "dddd, D MMMM YYYY", timeZone);
}
// Format the date
export function helperShortPrettifyDate(dateToFormat) {
  return formatToTimeZone(dateToFormat, "dddd, D MMMM", timeZone);
}
// Format the date
export function helperGetWeekDayName(dateToFormat) {
  return formatToTimeZone(dateToFormat, "dddd", timeZone);
}
// Format the date
export function helperGetWeekDaySortName(dateToFormat) {
  return formatToTimeZone(dateToFormat, "ddd", timeZone);
}
// Format the date
export function helperGetDayNameWording(dateToFormat) {
  return formatToTimeZone(dateToFormat, "Do", timeZone);
}

// Returns date time in the following format: 2018-01-01 14:00:00
export function getStartOfMonth(dateToFormat) {
    const startOfMonthValue = startOfMonth(dateToFormat)
    return helperStandardDateOnlyFormat(startOfMonthValue);
  }
