import { body, validationResult } from "express-validator"

const signupValidationRules = [
    body('firstname').trim().isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters!'),
    body('lastname').trim().isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters!'),
    body('email').trim().isEmail().withMessage('Invalid email address!'),
    body('password').isLength({ min: 6 }).not().isUppercase().not().isLowercase().not().isNumeric().withMessage('Password must be at least 6 characters and contain at least one lowecase,one uppercase and one numeric letter!'),
    body('confPassword').not().equals('password').withMessage('Confirm password not match!'),
];

const validateData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().at(errors.array().length - 1).msg });
    }
    next();
}

export { signupValidationRules, validateData };
