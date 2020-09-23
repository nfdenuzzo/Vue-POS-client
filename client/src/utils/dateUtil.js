import format from "date-fns/format";

export function helperStandardDateOnlyFormat(dateToFormat) {
  return format(dateToFormat, "yyyy/MM/dd");
}

// Returns date time in the following format: 2018-01-01 14:00:00
export function getStartOfMonth(dateToFormat) {
  const startOfMonthDate = new Date(
    dateToFormat.getFullYear(),
    dateToFormat.getMonth(),
    1
  );
  return helperStandardDateOnlyFormat(startOfMonthDate);
}
