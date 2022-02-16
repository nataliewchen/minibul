const getToday = () => {
  const date = new Date();
  const today = {
    weekday: Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date),
    weekdayNum: date.getDay(),
    month: Intl.DateTimeFormat('en-US', {month: 'long'}).format(date),
    monthNum: date.getMonth() + 1,
    date: date.getDate(),
    year: date.getFullYear(),
    time: date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  }
  return today;
}

export default getToday;