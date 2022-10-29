import log4js from 'log4js'

log4js.configure({
    appenders: { append: { type: "file", filename: `logs/error.log` } },
    categories: { default: { appenders: ["append"], level: "ERROR" } },
  });

log4js.configure({
    appenders: { append: { type: "file", filename: `logs/info.log` } },
    categories: { default: { appenders: ["append"], level: "INFO" } },
  });
    
export const logger = log4js.getLogger();