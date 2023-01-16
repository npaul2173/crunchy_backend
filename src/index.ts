import 'dotenv/config';
import 'module-alias/register';
import Logging from 'utils/library/logging';
import App from './app';
const app = new App(Number(process.env.PORT));

app.listen();

// console.log(
//     ' process.env.HOST',
//     process.env.HOST,
//     'process.env.USERNAME',
//     process.env.USERNAME,
//     ' process.env.PASSWORD',
//     process.env.PASSWORD,
//     'process.env.USERNAME',
//     process.env.USERNAME
// );
