import { Schema, model } from "mongoose";

export interface BlogType {
  heading: string;
  author: string;
  description: string;
  createdBy: Schema.Types.ObjectId;
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

export default model<BlogType>("Blog", blogSchema);
