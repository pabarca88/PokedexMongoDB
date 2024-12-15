const jwt = require('jsonwebtoken');
const config = require('../config'); // Importa el archivo de configuración

//Validar Token
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecretKey); // Usa la clave desde el archivo de configuración
        req.user = decoded; // Guardamos la información del usuario en req.user
        next(); // Llamamos a next() para continuar con el siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
