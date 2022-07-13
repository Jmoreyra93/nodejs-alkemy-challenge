const ExpressServer = require('./server/expressServer');
const sequelize = require('./sequelize');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {

  try {
    await sequelize.authenticate();
    //sequelize.sync({ alter: true });
    sequelize.sync({ force: true });

    logger.info('DB loaded and connected');

    const server = new ExpressServer();
    logger.info('Express Loaded');

    server.start();
    logger.info(`#######################################
      Server listening in port: ${config.port}
      #######################################
    `);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
