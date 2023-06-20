import log4js from 'log4js';
import path from 'path';
import dotenv from'dotenv';
dotenv.config();


log4js.configure({
    appenders: {
        terminal: {type: 'console'},
        warnFile: {type: 'file', filename: 'log/warn.log'},
        errorFile: {type: 'file', filename: 'log/error.log'},
        loggerConsole: {type: 'logLevelFilter', appender: 'terminal', level: 'all'},
        loggerArchiveWarn: {type: 'logLevelFilter', appender: 'warnFile', level: 'warn', maxLevel: 'warn'},
        loggerArchiveError: {type: 'logLevelFilter', appender: 'errorFile', level: 'error', maxLevel: 'error'}
    },
    categories: {
        default: {appenders: ['loggerArchiveWarn', 'loggerArchiveError'], level: 'warn'},
        dev: {appenders: ['loggerConsole','loggerArchiveWarn', 'loggerArchiveError'], level: 'all'}
    }
})

const category = process.env.LOGGER_CATEGORY || 'default'

const logger = log4js.getLogger(category);

export default logger;