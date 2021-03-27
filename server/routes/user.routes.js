const userController = require("../controllers/user.controller");

const{ authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/user/register", userController.register);
    app.post("/api/user/login", userController.login);
    app.post("/api/user/logout", userController.logout);

    app.get("/api/user/loggedin", authenticate, userController.getLoggedInUser);
};