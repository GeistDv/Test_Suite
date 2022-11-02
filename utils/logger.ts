import log4js from 'log4js'
log4js.configure({
    appenders: { append: { type: "file", filename: `logs/info.log` },
                 log: { type: "file", filename: `logs/error.log` } },
    categories: { default: { appenders: ["append"], level: "INFO" },
                  error:{ appenders: ["log"], level: "ERROR" } },
  });
    
export const logger = log4js.getLogger();
export const errorLogger = log4js.getLogger("error");