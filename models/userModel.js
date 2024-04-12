import { Schema, model } from "mongoose";

// userSchema for user entitie
const userSchema = new Schema ({
  fullName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})



// models for each 
const UserModel = model('User', userSchema);

export default UserModel