require('dotenv').config(); //Allows to use the .env file

module.exports  = {
    USERSPORT: process.env.userPort || 5000 //Port for the users microservice

};
