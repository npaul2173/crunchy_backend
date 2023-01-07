import 'dotenv/config';
import 'module-alias/register';
import Logging from 'utils/library/logging';
import App from './app';
const app = new App(Number(8080));

app.listen();
