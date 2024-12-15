const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon.controller'); // Importar correctamente el controlador
const authMiddleware = require('../services/auth.service.js'); // Middleware de autenticación

// Rutas públicas (no requieren autenticación)
//Obtener todos los Pokémons
router.get('/',pokemonController.getAllPokemons);
//Obtener Pokémon por id (number)
router.get('/:id', pokemonController.getPokemonById);

// Rutas protegidas (requieren autenticación)
//Obtener Pokémons del usuario logeado
router.get('/trainer/mypokemons', authMiddleware, pokemonController.getMyPokemons);

// Crear Pokémon
router.post('/',authMiddleware,pokemonController.createPokemon);
//Actualizar Pokémon
router.put('/:number',authMiddleware,pokemonController.updatePokemon);
//Eliminar Pokémon
router.delete('/:number', authMiddleware, pokemonController.deletePokemon);

module.exports = router;
