import { Schema, model } from "mongoose";
import { IUser } from "../utils/interface/User";
const UserSchema = new Schema<IUser>({
  userId: {
    type: "String",
    required: true,
    default: "",
  },
  tasks: {
    type: [Object],
    default: [],
    required: false,
  },
});
const User = model("User", UserSchema);
export default User;
