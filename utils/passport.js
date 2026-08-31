// utils/passport.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Ajusta la ruta

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                // Buscar usuario
                const user = await User.findOne({ email });
                
                if (!user) {
                    return done(null, false, { message: 'Email no registrado' });
                }
                
                // Comparar contraseñas
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    // Serializar usuario
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserializar usuario
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};