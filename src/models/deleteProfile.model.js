import mongoose from "mongoose";

const profileDeleteSchema = new mongoose.Schema(
  {
    name: String ,
    email: String,
    password: String,
    deletedAt: Date,
    reason: String
  },
);

const DeletedProfile  = mongoose.model("DeletedProfile", profileDeleteSchema);

export default DeletedProfile;