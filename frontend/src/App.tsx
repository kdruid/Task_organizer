import { useState, useEffect } from 'react';
import './App.css'; 
import './taskForm.css'
import TaskForm, {type Task} from './taskForm'
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import { Priority_colors } from './constants/priority';
import { db } from './db/db';


function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
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

  return (
    <>
      <header>
        <h1>Task_Organizer</h1>
      </header>

      <main>
        {tasks.map((task) => (
          <>
          <div key={task.id} className="task-card" style={{ backgroundColor: `color-mix(in srgb, ${Priority_colors[task.priority]} 60%, white)` }}>
            <div className="task-main">
              <div className="task-content" style={{ backgroundColor: `color-mix(in srgb, ${Priority_colors[task.priority]} 60%, white)` }}>
                <div className="task-top-row">
                  <span className="task-name">{task.taskName}</span>
                </div>

                <p className="task-description">Description: {task.description}</p>

                <div className="task-bottom-row">
                  <span className="task-deadline">Deadline: {task.deadline}</span>
                  <button type="button" className="view-more-btn">
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="task-actions">
                <button type="button" className="edit-btn" onClick={() => handleEditClick(task)}>
                  Edit task
                </button>
                <button type="button" className="checkmark-btn">
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

      <button className='add_button' id='add_button' onClick={handleAddClick}>
        +
      </button>
    </>
  );
}


export default App
