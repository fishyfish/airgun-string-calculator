//import myt controllers
const airgunStringsController = require('../controllers/airgunStrings.controller');
const { authenticate } = require("../config/jwt.config");

// create the valid routes
module.exports = (app) => {
    app.get('/api/airgunStrings', airgunStringsController.getAll);
    app.post('/api/airgunStrings', authenticate, airgunStringsController.create);
    app.get('/api/airgunString/:id', airgunStringsController.getOne);
    app.put('/api/airgunString/:id', authenticate, airgunStringsController.update);
    app.delete('/api/airgunString/:id', authenticate, airgunStringsController.delete);
}