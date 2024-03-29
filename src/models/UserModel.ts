import { Schema, model } from "mongoose";
const UserSchema = new Schema<IUser>({
  deviceId: {
    type: "String",
    required: true,
    default: "",
  },
});
const User = model("User", UserSchema);
export default User;
