import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

// WINDOWS 
// const sequelize = new Sequelize('rincon-canino', 'remote', process.env.MYSQL_PASSWORD, {
//   host: '192.168.1.213',
//   port: 3305,
//   dialect: 'mysql',
// });

const sequelize = new Sequelize('vortexdb', 'Vortex_Admin', process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

export default sequelize;
