import React from 'react';

const TaskInput = ({
  today,
  taskText, setTaskText, 
  taskDate, setTaskDate, 
  taskPriority, setTaskPriority,
  list, setList,
  listSort, setListSort,
  editing, setEditing}) => {

  const handleTextChange = (e) => {
    setTaskText(e.target.value);
  }

  const handlePriorityChange = (e) => {
    setTaskPriority(!taskPriority);
  }

  const handleDateChange = (e) => {
    setTaskDate(e.target.value);
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskText !== '') {
      setList(prev => ([
        ...prev, 
        {
          text: taskText,
          date: taskDate,
          priority: taskPriority,
          completed: false,
          id: Date.now()
        }
      ]));
      setTaskText('');
      setTaskPriority(false);
    }
  }

  const handleListSort = (e) => {
    if (listSort.includes(e.target.value)) { // previously in list
      setListSort(prev => prev.filter(sort => sort !== e.target.value)); // remove from list
    } else { // not in list
      setListSort(prev => [...prev, e.target.value]);
    }
  }

  const toggleEdit = () => {
    setEditing(!editing);
  }

  return (
    <div>
      <form>
        <div>
          <input 
            className="text-input"
            type="text"
            placeholder=" Enter a new task"
            value={taskText}
            onChange={handleTextChange}
          />
          <button className="star-btn" type="button" onClick={handlePriorityChange}><i className={`bi ${taskPriority ? 'bi-star-fill' : 'bi-star'}`}></i></button>
        </div>
        <div className="task-input-right">
          <div>
            <select onChange={handleDateChange}>
              <option value={today.weekday}>Today</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <button 
            type="submit"
            onClick={handleTaskSubmit}
          >
            <i className="bi bi-plus-lg"></i> Add
          </button>
        </div>
      </form>
      <div className="options">
        <div className="sort">
          <label>SORT BY:</label>
          <button onClick={handleListSort} value="priority" className={`${listSort.includes('priority') ? "selected" : ""}`}><i className="bi bi-star-fill"></i> priority</button>
          <button onClick={handleListSort} value="completion" className={`${listSort.includes('completion') ? "selected" : ""}`}><i className="bi bi-check-lg"></i> completion</button>
        </div>
        <div className="edit">
          <label>DELETE TASKS:</label>
          <button onClick={toggleEdit} className={editing ? "selected" : ""}><i className={`bi ${editing? "bi-unlock-fill" : "bi-lock-fill"}`}></i></button>
        </div>
      </div>
    </div>
    );
}

export default TaskInput;