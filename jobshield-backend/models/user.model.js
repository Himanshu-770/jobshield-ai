import mongoose from "mongoose";
 
const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            default: "",
        },
        location: {
            type: String
        },
        avatar: {
            type: String,
        },
        password: {
            type: String,
            required: true
        }
    }, {timestamps: true})

export const User = mongoose.model("User", UserSchema);
