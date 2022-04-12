import { Schema, models, model } from 'mongoose';

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 255,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLenght: 255,
    minLenght: 5,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 255,
    minLenght: 5,
  },
  image: {
    type: String,
  },
}, {
  timestamps: true,
  versionKey: false,
});
export default models.User || model('User', userSchema);
