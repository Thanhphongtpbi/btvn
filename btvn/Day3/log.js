const logMiddleware = function (req, res, next) {
    console.log('URL: ', req.url);
    console.log('Method: ', req.method);
    next();
}

module.exports = logMiddleware;