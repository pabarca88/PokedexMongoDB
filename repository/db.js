
const mongoose = require('mongoose')

const connectDB = async() => {

    try {
        const uri = 'mongodb://localhost:27017/pokedex-mongodb'
        await mongoose.connect(uri)

        console.log("Conexion Exitosa Pokedex")
    } catch (error) {
            console.log("error", error)
            process.exit(1)
    }
}

module.exports = connectDB;