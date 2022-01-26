const ProductionLogger = require('../Util/Logger/Production.Logger');
const DevelopmentLogger = require('../Util/Logger/Development.Logger');

const LoggerService = process.env.NODE_ENV === 'development' ? DevelopmentLogger() : ProductionLogger();

module.exports = LoggerService;
