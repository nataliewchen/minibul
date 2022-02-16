import React, {useState, useEffect} from 'react';
import '../../css/Habits.css';

// components
import HabitInput from './HabitInput';
import HabitTracker from './HabitTracker';

const HabitContainer = ({today}) => {
  const [habitText, setHabitText] = useState('');
  const [habitPriority, setHabitPriority] = useState(false);
  const [habitList, setHabitList] = useState([]);
  const [habitSort, setHabitSort] = useState([]);
  const [sortedHabits, setSortedHabits] = useState([]);

  const handleSortHabits = () => {
    if (habitSort.includes('priority')) {
      const habitCopy = [...habitList];
      habitCopy.sort(habit => habit.priority ? -1 : 1);
      setSortedHabits(habitCopy);
    } else {
      setSortedHabits(habitList);
    }
  }

  const saveSessionHabits = () => {
    sessionStorage.setItem('habits', JSON.stringify(habitList));
  }

  const getSessionHabits = () => {
    let sessionHabits = sessionStorage.getItem('habits');
    if (sessionHabits) {
      setHabitList(JSON.parse(sessionHabits));
    }
    // if the item doesn't exist, the default state from the hook will be used
    // the storage key will remain empty until the list changes
  }

  useEffect(() => {
    getSessionHabits();
  }, []);

  useEffect(() => {
    handleSortHabits();
    saveSessionHabits();
  }, [habitList, habitSort])

  return (
    <section className="habit-container">
      <h2 className="container-title">Habit Tracker</h2>
      <HabitInput 
        habitText={habitText} setHabitText={setHabitText} 
        habitPriority={habitPriority} setHabitPriority={setHabitPriority}
        habitsList={habitList} setHabitList={setHabitList}
        habitSort={habitSort} setHabitSort={setHabitSort}
      />
      {sortedHabits.length > 0 ? 
      <HabitTracker today={today} habitList={habitList} setHabitList={setHabitList} sortedHabits={sortedHabits}/>
      : ""}
    </section>
  )
}


export default HabitContainer;