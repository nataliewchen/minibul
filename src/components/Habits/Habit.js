import React from 'react';

const Habit = ({habit, habitList, setHabitList}) => {
  const weekdays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat']

  const toggleHabitCheckbox = (e) => {
    const index = e.target.value;
    const updated = [...habit.completed];
    updated[index] = !updated[index];
    setHabitList(prev => prev.map(prevHabit => {
      if (prevHabit.id === habit.id) {
        return {
          ...prevHabit,
          completed: updated
        }
      } else {
        return prevHabit;
      }
    }))
  }

  const handleHabitDelete = () => {
    setHabitList(prev => prev.filter(prevHabit => prevHabit.id !== habit.id));
  }

  const handleHabitPriority = () => {
    setHabitList(prev => prev.map(prevHabit => {
      if (prevHabit.id === habit.id) {
        return {...prevHabit, priority: !habit.priority}
      } else {
        return prevHabit;
      }
    }))
  }

  return (
    <div className="habit">
      <div className="habit-content">
        <div className="habit-btns">
          <i onClick={handleHabitDelete} className="bi bi-trash"></i>
          <i onClick={handleHabitPriority} className={`bi ${habit.priority ? "bi-star-fill" : "bi-star"}`}></i>
        </div>
        <div className={`${habit.priority ? "priority" : ""}`}>
          {habit.text}
        </div>
      </div>
      <div className="habit-checkbox-row">
        {weekdays.map((weekday,i) => (
          <div onClick={toggleHabitCheckbox} key={weekday}>
            <button value={i} className={`habit-checkbox ${habit.completed[i] ? "checkbox-fill" : ""}`}>
              <i className="bi bi-check"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Habit;