const Livres = require('../models/livres');
const Category = require('../models/category');

/**
 * Method used for retrieve all the Categori
 * @param req
 * @param res
 * @param next
 */
exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.find()
        for (const category of categories) {
            category.bookCount = await Livres.countDocuments({ category: category._id });
          }
        res.render('category/index', { categories });
    }
    catch (error) {
        console.error(error);
        return res.redirect('/errors');
    }
};

/**
 * Method used for retrieve an offer by his id
 * @param req
 * @param res
 * @param next
 */
exports.getById = async (req, res, next) => {
    try {
        // Vérifie si l'URL contient "new" ou "edit", dans ce cas, passe au middleware suivant
        if (req.path.includes('new') || req.path.includes('edit')) {
            return next();
        }
       
        const category = await Category.findById(req.params.id);

        if (!category) {
            console.error('Category not found');
            return res.redirect('/errors');
        }
        // Recherche les livres associés à cette catégorie
        const livres = await Livres.find({ category: category._id });

        // Rend la vue avec les données de la catégorie et ses livres associés
        res.render('category/single', { category, livres });
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};


/**
 * Method used for add a new offer or show the new page
 * @param req
 * @param res
 * @param next
 */
exports.new = async(req, res, next) => {
    if(req.method === 'POST') {
        try {

            const categories = new Category({
                ...req.body,
            })

            await categories.save();

            res.redirect('/category');
        }
        catch(e) {
            console.error(e);
            res.redirect('/errors')
        }
    }
    else {
        return res.render('Category/new'); // If GET show the form page
    }
};

/**
 * Method used for update an offer or retrieve the offer to edit and display it
 * @param req
 * @param res
 * @param next
 */
exports.edit = async (req, res, next) => {
    if (req.method === 'POST') {
        // Update the offer
        try {
            const categoryId = req.params.id;
            await Category.findByIdAndUpdate(categoryId, req.body, { new: true }); 
            res.redirect('/Category');
        } catch (e) {
            console.error(e);
            res.redirect('/errors');
        }
    } else {
        try {
            const categoryId = req.params.id;
            const categories = await Category.findById(categoryId);

            if (!categories) {
                console.error('Category not found');
                return res.redirect('/errors');
            }

            res.render('Category/edit', { categories });
        } catch (e) {
            console.error(e);
            res.redirect('/errors');
        }
    }
};

/**
 * Method used for delete an offer by his id
 * @param req
 * @param res
 * @param next
 */

exports.deleteById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        await Livres.updateMany(
            { category: categoryId },
            { $unset: { category: "" } } 
        );

        // Supprime la catégorie
        await Category.findByIdAndDelete(categoryId);

        res.redirect('/category');
    } catch (e) {
        console.error(e);
        res.redirect('/errors');
    }
};
