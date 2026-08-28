import Dexie, {type EntityTable } from 'dexie';
import type {Task} from '../taskForm';

const db = new Dexie('TaskOrganizerDB') as Dexie & {
  tasks: EntityTable<Task, 'id'>;
};

db.version(2).stores({
  tasks: 'id, taskName, priority, deadline, completed' // indexed fields
});

export { db };