require('./database/connection');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

// FORMA CORRECTA PARA CONNECT-MONGO v6
const MongoStore = require('connect-mongo').default || require('connect-mongo');

const passport = require('passport');
const { mongoURI } = require('./utils/config');

require('./utils/passport')(passport);

const app = express();

// EJS MIDDLEWARES
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BODYPARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// STATIC FILES
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/node_modules/sweetalert2'));

// CONFIGURACIÓN DE SESIÓN PARA CONNECT-MONGO v6
// En tu app.js - actualiza la parte de sesiones:

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoURI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60, // 14 días en segundos
        autoRemove: 'interval',
        autoRemoveInterval: 10, // En minutos
        crypto: {
            secret: process.env.SESSION_CRYPTO_SECRET || 'different-secret-for-encryption'
        }
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 día
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true en producción
        sameSite: 'lax'
    },
    name: 'sessionId' // Puedes cambiar el nombre de la cookie
}));

// PASSPORT MIDDLEWARES
app.use(passport.initialize());
app.use(passport.session());

// CONNECT FLASH MIDDLEWARE
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// ROUTES
app.use('/', require('./routes/indexRouters'));
app.use('/users', require('./routes/authRouters'));
app.use('/users', require('./routes/userRouters'));
app.use('/profile', require('./routes/profileRouters'));
app.use('/vigTec', require('./routes/apiRouters/vigTecRouters'));
app.use('/referent', require('./routes/apiRouters/referentRouters'));
app.use('/artState', require('./routes/apiRouters/artStateRouters'));
app.use('/problem', require('./routes/apiRouters/problemsRouters'));
app.use('/matriz', require('./routes/apiRouters/matrizRouters'));
app.use('/colab', require('./routes/apiRouters/colabRouters'));
app.use('/tree', require('./routes/apiRouters/treeRouters'));
app.use('/cadena-valor', require('./routes/apiRouters/cadenaValor'));

// CONNECTION PARAMETERES
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running on port:", PORT));