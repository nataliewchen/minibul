import React from 'react';
import Weekday from './Weekday';

import getWeekDates from '../../utils/getWeekDates';

const TaskList = ({today, list, setList, listSort, sortedList, editing}) => {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDates = getWeekDates(today.monthNum, today.date, today.weekdayNum, today.year);

  return (
    <div className="weekday-container">
      {weekdays.map((weekday,i) => <Weekday weekday={weekday} date={weekDates[i]} sortedList={sortedList} setList={setList} key={weekday} today={today} editing={editing} />)}
    </div>
  );
}

export default TaskList;