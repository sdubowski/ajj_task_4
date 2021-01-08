sequelize = require('../config/database')

async function dbConnectionTest() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully:');
        console.log('host: ' + sequelize.options.host);
        console.log('database ' + sequelize.getDatabaseName());
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = dbConnectionTest;
