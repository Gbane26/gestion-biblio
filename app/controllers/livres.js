const Livres = require('../models/livres');
const Category = require('../models/category');

/**
 * Method used for retrieve all the livres
 * @param req
 * @param res
 * @param next
 */
exports.getAll = async (req, res, next) => {
    try {
        const { categoryId } = req.query; 
        let livres;

        if (categoryId) {
            livres = await Livres.find({ category: categoryId }).populate('category');
        } else {
            livres = await Livres.find().populate('category');
        }

        const categories = await Category.find(); 
        res.render('livres/index', { livres, categories, categoryId }); 

    } catch (error) {
        console.error(error);
        res.redirect('/errors'); 
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

        const livre = await Livres.findById(req.params.id).populate('category'); 
        if (!livre) {
            console.error('Livre non trouvé');
            return res.redirect('/errors');
        }

        let livres;
        if (livre.category) {
            livres = await Livres.find({ category: livre.category._id }).populate('category');
        } else {
            livres = await Livres.find().populate('category');
        }

        res.render('livres/single', { livre, livres }); 
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
exports.new = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            const categoryId = req.body.category || null;
            const status = req.body.status === 'true';

            // Créer un nouveau livre avec les données fournies
            const livre = new Livres({
                ...req.body,
                status: status,
                category: categoryId // Associe la catégorie sélectionnée
            });

            // Sauvegarder le livre dans la base de données
            await livre.save();

            res.redirect('/livres');
        } catch (e) {
            console.error(e);
            res.redirect('/errors'); 
        }
    } else {
        try {
            const categories = await Category.find();
            return res.render('livres/new', { categories }); 
        } catch (e) {
            console.error(e);
            res.redirect('/errors'); 
        }
    }
};

/**
 * Method used for update an offer or retrieve the offer to edit and display it
 * @param req
 * @param res
 * @param next
 */
/**
 * Method used for update a book or retrieve the book to edit and display it
 * @param req
 * @param res
 * @param next
 */

exports.edit = async (req, res, next) => {
    if (req.method === 'POST') {
        // Update the offer
        try {
            const livreId = req.params.id;
            await Livres.findByIdAndUpdate(livreId, req.body, { new: true }); 
            res.redirect('/Livres');
        } catch (e) {
            console.error(e);
            res.redirect('/errors');
        }
    } else {
        try {
            const livreId = req.params.id;
            const livre = await Livres.findById(livreId);

            if (!livre) {
                console.error('Livres not found');
                return res.redirect('/errors');
            }
            const categories = await Category.find();
            res.render('Livres/edit', { livre, categories });
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
        const livreId = req.params.id;
        await Livres.findByIdAndDelete(livreId); 
        res.redirect('/livres');
    } catch (e) {
        console.error(e);
        res.redirect('/errors');
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const livreId = req.params.id;
        const newStatus = req.body.status === 'true';  

        await Livres.findByIdAndUpdate(livreId, { status: newStatus }, { new: true });

        res.redirect(`/livres/`);
    } catch (error) {
        console.error(error);
        res.redirect('/errors');
    }
};



