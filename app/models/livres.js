const mongoose = require('mongoose');

const livresSchema = new mongoose.Schema({

    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category' 
    },
    status: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livres', livresSchema, 'livres');