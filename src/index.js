require('dotenv').config();
const express = require('express');
const globalConstants = require('./const/globalConstants');
const routerController = require('./routes/index.routes');
const path = require('path');

//--------------------------------------------
const apiConfig = (app) => { //API configuration
    app.use(express.json()); // Allows to get data in JSON format
    app.use(express.urlencoded({ extended: true }));
}; 

const routerConfig = (app) => {
    app.use('/api/', routerController.routes_init());
};

const init = () => {
//-----------------------------------
//Server
    const app = express(); //Express instance

    apiConfig(app); //API configuration
    routerConfig(app);

//-----------------------------------
//Static files config
    // Use static archives form the folder "public"
    app.use(express.static(path.join(__dirname, 'public')));

    //Redirect to login
    app.get('/', (req, res) =>{
        res.redirect('/login');
    });

    // Route for the login.html
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'login.html'));
    });
//-----------------------------------

    const usersPort = globalConstants.USERSPORT;
    //Confirmation that the server is running
    app.listen(usersPort, () => {
        console.log('\n\n--------------------------------------------');
        console.log(`\n Server is running on http://localhost:${usersPort} \n`);
        console.log('--------------------------------------------\n\n');
    });
};

init(); //Call the init function