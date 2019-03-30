module.exports.login = (request, response) => {
    response.status(200).json({
        login: {
            email: request.body.email,
            password: request.body.password,
        },
    });
};

module.exports.registry = (request, response) => {
    response.status(200).json({
        registry: 'from controller',
    });
};