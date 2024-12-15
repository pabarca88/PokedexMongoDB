const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthRepository = require('../repository/auth.repository');
const config = require('../config');

// Instancia del repositorio
const authRepository = new AuthRepository();

// Registro de nuevo usuario (sin cambios)
const register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "Username, password y role son requeridos" });
    }

    try {
        const existingUser = await authRepository.findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        const newUser = await authRepository.createUser({ username, password, role });

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error registrando el usuario:", error.message);
        res.status(500).json({ error: "Error registrando el usuario" });
    }
};

// Login de usuario (actualizado)
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridos" });
    }

    try {
        const user = await authRepository.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Compara la contraseña ingresada con la encriptada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        // Genera el token si las credenciales son correctas
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            config.jwtSecretKey,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ error: "Error durante el login" });
    }
};

module.exports = { register, login };
