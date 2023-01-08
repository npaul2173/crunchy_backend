import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Logging from 'utils/library/logging';
import { sequel } from './models';
import { customerRoutes } from 'routes/customer.router';
import { cuisinesRoutes } from 'routes/cuisines.router';
import { routerTypes } from 'routes/role.router';
import { PartnerRoutes } from 'routes/partner.router';
import { categoryRoutes } from 'routes/categories.router';
import { RoleModel } from 'models/role/model';

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;

        this.InitializeDatabaseConnection();
        this.InitializeMiddleware();
        this.initializeControllers();
        this.initializeSwagger();
        this.initializeData();
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

    private initializeControllers(): void {
        this.express.use('/api', customerRoutes);
        this.express.use('/api', cuisinesRoutes);
        this.express.use('/api', routerTypes);
        this.express.use('/api', PartnerRoutes);
        this.express.use('/api', categoryRoutes);
        this.express.get('/', (req, res, next) =>
            res
                .status(200)
                .json({ message: 'Port is Healthy 💪 and running 🏃🏃' })
        );
    }

    private InitializeDatabaseConnection(): void {
        try {
            sequel.sync({ force: false });
            Logging.info('Postgres Database  Connected 🔗');
        } catch (error) {
            console.error(
                '❌ ❌ Unable to connect to the database 🗃️🗃️:',
                error
            );
        }
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            Logging.info(`App listening on the port ${this.port} 🤞`);
        });
    }

    private initializeData(): void {
        RoleModel.sync().then(() => {
            RoleModel.upsert({
                id: 1,
                roleName: 'Admin',
            });
            RoleModel.upsert({
                id: 2,
                roleName: 'Owner',
            });
            RoleModel.upsert({
                id: 3,
                roleName: 'Manager',
            });
            RoleModel.upsert({
                id: 4,
                roleName: 'Customer',
            });
        });
    }
}

export default App;
