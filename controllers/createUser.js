const { User } = require('../models/user');

const createUser = async (req, res) => {
    const { email } = req.body;
    const existentUser = await User.findOne({ email });
    if (existentUser) {
        res.status(409);
        throw new Error("Email already in use");
    };
    const { name } = await User.create({ ...req.body, });

    res.status(201).json({
        message: `User ${name} created successfully`
    });
};

module.exports = createUser;

