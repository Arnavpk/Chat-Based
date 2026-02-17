import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/utils.js';

export const signup = async (req, res) => {

    //get user details form frontend
    //validate user details
    //check if user exists
    //create new user in database
    //generate JWT token
    //send response to frontend

    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const profilePic = ""

        const existingUser = await User.findOne({ $or: [{ fullname }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Fullname or email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            });


        } else {
            return res.status(500).json({ message: "Error creating user" });
        }
    }
    catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};