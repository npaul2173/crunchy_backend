import { PORT } from '@env';
import 'dotenv/config';
import 'module-alias/register';
import Logging from 'utils/library/logging';
import App from './app';
const app = new App(Number(PORT));

app.listen();
