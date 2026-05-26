const rateLimit = require( "express-rate-limit");

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 5, // only 5 login attempts
    message: { message: "Too many login attempts. Try again after 15 minutes",},

    standardHeaders: true,

    legacyHeaders: false,

    skipSuccessfulRequests: true,
    // successful login won't count

});

module.exports = loginRateLimiter;