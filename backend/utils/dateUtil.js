const { formatToTimeZone } = require("date-fns-timezone");
const format = require("date-fns/format");
const startOfMonth = require("date-fns/startOfMonth");
const endOfMonth = require("date-fns/endOfMonth");
const timeZone = { timeZone: "Africa/Johannesburg" };

module.exports = {
  helperStandardDateTimeFormat,
  helperStandardDateOnlyFormat,
  helperStandardTimeOnlyFormat,
  helperStandardTimeOnlyFormatNoSeconds,
  helperPrettifyDate,
  helperShortPrettifyDate,
  helperGetWeekDayName,
  helperGetWeekDaySortName,
  helperGetDayNameWording,
  getStartOfMonth,
  getStartOfDay,
  getEndOfDay,
  getStartOfMonthStartOfDay,
  getEndOfMonthEndOfDay,
};

// Returns date time in the following format: 2018-01-01 14:00:00
function helperStandardDateTimeFormat(dateToFormat) {
  return formatToTimeZone(dateToFormat, "YYYY-MM-DD HH:mm:ss", timeZone);
}
// Returns ONLY the DATE in the following format: 2018-01-01
function helperStandardDateOnlyFormat(dateToFormat,) {
  return formatToTimeZone(dateToFormat, "YYYY-MM-DD", timeZone);
}
function helperStandardDateOnlyFormatNoTZ(dateToFormat,) {
  return format(dateToFormat, "yyyy-MM-dd");
}
// Returns ONLY the TIME in the following format: 14:00:00
function helperStandardTimeOnlyFormat(dateToFormat) {
  return formatToTimeZone(dateToFormat, "HH:mm:ss", timeZone);
}
// Returns ONLY the TIME in the following format: 14:00
function helperStandardTimeOnlyFormatNoSeconds(dateToFormat) {
  return formatToTimeZone(dateToFormat, "HH:mm", timeZone);
}
// Format the date
function helperPrettifyDate(dateToFormat) {
  return formatToTimeZone(dateToFormat, "dddd, D MMMM YYYY", timeZone);
}
// Format the date
function helperShortPrettifyDate(dateToFormat) {
  return formatToTimeZone(dateToFormat, "dddd, D MMMM", timeZone);
}
// Format the date
function helperGetWeekDayName(dateToFormat) {
  return formatToTimeZone(dateToFormat, "dddd", timeZone);
}
// Format the date
function helperGetWeekDaySortName(dateToFormat) {
  return formatToTimeZone(dateToFormat, "ddd", timeZone);
}
// Format the date
function helperGetDayNameWording(dateToFormat) {
  return formatToTimeZone(dateToFormat, "Do", timeZone);
}
// Returns date time in the following format: 2018-01-01 14:00:00
function getStartOfMonth(dateToFormat) {
  const startOfMonthValue = startOfMonth(dateToFormat);
  return helperStandardDateOnlyFormat(startOfMonthValue);
}

function getStartOfDay(dateToFormat) {
  const startOfDayValue = helperStandardDateOnlyFormat(dateToFormat);
  return helperParseDateAndTimeString(startOfDayValue, "00:00:00");
}

function getEndOfDay(dateToFormat) {
  const endOfDayValue = helperStandardDateOnlyFormatNoTZ(dateToFormat);
  return helperParseDateAndTimeString(endOfDayValue, "23:59:59");
}

function helperParseDateAndTimeString(dateString, timeString) {
  const DateTime = `${dateString}T${timeString}`;
  return DateTime;
}

// Returns date time in the following format: 2018-01-01 14:00:00
function getStartOfMonthStartOfDay(dateToFormat) {
  const startOfMonthValue = helperStandardDateOnlyFormat(startOfMonth(dateToFormat));
  return helperParseDateAndTimeString(startOfMonthValue, "00:00:00");
}

// Returns date time in the following format: 2018-01-01 14:00:00
function getEndOfMonthEndOfDay(dateToFormat) {
  const endOfMonthValue = helperStandardDateOnlyFormatNoTZ(endOfMonth(dateToFormat));
  return helperParseDateAndTimeString(endOfMonthValue, "23:59:59");
}