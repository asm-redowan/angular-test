const { body, header, validationResult } = require('express-validator')
const base64Regex = /^[A-Za-z0-9+/=]+$/;
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/;

const addCompanyValidator = [
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('email').isString().isEmail().matches(emailPattern).notEmpty().withMessage('Valid email is required'),
    body('package').isString().notEmpty().withMessage('Package is required'),
    body('description').optional().isString().withMessage('Description must be a string'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Please Provide",
                errors: errors.array()
            });
        }
        next();
    }
];


const addUserValidator = [
    body('name').isString().notEmpty(),
    body('email').isString().isEmail().matches(emailPattern).notEmpty(),
    body('password').isString().matches(passwordPattern).notEmpty(),
    body('company_id').isInt().notEmpty(),
    body('group_id').isInt().notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Please Provide",
                errors: errors.array()
            });
        }
        next();
    }
];


const updateUserValidator = [
    body('id').isInt().notEmpty(),
    body('company_id').isInt().notEmpty(),
    body('group_id').isInt().notEmpty(),

    (req, res, next) => {
        // console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Please Provide",
                errors: errors.array()
            });
        }
        next();
    }
];




const addGroupValidator = [
    body('group_name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    (req, res, next) => {
        // console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Please Provide",
                errors: errors.array()
            });
        }
        next();
    }
];





module.exports = { addCompanyValidator, addUserValidator, updateUserValidator, addGroupValidator }