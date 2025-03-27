require('dotenv').config();
const express = require('express');
const globalConstants = require('./const/globalConstants');
const routerController = require('./routes/index.routes');

//--------------------------------------------
const apiConfig = (app) => { //API configuration
    app.use(express.json()); // Allows to get data in JSON format
    app.use(express.urlencoded({ extended: true }));
}; 

const routerConfig = (app) => {
    app.use('/api/', routerController.routes_init());
};

const init = () => {
    const app = express(); //Express instance

    apiConfig(app); //API configuration
    routerConfig(app);

    const usersPort = process.env.USERSPORT || 5000;
    //Confirmation that the server is running
    app.listen(usersPort, () => {
        console.log('\n\n--------------------------------------------');
        console.log(`\n Server is running on http://localhost:${usersPort} \n`);
        console.log('--------------------------------------------\n\n');
    });
};

init(); //Call the init function