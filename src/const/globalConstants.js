require('dotenv').config(); //Allows to use the .env file

module.exports  = {
    USERSPORT: process.env.USERSPORT || 5000 //Port for the users microservice

};
