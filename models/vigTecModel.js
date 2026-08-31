const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valuesSchema = new Schema({

    id_problem_col: String,
    value: String

},  
{ timestamps: true });

const regUsersSchema = new Schema({

    user_id: String,
    user_name: String,
    user_email: String,
    values: [valuesSchema]

},  
{ timestamps: true });

const problemsSchema = new Schema({

    title: String,
    description: String,
    sigla: String,
    reg_users: [regUsersSchema]

},  
{ timestamps: true });

const artStateSchema = new Schema({

    resumen: {type: String},
    observaciones: {type: String},
    description: {type: String},
    conclusiones: {type: String},
    extra_camps: [],
    problems: [problemsSchema]

},  
{ timestamps: true })

const referenSchema = new Schema({

    doc_type: String,
    doc_title: String,
    doc_area_tema: String,
    abstract: String,
    year_publication: String,
    authors: [],
    file_name: String,
    country_publication: String,
    keywords: [],
    institution_entity: String,
    indexing: String,
    categorization: String,
    doc_URL: String,
    DOI: String,
    ISDN_ISBN: String,
},  
{ timestamps: true })

const reportSchema = new Schema({

    report: String,
    range_year_pub: String,
    authors_average: String,
    statistics_categorization: String

},  
{ timestamps: true });

const colabSchema = new Schema({

    user_id: {type: String},
    user_name: {type: String},
    user_email: {type: String},
    permissions: {
        write: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        state: {type: String, default: 'Active'},
    }

},  
{ timestamps: true });

const treeSchema = new Schema({

    problem_tree: {},
    objetivos: {type: Object}

},  
{ timestamps: true });

const vigTecSchema = new Schema({

    title_ficha: {type: String, required: true},
    area_tema: {type: String, required: true},
    keywords: [],
    sector: {type: String},
    poblacion: {type: String},
    creator: {type: String},
    colabs: [colabSchema],
    referents: [referenSchema],
    reports: [reportSchema],
    artState: [artStateSchema],
    tree: [treeSchema]
},  
{ timestamps: true });

const vigTec = mongoose.model('vigTec', vigTecSchema);

vigTec.referent = mongoose.model('referent', referenSchema);
vigTec.report = mongoose.model('report', reportSchema);
vigTec.colabs = mongoose.model('colabs', colabSchema);
// vigTec.colabs.permissions = mongoose.model('permissions', permissionsSchema);
vigTec.artState = mongoose.model('artState', artStateSchema);
vigTec.artState.problems = mongoose.model('problems', problemsSchema);
vigTec.artState.problems.reg_users = mongoose.model('reg_users', regUsersSchema);
vigTec.artState.problems.reg_users.values = mongoose.model('values', valuesSchema);

vigTec.tree = mongoose.model('tree', treeSchema);

module.exports = vigTec;