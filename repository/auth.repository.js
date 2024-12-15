const User = require('../models/user.model');
const bcrypt = require('bcrypt');

class AuthRepository {
    async findUserByUsername(username) {
        try {
            return await User.findOne({ username });
        } catch (error) {
            console.error('Error buscando el usuario:', error.message);
            throw new Error('Error al buscar el usuario.');
        }
    }

    async createUser(userData) {
        try {
            // Encripta la contraseña antes de guardarla
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

            // Reemplaza la contraseña por la versión encriptada
            userData.password = hashedPassword;

            const newUser = new User(userData);
            return await newUser.save();
        } catch (error) {
            console.error('Error creando el usuario:', error.message);
            throw new Error('Error al crear el usuario.');
        }
    }
}

module.exports = AuthRepository;
