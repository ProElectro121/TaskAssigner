import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req , res , next) => {
    const {token} = req.cookies;
    if(!token) {
        res.status(404).json({
            success: false ,
            message: 'Please login'
        });
    }

    const data = jwt.verify(token , process.env.JWT_SECERT);
    const _id = data._id;

    // const curUser = await User.findById(_id);
    req.user = await User.find({_id});
    next();
}