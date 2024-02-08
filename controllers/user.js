import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendCookie } from "../utils/features.js";
import cookieParser from "cookie-parser";

export const registerUser = async (req , res) => {
    const {name , email , password} = req.body;

    const findUser = await User.findOne({email});

    if(findUser) {
        return res.status(404).json({
            success: false ,
            messgae: 'user already exist. Please login'
        });
    }

    const hashedPassword = await bcrypt.hash(password , 10);


    const newUser = User.create({
        name: name ,
        email: email ,
        password: hashedPassword
    })
    const message = 'registered successfully';
    sendCookie(newUser._id , res , message , 201);
};

export const loginUser = async(req , res) => {
    const {email , password} = req.body;
    // for password we have marked as select false in the Schema so 
    // to asscess the password we have to select it additoinally using the select keyword

    // don't forget to use await if you are using the async function
    const curUser = await User.findOne({email}).select('+password');
    if(!curUser) {
        return res.status(404).json({
            success: false ,
            message: 'invalid email or password'
        });
    }


    const isMatch = await bcrypt.compare(password , curUser.password);

    if(!isMatch) {
        return res.status(404).json({
            success: false ,
            message: 'invalid email or password'
        });
    }
    const message = `login successfully. Welcome back ${curUser.name}`;
    sendCookie(curUser._id , res , message , 200);
};

export const getallUser = async (req , res) => {
    
};

export const getUserDetails = (req , res) => {
    res.status(401).json({
        success: true ,
        user: req.user
    })
};

export const logout = (req , res) => {
    console.log(process.env.NODE_ENV)
    res.status(401)
    .cookie('token' , '' , {
        expires: new Date(Date.now())
    }).
    json({
        success: true ,
        user: req.user ,
        sameSite: process.env.NODE_ENV === 'localHost' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'localHost' ? true : false
    })
}