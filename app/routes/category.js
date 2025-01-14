const express = require('express'),
categoryRoutes = express.Router(),
categoryController = require('../controllers/category.js');

module.exports = (app) => {

    categoryRoutes.get('/category', categoryController.getAll);
    
    categoryRoutes.get('/category/new', categoryController.new);
    categoryRoutes.post('/category/create', categoryController.new);
    
    categoryRoutes.get('/category/:id', categoryController.getById);

    categoryRoutes.get('/category/:id/edit', categoryController.edit);
    categoryRoutes.post('/category/:id/update', categoryController.edit);

    categoryRoutes.get('/category/:id/delete', categoryController.deleteById);

    app.use('/', categoryRoutes);

};
