import { serverConfig } from 'config/database';
import { Sequelize } from 'sequelize';

const sequel: Sequelize = new Sequelize(
    serverConfig.DB!,
    serverConfig.USER!,
    serverConfig.PASSWORD!,
    {
        host: serverConfig.HOST,
        dialect: 'postgres', //  needs to come from actual serverConfig;
        // operatorsAliases: false,

        pool: {
            max: serverConfig.pool.max,
            min: serverConfig.pool.min,
            acquire: serverConfig.pool.acquire,
            idle: serverConfig.pool.idle,
        },
        logging: true,
    }
);

export { sequel };
