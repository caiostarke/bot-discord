import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        // Log to console
        new winston.transports.Console(),
        // Log to a file
        new winston.transports.File({ filename: 'app.log', level: 'error' }),
    ]
})

export function log(level, message) {
    logger.log({level, message})
}