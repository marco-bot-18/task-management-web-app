import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Task from '../src/models/Task.js';
import { connectDB } from '../src/config/db.js';

const run = async () => {
  await connectDB(process.env.MONGO_URI);

  console.log('Clearing existing data...');
  await Task.deleteMany({}); 
  await User.deleteMany({});

  console.log('Creating users...');
  const [alice, bob] = await User.create([
    { name: 'Alice Tester', email: 'alice@example.com', password: 'password123' },
    { name: 'Bob Dev', email: 'bob@example.com', password: 'password123' }
  ]);

  console.log('Creating tasks...');
  await Task.create([
    { title: 'Set up project', description: 'Init repo and install deps', status: 'completed', user: alice._id },
    { title: 'Design schema', description: 'Users and Tasks models', status: 'in-progress', user: alice._id },
    { title: 'Write docs', description: 'README and API docs', status: 'pending', user: bob._id }
  ]);

  console.log('Seed complete!');
  await mongoose.connection.close();
};

run().catch(async (e) => {
  console.error(e);
  await mongoose.connection.close();
  process.exit(1);
});
