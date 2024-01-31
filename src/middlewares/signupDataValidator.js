import { body, validationResult } from "express-validator"

export const signupValidationRules = [
    body('firstname')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Firstname must be at least 2 characters!'),
    body('lastname')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Lastname must be at least 2 characters!'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address!'),
    body('password')
        .isStrongPassword({ minLength: 6 })
        .withMessage('Password must contain 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol!'),
    body('confirmPassword')
        .isStrongPassword({ minLength: 6 })
        .withMessage('Confirm password must contain 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol!')
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error('Passwords must be same')
            }
        })
];

export const validateData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ success: false, error: errors.array().at(0).msg });
    }
    next();
}
