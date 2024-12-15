const PokemonRepository = require('../repository/pokemon.repository')
const Pokemon = require('../models/pokemon.model');

class PokemonServices { 
    constructor() {
        this.pokemonRepository = new PokemonRepository();
    }

    // Método para obtener todos los Pokémon
    async getAllPokemons() {
        try {
            // Llama al repositorio para obtener todos los Pokémon
            const pokemones = await this.pokemonRepository.getAll();
            return pokemones;
        } catch (error) {
            throw new Error('Error al obtener los Pokémon: ' + error.message);
        }
    }
    async getPokemonById(id) {
        try {
            // Llama al repositorio para obtener el Pokémon number = id
            const pokemones = await this.pokemonRepository.getPokemon(id);
            return pokemones;
        } catch (error) {
            throw new Error('Error al obtener los Pokémon: ' + error.message);
        }
    }
    async getMyPokemons(id) {
        try {
            // Llama al repositorio para obtener mis Pokémons
            const pokemones = await this.pokemonRepository.getMyPokemons(id);
            return pokemones;
        } catch (error) {
            throw new Error('Error al obtener mis Pokémons: ' + error.message);
        }
    }
    async createPokemon(pokemonData, trainerId) {
        try {
            // Verifica si ya existe un Pokémon con el mismo número
            const existingPokemon = await this.pokemonRepository.findByNumber(pokemonData.number);
            if (existingPokemon) {
                throw new Error(`El Pokémon con el número ${pokemonData.number} ya existe.`);
            }

            // Crea un nuevo Pokémon
            const newPokemon = {
                ...pokemonData,
                trainer: trainerId
            };

            // Usa el repository para guardar el Pokémon
            return await this.pokemonRepository.create(newPokemon);
        } catch (error) {
            console.error('Error creando el Pokémon:', error.message);
            throw new Error('Error al crear el Pokémon: ' + error.message);
        }
    }
    async updatePokemon(number, name, type, stats, trainerId) {
        try {
            const updatedPokemon = await this.pokemonRepository.updatePokemon(number, name, type, stats, trainerId);

            if (!updatedPokemon) {
                return null; // Si el Pokémon no existe, retornar null
            }

            return updatedPokemon; // Devolver el Pokémon actualizado
        } catch (error) {
            console.error("Error en el servicio al actualizar el Pokémon:", error);
            throw new Error("Error al actualizar el Pokémon en el servicio");
        }
    }
    async deletePokemon(number, trainerId) {
        try {
            const deletedPokemon = await this.pokemonRepository.deletePokemon(number, trainerId);

            if (!deletedPokemon) {
                return null; // Si el Pokémon no existe, retornar null
            }

            return deletedPokemon; // Devolver el Pokémon eliminado
        } catch (error) {
            console.error("Error en el servicio al eliminar el Pokémon:", error);
            throw new Error("Error al eliminar el Pokémon en el servicio");
        }
    }
}

module.exports = PokemonServices;