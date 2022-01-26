const winston = require('winston');

module.exports = () =>
    {
        return winston.createLogger(
            {
                format: winston.format.combine(
                    winston.format.label({ label: 'ParaffinBot' }),
                    winston.format.timestamp(),
                    winston.format.errors({ stack: true }),
                    winston.format.json()
                ),
                defaultMeta: { service: 'user-service' },
                transports: [ new winston.transports.Console() ]
            });
    }
