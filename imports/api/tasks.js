import { Mongo } from 'meteor/mongo';

// Create a Mongo collection called 'tasks'
export const tasks = new Mongo.Collection('Tasks');
