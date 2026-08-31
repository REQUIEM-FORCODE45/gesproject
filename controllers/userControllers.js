const Nodemailer = require('nodemailer');
const Config = require('../utils/config');
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../models/userModel");

const transporter = Nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: Config.EMAIL || '',
      pass: Config.EMAIL_PASSWORD || ''
  }
});

exports.getAllUser = async (req, res) => {
  try {
    let users = await User.find({});
    if(req.user.rol == 'admin' || req.user.rol == 'superadmin') return res.status(200).json(users);
    res.status(400).json({message: 'no tienes permiso para esta solicitud'});
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserByIdInfo = async (req, res) => {
  try {
    let id = req.params.user_id
    let users = await User.findById(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.putUpdateUserByIdInfo = async (req, res) => {
  try {
    // TO DO
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postForgotPassword = async (req, res) => {
  try {
    // TO DO
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.putChangePassword = async (req, res) => {
  let password = req.body.password
  let user_id = req.user._id
  console.log('cambioo de contraseña')
  try {
    // TO DO
    let password_update = await bcrypt.hash(password, 12);
    let user = await User.findById(user_id);
    user.password = password_update

    await user.save()
    res.status(200).json({ message: 'Contraseña actualizada'});
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

exports.deleteUserByIdInfo = async (req, res) => {
  try {
    const id = req.params.user_id; //params yg di routes :user_id
    let result = await User.findOneAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findUser = async (req, res) => {
  let id_params = req.params.user_data
  let newparamsname = id_params.replace(/%20/g, " ");
  // console.log(newparamsname)
  try {
      // funciona con solo colocar el regExp
      let users = await User.find({ $or: [{ 'email': new RegExp('.*' + newparamsname + '.*') }, { 'username': new RegExp('.*' + newparamsname + '.*') },] });
      if (!users) return res.status(404).json({ message: 'no existe' });
      // console.log(usuarios)
      res.status(200).json({ users });
  } catch (err) {
      console.log(err.message)
      res.status(500).send('server error no se pudo encontrar colaboradores')
  }
};

"use strict";
const nodemailer = require("nodemailer");

// ------------------------ datos email ---------------------//

// Servidor de correo entrante y saliente: mail.cidtca.com
// Tipo de conexión: IMAP o POP3
// Dirección: vigtec@cidtca.com
// Contraseña: 2/YDM@z.j9Hpt7

// ------------------------ datos email ---------------------//

// async..await is not allowed in global scope, must use a wrapper
async function main(userEmail, inviteEmail) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "mail.cidtca.com",
    // // port: 587,
    // secure: true, // true for 465, false for other ports
    // auth: {
    //   user: 'vigtec@cidtca.com', // generated ethereal user
    //   pass: '2/YDM@z.j9Hpt7', // generated ethereal password
    // },
    // tls: { rejectUnauthorized: false },
    // debug: true

    host: 'mail.limonhot.com',
    //port: 465,
    secure: true, // use SSL
    //port: 535,
    auth: {
        user: 'soporte@limonhot.com',
        pass: 'YM_1FV7VtYXbs&'
    },
    //authMethod:'NTLM',
    //secure: false,
    // here it goes
    tls: { rejectUnauthorized: false },
    debug: true
    
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: userEmail, // sender address
    to: inviteEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  respo =  "Message sent: %s" + info.messageId
  return respo
}

// main().catch(console.error);

exports.postInviteUser = async (req, res) => {
  let inveteEmail = req.body.email
  let userEmail = req.user.email

  console.log(inveteEmail)
  console.log(userEmail)

  if (!validator.isEmail(inveteEmail)) {
    console.log('error con el email')
    res.status(500).send({message:'Dirección de correo electrónico no válida'})
  } else{
    try {
      console.log('invtando')
      const send_mail = await main(userEmail, inveteEmail)
      res.status(200).json({send_mail});
    } catch (error) {
      console.log(error)
      res.status(500).json({send_mail});
    }
  }
}
