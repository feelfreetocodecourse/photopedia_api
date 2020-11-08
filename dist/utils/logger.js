"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winston = void 0;
var winston = require('winston');
exports.winston = winston;
require('winston-mongodb');
var DB_URL = process.env.DB_URL;
winston.add(winston.transports.File, { filename: 'error.log' });
winston.add(winston.transports.MongoDB, { db: DB_URL });
