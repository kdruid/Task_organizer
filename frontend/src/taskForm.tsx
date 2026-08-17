import { useState } from "react";
import { Priority_colors , type Priority} from "./constants/priority";

export interface Task{
    taskName: string;
    description: string,
    deadline: string,
    priority: Priority
}

interface TaskFormProps {
    onSave: (task: Task) => void;
    onClose: () => void;
}

function TaskForm({ onClose, onSave }: TaskFormProps) {
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Optional");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");


  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: save the task (Dexie comes later)
    
    const task: Task = {
        taskName,
        description,
        deadline,
        priority
    }
    onSave(task);
    onClose();
  }

  return (
    <form className="tasks" onSubmit={handleSubmit}>
      <button type="button" className="close-btn" onClick={onClose}>
        ✕
      </button>

      <label>
        Task name
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>

      
      <label>
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

      <label>
        Description
        <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}

        />
      </label>
      <br />

      <label>
        Deadline
        <input 
        type="date" 
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
/>
      </label>

      <button type="submit">Save Task</button>
    </form>
  );
}

export default TaskForm;