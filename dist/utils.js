"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteger = void 0;
function isInteger(input) {
    var _a;
    return (_a = input === null || input === void 0 ? void 0 : input.match(/^\d+$/)) !== null && _a !== void 0 ? _a : false;
}
exports.isInteger = isInteger;
