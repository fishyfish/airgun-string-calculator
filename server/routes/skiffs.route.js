//import myt controllers
const SkiffsController = require('../controllers/skiffs.controller');
const { authenticate } = require("../config/jwt.config");

// create the valid routes
module.exports = (app) => {
    app.get('/api/skiffs', SkiffsController.getAll);
    app.post('/api/skiffs', authenticate, SkiffsController.create);
    app.get('/api/skiff/:id', SkiffsController.getOne);
    app.put('/api/skiff/:id', authenticate, SkiffsController.update);
    app.delete('/api/skiff/:id', authenticate, SkiffsController.delete);
}