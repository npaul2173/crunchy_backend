import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Logging from 'utils/library/logging';
import { Controller } from 'utils/interfaces/controller';
import { router } from 'routes/foods.router';
import { sequel } from './models';
import { customerRoutes } from 'routes/customer.router';

class App {
    public express: Application;
    public port: number;

    constructor(port: number, controllers: Controller[]) {
        this.express = express();
        this.port = port;

        this.InitializeDatabaseConnection();
        this.InitializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeSwagger();
    }

    private initializeSwagger(): void {}
    private InitializeMiddleware(): void {
        this.express.use(helmet()); // Security Layer
        this.express.use(cors()); // cors
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        // controllers.forEach((controller: Controller) => {
        //     this.express.use('/api', controller.router);
        // });
        // const foodController = new FoodController();
        this.express.use('/api', router);
        this.express.use('/api', customerRoutes);
        this.express.get('/', (req, res, next) =>
            res
                .status(200)
                .json({ message: 'Port is Healthy 💪 and running 🏃🏃' })
        );
    }

    private InitializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        Logging.info('Connected');

        // set force to true to overwrite any existing tables - all data will be lost!
        try {
            sequel.sync({ force: false });
            Logging.info('Postgres Database  Connected 🔗');
        } catch (error) {
            console.error(
                '❌ ❌ Unable to connect to the database 🗃️🗃️:',
                error
            );
        }

        // mongoose
        //     .connect(`mongodb://${MONGO_PATH}`)
        //     .then(() => Logging.info('Database  Connected 🔗'))
        //     .catch((error) => console.log(error));
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            Logging.info(`App listening on the port ${this.port} 🤞`);
        });
    }
}

export default App;
