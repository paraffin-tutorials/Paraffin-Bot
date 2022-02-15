import DevelopmentLogger from '../Util/Logger/Development.Logger';
import ProductionLogger from '../Util/Logger/Production.Logger';

const logger: any = process.env.NODE_ENV === 'development' ? DevelopmentLogger() : ProductionLogger();

export default logger;
