import { Schema, model, models } from 'mongoose';

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 127,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  customField1: {
    name: { type: String },
    content: { type: String },
  },
  customField2: {
    name: { type: String },
    content: { type: String },
  },
  customField3: {
    name: { type: String },
    content: { type: String },
  },
  customField4: {
    name: { type: String },
    content: { type: String },
  },
  customField5: {
    name: { type: String },
    content: { type: String },
  },
  userId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export default models.Projects || model('Projects', projectsSchema);
