import { Schema, model } from "mongoose";
import { IUser } from "./user.model";

export interface BlogType {
  heading: string;
  author: string;
  description: string;
  createdBy: IUser;
}

const blogSchema = new Schema<BlogType>(
  {
    heading: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const BlogModel = model<BlogType>("Blog", blogSchema);
export default BlogModel;
