import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import "dotenv/config";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    lastname: { type: String, required: false },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: false },
    role: {
      type: String,
      enum: ["admin", " "],
      default: " ",
    },
  },
  { timestamps: true }
);
//createdAt
//updatedAt

profileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(parseInt(`${process.env.SALT_ROUND}`));
  const hash = await bcryptjs.hash(this.password, salt);
  this.password = hash;
  next();
});

profileSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs
    .compare(candidatePassword, this.password)
    .catch((err) => false);
};

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
