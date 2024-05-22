import mongoose from 'mongoose';

import { Task } from "#models/tasks.models";

const createTask = async (req, res, next) => {
    const task = new Task(req.body);
    try {
        const savedTask = await task.save();
        res.status(201).json({
            message: 'Task created successfully',
            task: {
                id: savedTask._id,
                title: savedTask.title,
                description: savedTask.description,
                completed: savedTask.completed
            }
        });
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// UPDATING TASK FUNCTION :
const updateTask = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task updated successfully',
            task: {
                id: task._id,
                title: task.title,
                description: task.description,
                completed: task.completed
            }
        });
    } catch (error) {
        next(error);
    }
};


// DELETING TASK FUNCTION
const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
