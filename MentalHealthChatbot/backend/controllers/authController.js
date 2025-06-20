import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation: check for empty fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false,
                error: true,
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
                error: true,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create and save new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Success response
        res.status(201).json({
            message: "User registered successfully",
            success: true,
            error: false
        });

    } catch (error) {
        console.log("Signup error:", error);
        res.status(500).json({
            message: "Error in Registering User",
            success: false,
            error: true
        });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the details",
                success: false,
                error: true
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                success: false,
                error: true,
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password",
                success: false,
                error: true,
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Success response
        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            error: false,
            jwtToken,
            email: user.email,
            name: user.name
        });

    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({
            message: "Error in Login User",
            success: false,
            error: true
        });
    }
};
