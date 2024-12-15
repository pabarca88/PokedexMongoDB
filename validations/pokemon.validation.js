const { body } = require('express-validator');

const createPokemonValidation = [
    body('name').isString().isLength({ min: 3, max: 30 }).withMessage('El nombre debe tener entre 3 y 30 caracteres.'),
    body('type').isIn(['Fire', 'Water', 'Grass', 'Electric', 'Psychic']).withMessage('El tipo de Pokémon no es válido.'),
    body('level').isInt({ min: 1, max: 100 }).withMessage('El nivel debe ser un número entre 1 y 100.'),
];

const updatePokemonValidation = [
    body('name').optional().isString().isLength({ min: 3, max: 30 }).withMessage('El nombre debe tener entre 3 y 30 caracteres.'),
    body('type').optional().isIn(['Fire', 'Water', 'Grass', 'Electric', 'Psychic']).withMessage('El tipo de Pokémon no es válido.'),
    body('level').optional().isInt({ min: 1, max: 100 }).withMessage('El nivel debe ser un número entre 1 y 100.')
];

module.exports = {
    createPokemonValidation,
    updatePokemonValidation
};
