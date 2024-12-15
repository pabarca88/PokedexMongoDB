const PokemonServices = require('../services/pokemon.service');

// Ver todos los Pokémon
const getAllPokemons = async (req, res) => {
    const _pokemonService = new PokemonServices();

    try {
        // Espera a que el servicio obtenga todos los Pokémon
        const pokemones = await _pokemonService.getAllPokemons();
        // Devuelve los Pokémon en la respuesta
        res.status(200).json({
            data: pokemones
        });
    } catch (error) {
        // Maneja el error y responde con el mensaje adecuado
        res.status(500).json({
            message: 'Error al obtener los Pokémon',
            error: error.message
        });
    }
};

// Ver detalle de un Pokémon
const getPokemonById = async (req, res) => {
    const _pokemonService = new PokemonServices();

    try {
        // Espera a que el servicio obtenga el Pokémon
        const { id } = req.params;
        const pokemon = await _pokemonService.getPokemonById(id);
        // Devuelve el Pokémon en la respuesta
        res.status(200).json({
            data: pokemon
        });
    } catch (error) {
        // Maneja el error y responde con el mensaje adecuado
        res.status(500).json({
            message: 'Error al obtener los Pokémon',
            error: error.message
        });
    }
};

// Ver mis Pokémon (autenticado)
const getMyPokemons = async (req, res) => {
    const _pokemonService = new PokemonServices();

    try {
        const { id } = req.user; // El ID del entrenador autenticado
        const myPokemons = await _pokemonService.getMyPokemons(id);
     
        // Devuelve los Pokémon en la respuesta
        res.status(200).json({
            data: myPokemons
        });
    } catch (error) {
        // Maneja el error y responde con el mensaje adecuado
        res.status(500).json({
            message: 'Error al obtener los Pokémon',
            error: error.message
        });
    }
};

// Crear nuevo Pokémon (autenticado)
const createPokemon = async (req, res) => {
    const _pokemonService = new PokemonServices();

    try {
        // El id del trainer que crea el Pokemon
        const trainerId = req.user.id;

        // Espera a que el servicio cree el Pokémon
        const newPokemon = await _pokemonService.createPokemon(req.body, trainerId);

        // Devuelve la respuesta con el Pokémon creado
        res.status(201).json({
            data: newPokemon
        });
    } catch (error) {
        // Enviar el mensaje exacto del error
        res.status(500).json({
            message: error.message
        });
    }
};


// Actualizar Pokémon (autenticado)
const updatePokemon = async (req, res) => {
    const { number } = req.params;  // ID del Pokémon a actualizar
    const { name, type, stats } = req.body;  // Datos de la solicitud
    const trainerId = req.user.id;  // ID del usuario (entrenador)
    const _pokemonService = new PokemonServices();
    try {
        // Llamamos al servicio para actualizar el Pokémon
        const updatedPokemon = await _pokemonService.updatePokemon(number, name, type, stats, trainerId);

        if (!updatedPokemon) {
            return res.status(404).json({ message: "Pokémon no encontrado o no pertenece al entrenador" });
        }

        // Retorna el Pokémon actualizado
        res.status(200).json(updatedPokemon);
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: "Error al actualizar el Pokémon", error: error.message });
    }
};

// Eliminar Pokémon (autenticado)
const deletePokemon = async (req, res) => {
    const { number } = req.params;
    const _pokemonService = new PokemonServices();

    try {
        //Llamamos al servicio para eliminar al Pokémon
        const deleted = await _pokemonService.deletePokemon(number, req.user.id);
        if (!deleted) {
            return res.status(404).json({ message: "Pokémon no encontrado o no autorizado para eliminar" });
        }
        res.status(200).json({ message: "Pokémon eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el Pokémon", error: error.message });
    }
};

module.exports = {
    getAllPokemons,
    getPokemonById,
    getMyPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon
};
