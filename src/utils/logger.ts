const winston = require('winston')
require('winston-mongodb')
const {DB_URL} = process.env


winston.add(winston.transports.File , {filename : 'error.log'})
winston.add(winston.transports.MongoDB ,
     {db  : DB_URL})

export {winston}