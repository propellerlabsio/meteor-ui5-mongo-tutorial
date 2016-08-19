import { tasks } from '../imports/api/tasks.js';

// Temporary code: Insert some tasks if the collection is empty
const taskCount = tasks.find().count();
if (!taskCount) {
  tasks.insert({ text: 'This is mongo task 1' });
  tasks.insert({ text: 'This is mongo task 2' });
  tasks.insert({ text: 'This is mongo task 3' });
}
