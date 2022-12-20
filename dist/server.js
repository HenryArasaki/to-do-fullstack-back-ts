"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var result = dotenv.config();
if (result.error) {
    console.log("Error loading environment variables");
    process.exit(1);
}
console.log(process.env.PORT);
var express = require("express");
var logger_1 = require("./logger");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
var data_source_1 = require("./data-source");
var app = express();
function setupExpress() {
    app.route("/").get(root_1.root);
}
function startServer() {
    var port;
    var portArg = process.argv[2];
    var portEnv = process.env.PORT;
    if ((0, utils_1.isInteger)(portEnv)) {
        port = parseInt(portEnv);
    }
    if (!port && (0, utils_1.isInteger)(portArg)) {
        port = parseInt(portArg);
    }
    if (!port) {
        port = 9000;
    }
    app.listen(port, function () { return logger_1.logger.info("Server is running"); });
}
data_source_1.AppDataSource.initialize()
    .then(function () {
    logger_1.logger.info('DataSource initialized successfully');
    setupExpress();
    startServer();
})
    .catch(function (error) {
    logger_1.logger.error('Error during dataSource initialization - ', error);
    process.exit(1);
});
