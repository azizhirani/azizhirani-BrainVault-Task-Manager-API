import { body, validationResult } from 'express-validator';

const validateTask = [
    body('title')
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error');
            error.name = 'ValidationError';
            error.message = errors.array().map(err => err.msg).join(', ');
            return next(error);
        }
        next();
    }
];

export default validateTask;
