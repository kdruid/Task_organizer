import { useState } from "react";
import { Priority_colors , type Priority} from "./constants/priority";
import { FaTrash } from 'react-icons/fa';
import './App.css'; 'taskForm.css'


export interface Task{
    id: string,
    taskName: string,
    description: string,
    deadline: string,
    priority: Priority
}

interface TaskFormProps {
    onSave: (task: Task) => void;
    onClose: () => void;
    onDelete?: (id:string) => void;
    existingTask?: Task;
}

function TaskForm({ onClose, onSave, onDelete, existingTask }: TaskFormProps) {
  const [taskName, setTaskName] = useState(existingTask?.taskName ?? "");
  const [description, setDescription] = useState(existingTask?.description ?? "");
  const [deadline, setDeadline] = useState(existingTask?.deadline ?? "");
  const [priority, setPriority] = useState<Priority>(existingTask?.priority ?? "Optional");

  function handleDelete(){
    if (existingTask){
        onDelete?.(existingTask.id);
        onClose();
    }
  }


  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: save the task (Dexie comes later)
    
    const task: Task = {
        id: existingTask?.id ?? crypto.randomUUID(),
        taskName,
        description,
        deadline,
        priority
    }
    onSave(task);
    onClose();
  }

  return (
    <><form className="tasks" onSubmit={handleSubmit}>
      <button type="button" className="tasks-close-btn" onClick={onClose}>
        ✕
      </button>

      <label className="taskname">
        Task name
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>

      
      <label className="priority">
        Priority
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {Object.keys(Priority_colors).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label className="description">
        Description
        <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />

      <label className="deadline">
        Deadline
        <input 
            type="date" 
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
        />
      </label>

      <button type="submit">{existingTask ? "Update Task" : "Save Task"}</button>
      {existingTask && (
        <button type="button" onClick={handleDelete}>
            <FaTrash/>
      </button>)}
    </form> </>     
  );
}

export default TaskForm