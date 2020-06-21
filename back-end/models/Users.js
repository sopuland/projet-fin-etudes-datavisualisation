/*
 * Users Model
 */

/* Imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* User Data */
const UserSchema = new mongoose.Schema({
    enterprise: String,
    contactFirstname: String,
    contactLastname: String,
    email: { type: String, unique: true, required: false },
    password: String,
    status: String,
    endengagement: String,
    videocam: Array
});

UserSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: function(plainTextPassword) {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
}

UserSchema.pre('save', function(next) {
    if (!this.password) {
        console.log(this);
        next();
    } else {
        console.log('hash: ' + this.hashPassword(this.password));
        this.password = this.hashPassword(this.password);
        next();
    }
});


module.exports = mongoose.model('Users', UserSchema);