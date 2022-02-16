const getLastDay = (monthNum, year, str) => {
  const daysPerMonth = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year%4 === 0 && year%100 !== 0) || year%400 === 0) { // leap year
      daysPerMonth.splice(2, 1, 29);
  }

  if (str === 'current') {
    return daysPerMonth[monthNum];
  } else if (str === 'prev') {
    if (monthNum === 1) {
      return daysPerMonth[12];
    } else {
      return daysPerMonth[monthNum-1];
    }
  }
}

const getWeekDates = (monthNum, date, weekdayNum, year) => {
  const start = date - weekdayNum;
  const base = [];
  for (let i=0; i<7; ++i) {
    base.push(start+i);
  }

  const zero = base.indexOf(0);
  const lastDayPrev = getLastDay(monthNum, year, 'prev');
  const lastDayCurr = getLastDay(monthNum, year, 'current');
  const lastDayCurrIndex = base.indexOf(lastDayCurr);

  const dates = base.map((el, i) => {
    if (zero !== -1) { // need to include previous month (found last day of prev month)
      if (el<1) {
        return lastDayPrev+el;
      } else {
        return el;
      }
    } else if (lastDayCurrIndex !== -1) { // need to include next month (found last day of current month)
      if (el > lastDayCurr) {
        return el-lastDayCurr;
      } else {
        return el;
      }
    } else { // middle of the month
      return el;
    }

  })


  return dates;
}

export default getWeekDates;