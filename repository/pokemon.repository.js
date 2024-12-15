const Pokemon = require('../models/pokemon.model'); // Asegúrate de que el modelo esté importado correctamente

class PokemonRepository { 
    async create(pokemonData) {
        try {
            const pokemon = new Pokemon(pokemonData);
            return await pokemon.save();
        } catch (error) {
            console.error("Error al guardar en el repository:", error);
            throw error; // Deja que el servicio maneje los errores
        }
    }
    // Método para obtener todos los Pokémon
    async getAll() {
        try {
            // Obtiene todos los Pokémon desde la base de datos
            const pokemones = await Pokemon.find();
            return pokemones;
        } catch (error) {
            console.error("Error al obtener los Pokémon:", error);
            throw new Error('Error al obtener los Pokémon: ' + error.message);
        }
    }
    async getPokemon(id) {
        try {
            // Utiliza Mongoose para encontrar el Pokémon por su campo "number"
            const pokemon = await Pokemon.findOne({ number: id });
            if (!pokemon) {
                throw new Error('Pokémon no encontrado');
            }
            return pokemon;
        } catch (error) {
            console.error("Error al obtener el Pokémon:", error);
            throw new Error('Error al obtener el Pokémon por número: ' + error.message);
        }
    }
    //Obtiene los Pokémon de un entrenador específico por su ID.
    async getMyPokemons(id) {
        try {
            // Realiza la consulta a la base de datos para obtener los Pokémon del entrenador
            const pokemons = await Pokemon.find({ trainer: id });
            return pokemons;
        } catch (error) {
            console.error('Error obteniendo los Pokémon del entrenador:', error.message);
            throw new Error('Error al obtener los Pokémon del entrenador');
        }
    }

    // Método para actualizar un Pokémon
    async updatePokemon(number, name, type, stats, trainerId) {
        try {
            // Buscar el Pokémon por número y asegurarse de que pertenece al entrenador
            const pokemon = await Pokemon.findOne({ number, trainer: trainerId });
            if (!pokemon) {
                return null; // Si no se encuentra el Pokémon, retornar null
            }

            // Actualizar el nombre y el tipo, si se proporcionan
            pokemon.name = name || pokemon.name;
            pokemon.type = type || pokemon.type;

            // Actualizar los stats, si se proporcionan
            if (stats) {
                pokemon.stats.hp = stats.hp || pokemon.stats.hp;
                pokemon.stats.attack = stats.attack || pokemon.stats.attack;
                pokemon.stats.defense = stats.defense || pokemon.stats.defense;
                pokemon.stats.speed = stats.speed || pokemon.stats.speed;
            }

            // Guardar el Pokémon actualizado
            await pokemon.save();
            return pokemon; // Devolver el Pokémon actualizado
        } catch (error) {
            console.error("Error al actualizar el Pokémon:", error);
            throw new Error("Error al actualizar el Pokémon");
        }
    }
    // Método para eliminar un Pokémon
    async deletePokemon(number, trainerId) {
        try {
            // Elimina el Pokémon que coincida con el número y el ID del entrenador
            const deletedPokemon = await Pokemon.findOneAndDelete({ number: number, trainer: trainerId });

            // Si no se encuentra el Pokémon, retornamos null
            if (!deletedPokemon) {
                return null;
            }

            // Si el Pokémon se eliminó, retornamos el Pokémon eliminado
            return deletedPokemon;
        } catch (error) {
            console.error("Error al eliminar el Pokémon:", error);
            throw new Error('Error al eliminar el Pokémon: ' + error.message);
        }
    }
    async findByNumber(number) {
        try {
            return await Pokemon.findOne({ number });
        } catch (error) {
            console.error("Error al buscar Pokémon por número:", error);
            throw error;
        }
    }
}

module.exports = PokemonRepository;
