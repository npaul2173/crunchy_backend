import { DATABASE, HOST, PASSWORD, USER } from '@env';

export const serverConfig = {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: DATABASE,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
