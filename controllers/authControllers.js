const bcrypt = require("bcrypt");
const validator = require("validator");
const passport = require("passport");

const User = require("../models/userModel");

exports.getLogin = (req, res) => {
  res.status(200).render("login", { user: false, home: false});
};

exports.getRegister = (req, res) => {
  res.status(200).render("register", { user: false, home: false });
};

exports.postRegister = async (req, res) => {
  // Assigns the fields to the variables
  console.log(req.body)
  let { username, email, password, password2, name, last_name, identification_type, identification_document, phone, address } = req.body;

  // An array that contains the errors (if there are some)
  let errors = [];

  // check if one or more fields are missing
  if (!username || !email || !password || !password2 || !name || !last_name || !identification_type || !identification_document || !phone || !address) {
    errors.push({ msg: "Por favor rellena todos los campos" });
  }

  // Check if the email is a valid email
  if (!validator.isEmail(email)) {
    errors.push({ msg: "Dirección de correo electrónico no válida" });
  }

  // Check if the password and the confirm password matches
  if (password !== password2) {
    errors.push({ msg: "Las contraseñas no coinciden" });
  }

  // Check if the password is at least 6 characters long
  if (password.length < 6) {
    errors.push({ msg: "La contraseña debe tener 6 caracteres" });
  }

  // if there are errors, it renders the same page with the error messages
  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      password,
      password2,
      name, 
      last_name, 
      identification_type, 
      identification_document, 
      phone, 
      address,
      user: false,
    });
  } else {
    try {
      const userExists = await User.findOne({ email });
      // If user already exists, it renders the same page with the error
      if (userExists) {
        errors.push({ msg: `Ya se encuentra registrado con el el correo; ` + email });
        res.render("register", {
          errors,
          username,
          email,
          password,
          password2,
          name, 
          last_name, 
          identification_type, 
          identification_document, 
          phone, 
          address,
          user: false,
        });
      } else {
        // Hashes the password
        password = await bcrypt.hash(password, 12);

        // The user that is going to be created
        const user = new User({ username, email, password, name, last_name, identification_type, identification_document, phone, address });

        // Saves the user
        await user.save();
        req.flash("success_msg", "Registro correcto, ya puedes iniciar sesión");
        res.status(200).redirect("/users/login");
      }
      // Error handling
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard-vig-tec",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.getLogout = (req, res) => {
   req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Sesión cerrada correctamente');
        res.redirect('/users/login');
    });
};