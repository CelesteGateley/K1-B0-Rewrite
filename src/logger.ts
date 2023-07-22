import winston, { createLogger, transports, format, exceptions } from 'winston';
import fs from 'fs';

class Logger {
    private winston: winston.Logger;

    constructor(filename: string = 'default') {
        this.winston = createLogger({
            transports: [
                new transports.Stream({
                    stream: fs.createWriteStream(`logs/${filename}.log`),
                }),
                new transports.Console(),
            ],
            exitOnError: false,
            exceptionHandlers: [
                new transports.Stream({
                    stream: fs.createWriteStream('logs/errors.log'),
                }),
            ],
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp(),
                format.printf(({ timestamp, level, message, service }) => {
                    return `[${timestamp}] ${service} ${level}: ${message}`;
                }),
            ),
            defaultMeta: {
                service: 'K1-B0',
            },
        });
    }

    private log(level: string, message: string) {
        this.winston.log({ level: level, message: message });
    }

    public info(message: string) {
        this.log('info', message);
    }

    public warning(message: string) {
        this.log('warning', message);
    }

    public error(message: string|Error) {
        if (typeof (message) == 'string') {
            this.log('error', message);
        } else {
            this.winston.error(exceptions.getAllInfo(message));
        }
    }
}

export const logger: Logger = new Logger();
