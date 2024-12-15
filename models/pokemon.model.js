const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['fire', 'water', 'ghost', 'electric', 'normal',
        'grass', 'ice', 'fighting', 'poison', 'ground',
        'flying', 'psychic', 'bug', 'rock', 'dragon',
        'dark', 'steel', 'fairy']
    },
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        speed: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    trainer: {
        type: String,
        ref: 'Users', // Nombre del modelo de los usuarios
        required: true
    }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
