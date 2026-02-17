import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: [true, "Username is required"],
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    //     index: true
    // },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    fullname: {
        type: String,
        required: [true, "Full name is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },

    profilePic: {
        type: String,
        default: ""
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;