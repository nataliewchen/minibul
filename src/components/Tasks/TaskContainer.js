import React, {useState, useEffect} from 'react';

// components
import TaskInput from './TaskInput';
import TaskList from './TaskList';


const TaskContainer = ({today}) => {
  const [taskText, setTaskText] = useState('');
  const [taskDate, setTaskDate] = useState(today.weekday);
  const [taskPriority, setTaskPriority] = useState(false);
  const [list, setList] = useState([]);
  const [listSort, setListSort] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [editing, setEditing] = useState(false);
  
  const handleSortList = () => {
    let listCopy = [...list];
    if(listSort.length === 2) { // both priority and completion
      const uncompleted = listCopy.filter(task => !task.completed); // filter out uncompleted tasks
      uncompleted.sort(task => task.priority ? -1 : 1); // push priority to top
      const completed = listCopy.filter(task => task.completed);
      listCopy = uncompleted.concat(completed); 
    } else {
      if (listSort.includes('completion')) {
        listCopy.sort(task => !task.completed ? -1 : 1);
      }
      if (listSort.includes('priority')) {
        listCopy.sort(task => task.priority ? -1 : 1);
      }
    }
    setSortedList(listCopy);
  }

  const saveSessionTasks = () => {
    sessionStorage.setItem('tasks', JSON.stringify(list));
  }

  const getSessionTasks = () => {
    let sessionTasks = sessionStorage.getItem('tasks');
    if (sessionTasks) {
      setList(JSON.parse(sessionTasks));
    }
    // if the item doesn't exist, the default state from the hook will be used
    // the storage key will remain empty until the list changes
  }

  useEffect(() => {
    getSessionTasks();
  }, []);

  useEffect(() => {
    handleSortList();
    saveSessionTasks();
  }, [listSort, list]);



  useEffect(() => {
    setTaskDate(today.weekday);
  }, [today]);

  return (    
    <section className="task-container">
      <h2 className="container-title">Tasks</h2>
      <TaskInput 
        today={today}
        taskText={taskText} setTaskText={setTaskText} 
        taskDate={taskDate} setTaskDate={setTaskDate} 
        taskPriority={taskPriority} setTaskPriority={setTaskPriority}
        list={list} setList={setList} 
        listSort={listSort} setListSort={setListSort}
        editing={editing} setEditing={setEditing}
      />
      <TaskList today={today} list={list} setList={setList} listSort={listSort} sortedList={sortedList} editing={editing} />
    </section>
  )
}


export default TaskContainer;