import React, { useState, useEffect } from 'react';
import './styles/styles.css';

// components
import TaskContainer from './components/Tasks/TaskContainer';
import HabitContainer from './components/Habits/HabitContainer';

// utils
import getToday from './utils/getToday';

function App() {
  const todayObj = getToday(); // object with date info
  const [today, setToday] = useState(todayObj);
  const [display, setDisplay] = useState(['Tasks', 'Habit Tracker']);
  const [color, setColor] = useState('#8cc0bd');

  useEffect(() => {
    const ONE_MIN = 1000*60;
    const dateInterval = setInterval(() => {
      const newDate = getToday();
      setToday(newDate);
    }, ONE_MIN);
    return function cleanup() {
      clearInterval(dateInterval);
    }
  }, [today]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }


  useEffect(() => {
    document.documentElement.style.setProperty('--base', color);
    const opaque = `${color}50`;
    document.documentElement.style.setProperty('--base-opaque', opaque);
  }, [color]);

  const handleDisplayChange = (e) => {
    const topContainer = e.target.innerHTML;
    const newDisplay = display.filter(container => container !== topContainer)
    newDisplay.unshift(topContainer);
    setDisplay(newDisplay);
  }

  const saveSessionColor = () => {
    sessionStorage.setItem('color', JSON.stringify(color));
  }

  const getSessionColor = () => {
    let sessionColor = sessionStorage.getItem('color');
    if (sessionColor) {
      setColor(JSON.parse(sessionColor));
    }
    // if the item doesn't exist, the default state from the hook will be used
    // the storage key will remain empty until the list changes
  }

  useEffect(() => {
    getSessionColor();
  }, []);

  useEffect(() => {
    saveSessionColor();
  });



  return (
    <div className="App">
      <header>
        <div className="header-text">
          <h1>minibul</h1>
          <p>a <span className="underline">mini</span>malist digital planner inspired by my own <span className="underline">bul</span>let journal designs!</p>
        </div>
        <div className="header-date-time">
          <div className="header-time">{today.time}</div>
          <div>{today.weekday} | {today.month} {today.date}, {today.year}</div>
          <div className="help-text">
            <label htmlFor="color-picker">Choose your planner color!</label>
            <input type="color" value={color} id="color-picker" onChange={handleColorChange} />
          </div>
        </div>
      </header>
      <nav>
        <p>TOGGLE DISPLAY:</p>
        <ul>
          <li className={`${display[0] === 'Tasks' ? "nav-link-active" : ""}`} onClick={handleDisplayChange}>Tasks</li>
          <li className={`${display[0] === 'Habit Tracker' ? "nav-link-active" : ""}`} onClick={handleDisplayChange}>Habit Tracker</li>
        </ul>
      </nav>
      {display.map(container => container === 'Tasks' ? <TaskContainer today={today} key="task-container"/> : <HabitContainer today={today} key="habit-container"/>)}
      
      
    </div>
  );
}

export default App;
