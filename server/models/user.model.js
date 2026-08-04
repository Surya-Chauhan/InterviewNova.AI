import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  credits: {
    type: Number,
    default: 150,
  },
});

const User = mongoose.model("User", userSchema);

export default User;