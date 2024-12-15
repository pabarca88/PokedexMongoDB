const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuidv4, // Genera un UUID automáticamente
    },
    username: { 
        type: String, 
        required: true, 
        unique: true },
    password: { type: String, required: true },
    role: { type: String, 
        enum: ['admin', 'trainer'],
        required: true },
});

module.exports = mongoose.model('User', userSchema);
