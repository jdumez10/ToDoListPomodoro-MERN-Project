import mongoose from 'mongoose';

// Destructure the Schema class from the mongoose module
const { Schema } = mongoose;

// Define the task schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Create and export the Task model based on the task schema
export default mongoose.model('Task', taskSchema);