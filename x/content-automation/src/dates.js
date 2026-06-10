const { timezone } = require("./config");

function zonedDateParts(date = new Date(), timeZone = timezone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day)
  };
}

function zonedToday(timeZone = timezone) {
  const { year, month, day } = zonedDateParts(new Date(), timeZone);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

module.exports = { zonedToday, ymd };
