import React, {useState} from 'react';

const Task = ({task, setList}) => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  }
  
  const handleCompleted = () => {
    setList(prev => prev.map(prevTask => {
      if (prevTask.id === task.id) {
        return {
          ...task,
          completed: !task.completed
        };
      } else {
        return prevTask
      }
    }));
  }

  const handleDelete = () => {
    setList(prev => prev.filter(prevTask => prevTask.id !== task.id));
  }

  return (
      <li className={`task ${task.completed ? "completed" : ""} ${task.priority ? "priority" : ""}`}>
        <button onClick={handleCompleted} className="task-checkbox"><i className={`check-icon bi bi-check-lg ${!task.completed ? "hide-check" : ""}`}></i></button>
        <span onDoubleClick={toggleOptions} className="task-text">
          {task.text} {task.priority ? <i className="bi bi-star-fill"></i> : ""}
        </span>
        <button className={`delete-task ${showOptions ? "" : "hide-delete"}`}onClick={handleDelete}><i className="bi bi-trash"></i></button>
      </li>
  );
}

export default Task;