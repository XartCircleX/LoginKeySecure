//Connect all the routes

const {Router} = require ('express');
const userRoutes = require("./user.routes");

const routes_init = () => {
    const router = Router();

    router.use("/users", userRoutes);
    //router.use("/posts", postRoutes)

    return router;

}

module.exports = { routes_init };
