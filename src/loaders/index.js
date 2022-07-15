const ExpressServer = require('./server/expressServer');
const sequelize = require('./sequelize');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {

  try {
    await sequelize.authenticate();
    
    require('../models/characters');
    require('../models/contentTypes');
    require('../models/genderTypes');
    require('../models/movies');

    
    //sequelize.sync({ alter: true });
    sequelize.sync({ force: false });

    logger.info('DataBase loaded and connected');


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
