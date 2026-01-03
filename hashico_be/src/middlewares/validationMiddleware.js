const response = require('../utils/response');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        // Jika tidak lolos validasi, stop dan kirim error 400
        return response(res, 400, "error", error.details[0].message, null);
    }
    next();
};

module.exports = validate;