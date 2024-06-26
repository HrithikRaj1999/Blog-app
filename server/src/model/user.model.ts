import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "super-admin";
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user", "super-admin"],
      default: "user",
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
