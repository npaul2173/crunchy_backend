import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Logging from 'utils/library/logging';
import { sequel } from './models';
import { customerRoutes } from 'routes/customer.router';
import { cuisinesRoutes } from 'routes/cuisines.router';
import { restaurantRoutes } from 'routes/restaurant.router';
import { PartnerRoutes } from 'routes/partner.router';
import { categoryRoutes } from 'routes/categories.router';
import { productRoutes } from 'routes/product.router';
import fs from 'fs';
import { sampleRouter } from 'routes/csv.route';
import { uploadRoutes } from 'routes/file.upload.router';
import { diningRestaurantRoutes } from 'routes/dining.restaurant.router';

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
        this.express.use('/api', restaurantRoutes);
        this.express.use('/api', PartnerRoutes);
        this.express.use('/api', categoryRoutes);
        this.express.use('/api', productRoutes);
        this.express.use('/api', sampleRouter);
        this.express.use('/api', uploadRoutes);

        // DINING
        this.express.use('/api', diningRestaurantRoutes);

        this.express.get('/', (req, res, next) =>
            res
                .status(200)
                .json({ message: 'Port is Healthy 💪 and running 🏃🏃' })
        );
    }

    private InitializeDatabaseConnection(): void {
        try {
            sequel.sync({ force: false, alter: true });
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

    private initializeData(): void {}
}

export default App;
