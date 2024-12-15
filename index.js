const express = require('express');
const authRoutes = require('./routes/auth.route');
const pokemonRoutes = require('./routes/pokemon.route');
const connectDB = require('./repository/db.js');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas de autenticación y Pokémon
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

const startServer = async() => {
    try {
        //Conexión a la BBDD
        await connectDB();
        app.listen(PORT, () => {
            console.log("Mi api pokedex")
        })
    
    } catch (error) {
        console.log("error", error)
    }
}

startServer()