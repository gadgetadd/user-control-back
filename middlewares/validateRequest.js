const validateRequest = (schema) => {
    return ((req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400);
            throw error;
        };
        next();
    })
};

module.exports = validateRequest;