require('dotenv').config();

const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path');

const main = async () => {
    // Create app
    const app = express();

    // For all the POST form
    app.use(express.urlencoded({extended: true}));

    // Define the view engine
    app.set('views', path.join(__dirname, 'app', 'views')); // Par défaut, EJS cherche un dossier 'views' à la racine et nous l'avons placé dans un dossier 'app'
    app.set('view engine', 'ejs');

    // Connect the DB
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
    
    const livresRouter = require('./app/routes/livres')
    livresRouter(app);

    const categoryRouter = require('./app/routes/category')
    categoryRouter(app);

    // Define default route
    app.get('/errors', (req, res, next) => {
        return res.render('errors');
    });

    app.use((req, res, next) => {
        return res.redirect('/livres');
    });

    
    const Livres = require('./app/models/livres');
    async function checkAndAddDefaultBook() {
        try {
            const livres = await Livres.find();
            if (livres.length === 0) {
                // Ajouter un livre par défaut si la collection est vide
                const defaultBook = new Livres({
                    title: 'Livre par défaut',
                    author: 'Auteur par défaut',
                    category: 'Non classé',
                    status: 'true', 
                    imgUrl: 'default-image-url.jpg', 
                });
    
                await defaultBook.save(); 
                console.log('Livre par défaut ajouté.');
            } else {
                console.log('Des livres existent déjà dans la collection.');
            }
        } catch (err) {
            console.error('Erreur lors de la vérification des livres :', err);
        }
    }
    
    // Appel de la fonction pour vérifier et ajouter le livre par défaut
    checkAndAddDefaultBook();

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
}

main()