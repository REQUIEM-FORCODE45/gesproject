const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    state: {type: String, default: 'active'},
    rol: {type: String, default: 'user'},
    name: {type: String},
    last_name: {type: String},
    identification_type : {type: String},
    identification_document: {type: String},
    phone: {type: String},
    address: {type: String}
},  // user.createdAt; // 2020-07-06T20:36:59.414Z7 /
    // user.updatedAt; // 2020-07-06T20:36:59.414Z7 /  
    { timestamps: true });
const User = mongoose.model('User', userSchema);
module.exports = User;