"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAdmin = void 0;
var logger_1 = require("../logger");
function checkIfAdmin(req, res, next) {
    var user = req["user"];
    if (!(user === null || user === void 0 ? void 0 : user.isAdmin)) {
        logger_1.logger.error("The user is not an admin, access denied");
        res.sendStatus(403);
        return;
    }
    next();
}
exports.checkIfAdmin = checkIfAdmin;
