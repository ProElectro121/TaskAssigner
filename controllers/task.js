import { Task } from "../models/task.js";

export const newTask = async (req , res) => {
    const {title , description} = req.body;
    

    const curTaks = await Task.create({
        title: title ,
        description: description ,
        user: req.user[0]
    });

    res.status(201).json({
        success: true ,
        message: 'Task created'
    });
};

export const getTask = async (req , res , next) => {
    const userId = req.user[0]._id;
    const task = await Task.find({user: userId});
    res.status(200).json({
        success: true , 
        tasks: task
    });
};

export const updateTask = async (req , res , next) => {
    const userId = req.params.id;
    const task = await Task.findById(userId);

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        success: true ,
        message: 'task updated'
    });
};

export const deleteTask = async (req , res , next) => {
    const userId = req.params.id;
    const task = await Task.findById(userId);
    await task.deleteOne();

    res.status(200).json({
        success: true ,
        message: 'task updated'
    });
}