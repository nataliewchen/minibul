import React from 'react';


const HabitInput = ({
  habitText, setHabitText,
  habitPriority, setHabitPriority,
  habitList, setHabitList,
  habitSort, setHabitSort}) => {
  const handleTextChange = (e) => {
    setHabitText(e.target.value);
  }

  const handlePriorityChange = (e) => {
    setHabitPriority(!habitPriority);
  }

  const handleHabitSubmit = (e) => {
    e.preventDefault();
    if (habitText) {
      setHabitList(prev => ([
        ...prev, 
        {
          text: habitText,
          priority: habitPriority,
          id: Date.now(), 
          completed: [false, false, false, false, false, false, false]
        }
      ]));
      setHabitText('');
      setHabitPriority(false);
    }
  }

  const handleHabitSort = (e) => {
    if (habitSort.length === 0) {
      setHabitSort([e.target.value])
    } else {
      setHabitSort([]);
    }
  }

  return (
    <div>
      <form>
        <div>
          <input 
            className="text-input"
            type="text"
            placeholder=" Enter a new habit"
            value={habitText}
            onChange={handleTextChange}
          />
          <button className ="star-btn" type="button" onClick={handlePriorityChange}><i className={`bi ${habitPriority ? 'bi-star-fill' : 'bi-star'}`}></i></button>
        </div>
        <button type="submit" onClick={handleHabitSubmit}>
          <i className="bi bi-plus-lg"></i> Add
        </button>
      </form>
      <div className="sort">
        <label>SORT BY:</label>
        <button onClick={handleHabitSort} value="priority" className={`${habitSort.includes('priority') ? "selected" : ""}`}><i className="bi bi-star-fill"></i> priority</button>
      </div>
    </div>
  )
}


export default HabitInput;