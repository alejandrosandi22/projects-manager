import { Schema, model, models } from 'mongoose';

new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [50, 'Title must be less than 50 characters']
  }
})