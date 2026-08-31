const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemasSchema = new Schema({

    title: String,
    description: String,
    sigla: String,
    values: []

},  
{ timestamps: true });

const problematicaSchema = new Schema({

    title: {type: String},
    sector: {type: String},
    poblacion: {type: String},
    creator: {type: String},
    problemas: [problemasSchema]
}, 
{ timestamps: true });

const problematica = mongoose.model('problematica', problematicaSchema);

problematica.problema = mongoose.model('problema', problemasSchema);

module.exports = problematica;