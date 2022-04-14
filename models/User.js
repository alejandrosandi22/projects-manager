import { Schema, models, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 255,
    minLenght: 5,
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

userSchema.plugin(uniqueValidator);

export default models.User || model('User', userSchema);
