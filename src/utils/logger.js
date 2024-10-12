// 
const fs = require('fs');

const logger = (message) => {
    const logMessage = `${new Date().toISOString()}: ${message}\n`;
    fs.appendFileSync('server.log', logMessage);
};

module.exports = logger;
