import { useState, useEffect } from 'react';
import './taskPage.css'; 
import './taskForm.css'
import TaskForm, {type Task} from './taskForm'
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import { Priority_colors,Priority_text_colors } from './constants/priority';
import { db } from './db/db';
import { Routes, Route } from 'react-router-dom';


function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const completedTasks = tasks.filter((t) => t.completed);
  const activeTasks = tasks.filter((t) => !t.completed);
  
  useEffect(() => {
    async function loadTasks() {
      const storedTasks = await db.tasks.toArray();
      setTasks(storedTasks);
    }
    loadTasks();
  }, []);
  async function handleSaveTask(newTask: Task) {
    await db.tasks.put(newTask);
    setTasks((prevTasks) => {
      const exists = prevTasks.some((t) => t.id === newTask.id);
      if (exists) {
        return prevTasks.map((t) => (t.id === newTask.id ? newTask : t));
      }
      return [...prevTasks, newTask];
    });
  }

  async function handleDeleteTask(id: string) {
    await db.tasks.delete(id);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }
  

  function handleEditClick(task: Task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleCloseForm() {         // ← now a sibling, not nested
    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleAddClick() {          // new — for the "+" button specifically
    setEditingTask(null);              // make sure we're not still "editing" something old
    setIsFormOpen(true);
  }

  async function handleCompleted( id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    await db.tasks.put(updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? updatedTask : t))
  );
}

  return (
    <>
      <header>
        <h1>Task_Organizer</h1>
        <button type="button" className='completed_tasks'>Completed tasks</button>
      </header>

      <main>
        {tasks.map((task) => (
          <>
          <div key={task.id} className="task-card" style={{ 
            backgroundColor: `color-mix(in srgb, ${Priority_colors[task.priority]} 78%, white)`,
            color: Priority_text_colors[task.priority] }} >
            <div className="task-main">
              <div className="task-content">
                <div className="task-top-row">
                  <span className="task-name">{task.taskName}</span>
                </div>

                <p className="task-description" style={{color: Priority_text_colors[task.priority]}} >
                  Description: {task.description}</p>

                <div className="task-bottom-row">
                  <span className="task-deadline" style={{color: Priority_text_colors[task.priority]}}>Deadline: {task.deadline}</span>
                  <button type="button" className="view-more-btn">
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="task-actions">
                <button type="button" className="edit-btn" onClick={() => handleEditClick(task)}>
                  Edit task
                </button>
                <button type="button" className="checkmark-btn" onClick={() => handleCompleted(task.id)} style={{ color: task.completed ? "#2ecc71" : "#ccc" }}>
                  <FaCheck />
                </button>
                <button type='button' className="trash" onClick={() => handleDeleteTask(task.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        </>
        ))}
      </main>

      {isFormOpen && (
        <div className="overlay">
          <TaskForm
            onSave={handleSaveTask}
            onClose={handleCloseForm}
            onDelete={handleDeleteTask}
            existingTask={editingTask ?? undefined}
          />
        </div>
      )}

      <button type='button' className='add_button' id='add_button' onClick={handleAddClick}>
        Add task
      </button>
    </>
  );
}


export default App
