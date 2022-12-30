"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
var express_1 = require("express");
var logger_1 = require("../logger");
function defaultErrorHandler(err, req, res, next) {
    logger_1.logger.error("default error handler; reason: ", err);
    if (res.headersSent) {
        return next(err);
    }
    express_1.response.status(500).json({
        status: "error",
        message: "Default error handling triggered"
    });
}
exports.defaultErrorHandler = defaultErrorHandler;
