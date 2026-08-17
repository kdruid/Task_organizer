import { useState } from 'react';
import './App.css'
import TaskForm, {type Task} from './taskForm'


function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([])
  
  function handleSaveTask(newTask:Task){
    setTasks((prevTasks) => [...prevTasks,newTask])
  }
  return (

  <>
  <header>
  <h1>
      Task_Organizer
    </h1>


  </header>

  <main>
    {tasks.map((task, i) => (
    <div key={i} className="task-card">
      <h3>{task.taskName}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Priority: {task.priority}</p>
    </div>
  ))}
  </main>
  {isFormOpen && (
  <div className="overlay">
    <TaskForm onSave={handleSaveTask} onClose={() => setIsFormOpen(false)} />
  </div>
    )}    
    
    
    <button
    className='add_button'
    id='add_button'
    onClick={() => setIsFormOpen(true)}>
      +
    </button>
    
    
    </>
  )
}


export default App
