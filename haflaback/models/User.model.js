const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    commandes:[{type : mongoose.Schema.Types.ObjectId , ref : "commande"}],
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
