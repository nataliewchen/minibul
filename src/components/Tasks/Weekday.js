import React from 'react';
import Task from './Task';

const Weekday = ({weekday, date, list, setList, today, sortedList}) => {
  const dateTasks = sortedList.filter(task => task.date === weekday)
  return (
    <div className={`weekday ${dateTasks.length === 0 ? "hide-weekday" : ""}`}>
      <div className="weekday-header">
        <h5 className={`${today.weekday === weekday ? "highlight-today" : ""}`}>{weekday}</h5>
        <h4 className={`${today.weekday === weekday ? "highlight-today" : ""}`}>{date}</h4>
      </div>
      <ul>
        {dateTasks.map(task => <Task task={task} setList={setList} key={task.id} />)}
      </ul>
    </div>
  );
}

export default Weekday;