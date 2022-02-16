import React from 'react';

import Habit from './Habit';

const HabitTracker = ({today, habitList, setHabitList, sortedHabits}) => {
  return (
    <div className="habit-tracker">
      <div className="habit-header-dates">
        <div className={`habit-header-date ${today.weekday==='Sunday' ? "highlight-today" : ""}`}>S</div>
        <div className={`habit-header-date ${today.weekday==='Monday' ? "highlight-today" : ""}`}>M</div>
        <div className={`habit-header-date ${today.weekday==='Tuesday' ? "highlight-today" : ""}`}>T</div>
        <div className={`habit-header-date ${today.weekday==='Wednesday' ? "highlight-today" : ""}`}>W</div>
        <div className={`habit-header-date ${today.weekday==='Thursday' ? "highlight-today" : ""}`}>T</div>
        <div className={`habit-header-date ${today.weekday==='Friday' ? "highlight-today" : ""}`}>F</div>
        <div className={`habit-header-date ${today.weekday==='Saturday' ? "highlight-today" : ""}`}>S</div>
      </div>
      {sortedHabits.map(habit => <Habit habit={habit} key={habit.id} habitList={habitList} setHabitList={setHabitList} />)}
    </div>
  )
}

export default HabitTracker;