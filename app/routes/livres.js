const express = require('express'),
    livresRoutes = express.Router(),
    LivreController = require('../controllers/livres');

module.exports = (app) => {

    livresRoutes.get('/livres', LivreController.getAll);
    

    
    livresRoutes.get('/livres/new', LivreController.new);
    livresRoutes.post('/livres/create', LivreController.new);
    
    livresRoutes.get('/livres/:id', LivreController.getById);

    livresRoutes.get('/livres/:id/edit', LivreController.edit);
    livresRoutes.post('/livres/:id/update', LivreController.edit);
    livresRoutes.post('/livres/:id/update-status', LivreController.updateStatus);

    livresRoutes.get('/livres/:id/delete', LivreController.deleteById);

    app.use('/', livresRoutes);

};

