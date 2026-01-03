const response = (res, statusCode, status, message, data, pagination = null) => {
    res.status(statusCode).json({
        meta: {
            code: statusCode,
            status: status,
            message: message,
            isPaginated: !!pagination
        },
        pagination: pagination,
        data: data
    });
};

module.exports = response;