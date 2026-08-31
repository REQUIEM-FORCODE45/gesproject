const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

const transport = nodemailer.createTransport({
    //host: 'email_host',
    //port: 'email_port',
    //auth: {
    //    user: Config.EMAIL || '',
    //    pass: Config.EMAIL_PASSWORD || ''
    //},

    //Servidor de correo entrante y saliente: mail.cidtca.com
    //Tipo de conexión: IMAP o POP3
    //Dirección: intranet@cidtca.com
    //Contraseña: forMaster5000

    // Servidor de correo entrante y saliente: mail.limonhot.com
    // Tipo de conexión: IMAP o POP3
    // Dirección: soporte@limonhot.com
    // Contraseña: YM_1FV7VtYXbs&

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

const sendEmail = (receiver, subject, content, id) => {
  ejs.renderFile(path.join(__dirname + '../../views/emailDemo.ejs'), { receiver, content, id}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("id")
      console.log(id)
      console.log("id")
      var mailOptions = {
        from: 'soporte@cidtca.com',
        to: receiver,
        subject: subject,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <style>
           @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .footer-dark {
          padding:50px 0;
          color:#f0f9ff;
          background-color:#282d32;
        }
        
        .footer-dark h3 {
          margin-top:0;
          margin-bottom:12px;
          font-weight:bold;
          font-size:16px;
        }
        
        .footer-dark ul {
          padding:0;
          list-style:none;
          line-height:1.6;
          font-size:14px;
          margin-bottom:0;
        }
        
        .footer-dark ul a {
          color:inherit;
          text-decoration:none;
          opacity:0.6;
        }
        
        .footer-dark ul a:hover {
          opacity:0.8;
        }
        
        @media (max-width:767px) {
          .footer-dark .item:not(.social) {
            text-align:center;
            padding-bottom:20px;
          }
        }
        
        .footer-dark .item.text {
          margin-bottom:36px;
        }
        
        @media (max-width:767px) {
          .footer-dark .item.text {
            margin-bottom:0;
          }
        }
        
        .footer-dark .item.text p {
          opacity:0.6;
          margin-bottom:0;
        }
        
        .footer-dark .item.social {
          text-align:center;
        }
        
        @media (max-width:991px) {
          .footer-dark .item.social {
            text-align:center;
            margin-top:20px;
          }
        }
        
        .footer-dark .item.social > a {
          font-size:20px;
          width:36px;
          height:36px;
          line-height:36px;
          display:inline-block;
          text-align:center;
          border-radius:50%;
          box-shadow:0 0 0 1px rgba(255,255,255,0.4);
          margin:0 8px;
          color:#fff;
          opacity:0.75;
        }
        
        .footer-dark .item.social > a:hover {
          opacity:0.9;
        }
        
        .footer-dark .copyright {
          text-align:center;
          padding-top:24px;
          opacity:0.3;
          font-size:13px;
          margin-bottom:0;
        }
        
        body {
          background-image: linear-gradient(45deg, #7175da, #9790F2);
          font-family: 'Muli', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          min-height: 100vh;
          margin: 0;
        }
        
        .courses-container {
          
        }
        
        .course {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          max-width: 100%;
          margin: 20px;
          overflow: hidden;
          width: 700px;
        }
        
        .course h6 {
          opacity: 0.6;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:#ffffff
        }
        
        .course h2 {
          letter-spacing: 1px;
          margin: 10px 0;
          color:#ffffff
        }
        
        .course-preview {
          background-color: #c0bedb;
          color: #79ba4c;
          padding: 30px;
          max-width: 250px;
        }
        
        .course-preview a {
          color: #fff;
          display: inline-block;
          font-size: 12px;
          opacity: 0.6;
          margin-top: 30px;
          text-decoration: none;
        }
        
        .course-info {
          padding: 30px;
          position: relative;
          width: 100%;
          border: 2px solid #344749;
          background: #292a2a;
        }
        
        .progress-container {
          position: absolute;
          top: 30px;
          right: 30px;
          text-align: right;
          width: 150px;
        }
        
        .progress {
          background-color: #ddd;
          border-radius: 3px;
          height: 5px;
          width: 100%;
        }
        
        .progress::after {
          border-radius: 3px;
          background-color: #2A265F;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 5px;
          width: 66%;
        }
        
        .progress-text {
          font-size: 10px;
          opacity: 0.6;
          letter-spacing: 1px;
          color: #f5f5f5;
        }
        
        .btn {
          background-color: #2A265F;
          border: 0;
          border-radius: 50px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
          color: #fff;
          font-size: 16px;
          padding: 12px 25px;
          position: absolute;
          bottom: 30px;
          right: 30px;
          letter-spacing: 1px;
        }
        
        /* SOCIAL PANEL CSS */
        .social-panel-container {
          position: fixed;
          right: 0;
          bottom: 80px;
          transform: translateX(100%);
          transition: transform 0.4s ease-in-out;
        }
        
        .social-panel-container.visible {
          transform: translateX(-10px);
        }
        
        .social-panel {	
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 16px 31px -17px rgba(0,31,97,0.6);
          border: 5px solid #001F61;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Muli';
          position: relative;
          height: 169px;	
          width: 370px;
          max-width: calc(100% - 10px);
        }
        
        .social-panel button.close-btn {
          border: 0;
          color: #97A5CE;
          cursor: pointer;
          font-size: 20px;
          position: absolute;
          top: 5px;
          right: 5px;
        }
        
        .social-panel button.close-btn:focus {
          outline: none;
        }
        
        .social-panel p {
          background-color: #001F61;
          border-radius: 0 0 10px 10px;
          color: #fff;
          font-size: 14px;
          line-height: 18px;
          padding: 2px 17px 6px;
          position: absolute;
          top: 0;
          left: 50%;
          margin: 0;
          transform: translateX(-50%);
          text-align: center;
          width: 235px;
        }
        
        .social-panel p i {
          margin: 0 5px;
        }
        
        .social-panel p a {
          color: #FF7500;
          text-decoration: none;
        }
        
        .social-panel h4 {
          margin: 20px 0;
          color: #97A5CE;	
          font-family: 'Muli';	
          font-size: 14px;	
          line-height: 18px;
          text-transform: uppercase;
        }
        
        .social-panel ul {
          display: flex;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .social-panel ul li {
          margin: 0 10px;
        }
        
        .social-panel ul li a {
          border: 1px solid #DCE1F2;
          border-radius: 50%;
          color: #001F61;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 50px;
          text-decoration: none;
        }
        
        .social-panel ul li a:hover {
          border-color: #FF6A00;
          box-shadow: 0 9px 12px -9px #FF6A00;
        }
        
        .floating-btn {
          border-radius: 26.5px;
          background-color: #001F61;
          border: 1px solid #001F61;
          box-shadow: 0 16px 22px -17px #03153B;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          line-height: 20px;
          padding: 12px 20px;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999;
        }
        
        .floating-btn:hover {
          background-color: #ffffff;
          color: #001F61;
        }
        
        .floating-btn:focus {
          outline: none;
        }
        
        .floating-text {
          background-color: #001F61;
          border-radius: 10px 10px 0 0;
          color: #fff;
          font-family: 'Muli';
          padding: 7px 15px;
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 998;
        }
        
        .floating-text a {
          color: #FF7500;
          text-decoration: none;
        }
        
        @media screen and (max-width: 480px) {
        
          .social-panel-container.visible {
            transform: translateX(0px);
          }
          
          .floating-btn {
            right: 10px;
          }
        }
            </style>
        </head>
        <body>
          <div class="courses-container">
            <div class="course">
              <div class="course-preview">
                <img style="    position: relative;
                width: 100%;
                /* margin: 0em; */
                display: grid;filter: grayscale(100%);" src="https://cidtca.com/wp-content/uploads/2021/11/CIDTCA-VBN2@4x-300x287.png" alt="">
                <h6>CIDTCA</h6>
                <h2>Invitación, </h2>
                <a href="#">visitatons ... </a>
              </div>
              <div class="course-info">
                <div class="progress-container">
                  <div class="progress"></div>
                  <span class="progress-text">
                    100% Challenges
                  </span>
                </div>
                <h6>Chapter 4</h6>
                <h2 style="color: white;">Callbacks & Closures</h2>
                <h4 style="color: white;">hola......</h4>
                <p style="color: white;">esta es la parte que se debe jugar para que todo lo que se pueda hacer es para que esto sno se este connsgun es los bervos sdads</p>
                <a style=" display: inline-block;  text-decoration:none;
                padding: 1em 2em;
                background: black;
                color: white;
                border-radius: 2em;
                border:none;
                outline: 2px solid black;
                outline-offset: 3px;" href="https://intranet.cidtca.com/profile/invitacion/login/${id}">Visitar pagina para realizar trabajo</a>
                <div class="course-footer" style="display: grid; position: relative; text-align: center;">
                  <img style="position: relative;
                  display: grid;
                  text-align: center;
                  width: 14em; padding-top: 2em; margin-left: 10em;" src="https://cidtca.com/wp-content/uploads/elementor/thumbs/CIDTCA-H@4x-pyecao76gp0sbpd7uugcmhomu7mx10tkko74vfnw0c.png" alt="" srcset="">
                </div>       
              </div>
            </div>
          </div>  
          <div class="courses-container">
            <div class="course" style="background: #282d32;">
              <h2 style="display: flex; position: relative; margin: 2em;">www.cidtca.com</h2>
            </div>
          </div>
        </body>
        <script>
          // INSERT JS HERE
        </script>
        </html>`
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(id)
        console.log('Message sent: %s', info.messageId);
      });
    }
  });
};

const sendEmailInvitados = (receiver, subject, content, id) => {
  ejs.renderFile(path.join(__dirname + '../../views/emailDemo.ejs'), { receiver, content, id}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("id")
      console.log(id)
      console.log("id")
      var mailOptions = {
        from: 'soporte@cidtca.com',
        to: receiver,
        subject: subject,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <style>
           @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .footer-dark {
          padding:50px 0;
          color:#f0f9ff;
          background-color:#282d32;
        }
        
        .footer-dark h3 {
          margin-top:0;
          margin-bottom:12px;
          font-weight:bold;
          font-size:16px;
        }
        
        .footer-dark ul {
          padding:0;
          list-style:none;
          line-height:1.6;
          font-size:14px;
          margin-bottom:0;
        }
        
        .footer-dark ul a {
          color:inherit;
          text-decoration:none;
          opacity:0.6;
        }
        
        .footer-dark ul a:hover {
          opacity:0.8;
        }
        
        @media (max-width:767px) {
          .footer-dark .item:not(.social) {
            text-align:center;
            padding-bottom:20px;
          }
        }
        
        .footer-dark .item.text {
          margin-bottom:36px;
        }
        
        @media (max-width:767px) {
          .footer-dark .item.text {
            margin-bottom:0;
          }
        }
        
        .footer-dark .item.text p {
          opacity:0.6;
          margin-bottom:0;
        }
        
        .footer-dark .item.social {
          text-align:center;
        }
        
        @media (max-width:991px) {
          .footer-dark .item.social {
            text-align:center;
            margin-top:20px;
          }
        }
        
        .footer-dark .item.social > a {
          font-size:20px;
          width:36px;
          height:36px;
          line-height:36px;
          display:inline-block;
          text-align:center;
          border-radius:50%;
          box-shadow:0 0 0 1px rgba(255,255,255,0.4);
          margin:0 8px;
          color:#fff;
          opacity:0.75;
        }
        
        .footer-dark .item.social > a:hover {
          opacity:0.9;
        }
        
        .footer-dark .copyright {
          text-align:center;
          padding-top:24px;
          opacity:0.3;
          font-size:13px;
          margin-bottom:0;
        }
        
        body {
          background-image: linear-gradient(45deg, #7175da, #9790F2);
          font-family: 'Muli', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          min-height: 100vh;
          margin: 0;
        }
        
        .courses-container {
          
        }
        
        .course {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
          display: flex;
          max-width: 100%;
          margin: 20px;
          overflow: hidden;
          width: 700px;
        }
        
        .course h6 {
          opacity: 0.6;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
          color:#ffffff
        }
        
        .course h2 {
          letter-spacing: 1px;
          margin: 10px 0;
          color:#ffffff
        }
        
        .course-preview {
          background-color: #c0bedb;
          color: #79ba4c;
          padding: 30px;
          max-width: 250px;
        }
        
        .course-preview a {
          color: #fff;
          display: inline-block;
          font-size: 12px;
          opacity: 0.6;
          margin-top: 30px;
          text-decoration: none;
        }
        
        .course-info {
          padding: 30px;
          position: relative;
          width: 100%;
          border: 2px solid #344749;
          background: #292a2a;
        }
        
        .progress-container {
          position: absolute;
          top: 30px;
          right: 30px;
          text-align: right;
          width: 150px;
        }
        
        .progress {
          background-color: #ddd;
          border-radius: 3px;
          height: 5px;
          width: 100%;
        }
        
        .progress::after {
          border-radius: 3px;
          background-color: #2A265F;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 5px;
          width: 66%;
        }
        
        .progress-text {
          font-size: 10px;
          opacity: 0.6;
          letter-spacing: 1px;
          color: #f5f5f5;
        }
        
        .btn {
          background-color: #2A265F;
          border: 0;
          border-radius: 50px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
          color: #fff;
          font-size: 16px;
          padding: 12px 25px;
          position: absolute;
          bottom: 30px;
          right: 30px;
          letter-spacing: 1px;
        }
        
        /* SOCIAL PANEL CSS */
        .social-panel-container {
          position: fixed;
          right: 0;
          bottom: 80px;
          transform: translateX(100%);
          transition: transform 0.4s ease-in-out;
        }
        
        .social-panel-container.visible {
          transform: translateX(-10px);
        }
        
        .social-panel {	
          background-color: #fff;
          border-radius: 16px;
          box-shadow: 0 16px 31px -17px rgba(0,31,97,0.6);
          border: 5px solid #001F61;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: 'Muli';
          position: relative;
          height: 169px;	
          width: 370px;
          max-width: calc(100% - 10px);
        }
        
        .social-panel button.close-btn {
          border: 0;
          color: #97A5CE;
          cursor: pointer;
          font-size: 20px;
          position: absolute;
          top: 5px;
          right: 5px;
        }
        
        .social-panel button.close-btn:focus {
          outline: none;
        }
        
        .social-panel p {
          background-color: #001F61;
          border-radius: 0 0 10px 10px;
          color: #fff;
          font-size: 14px;
          line-height: 18px;
          padding: 2px 17px 6px;
          position: absolute;
          top: 0;
          left: 50%;
          margin: 0;
          transform: translateX(-50%);
          text-align: center;
          width: 235px;
        }
        
        .social-panel p i {
          margin: 0 5px;
        }
        
        .social-panel p a {
          color: #FF7500;
          text-decoration: none;
        }
        
        .social-panel h4 {
          margin: 20px 0;
          color: #97A5CE;	
          font-family: 'Muli';	
          font-size: 14px;	
          line-height: 18px;
          text-transform: uppercase;
        }
        
        .social-panel ul {
          display: flex;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .social-panel ul li {
          margin: 0 10px;
        }
        
        .social-panel ul li a {
          border: 1px solid #DCE1F2;
          border-radius: 50%;
          color: #001F61;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 50px;
          text-decoration: none;
        }
        
        .social-panel ul li a:hover {
          border-color: #FF6A00;
          box-shadow: 0 9px 12px -9px #FF6A00;
        }
        
        .floating-btn {
          border-radius: 26.5px;
          background-color: #001F61;
          border: 1px solid #001F61;
          box-shadow: 0 16px 22px -17px #03153B;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          line-height: 20px;
          padding: 12px 20px;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999;
        }
        
        .floating-btn:hover {
          background-color: #ffffff;
          color: #001F61;
        }
        
        .floating-btn:focus {
          outline: none;
        }
        
        .floating-text {
          background-color: #001F61;
          border-radius: 10px 10px 0 0;
          color: #fff;
          font-family: 'Muli';
          padding: 7px 15px;
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 998;
        }
        
        .floating-text a {
          color: #FF7500;
          text-decoration: none;
        }
        
        @media screen and (max-width: 480px) {
        
          .social-panel-container.visible {
            transform: translateX(0px);
          }
          
          .floating-btn {
            right: 10px;
          }
        }
            </style>
        </head>
        <body>
          <div class="courses-container">
            <div class="course">
              <div class="course-preview">
                <img style="    position: relative;
                width: 100%;
                /* margin: 0em; */
                display: grid;filter: grayscale(100%);" src="https://cidtca.com/wp-content/uploads/2021/11/CIDTCA-VBN2@4x-300x287.png" alt="">
                <h6>CIDTCA</h6>
                <h2>Invitación, </h2>
                <a href="#">visitatons ... </a>
              </div>
              <div class="course-info">
                <div class="progress-container">
                  <div class="progress"></div>
                  <span class="progress-text">
                    100% Challenges
                  </span>
                </div>
                <h6>Chapter 4</h6>
                <h2 style="color: white;">Callbacks & Closures</h2>
                <h4 style="color: white;">hola......</h4>
                <p style="color: white;">esta es la parte que se debe jugar para que todo lo que se pueda hacer es para que esto sno se este connsgun es los bervos sdads</p>
                <a style=" display: inline-block;  text-decoration:none;
                padding: 1em 2em;
                background: black;
                color: white;
                border-radius: 2em;
                border:none;
                outline: 2px solid black;
                outline-offset: 3px;" href="https://intranet.cidtca.com/profile/invitacion/register/${id}">Visitar pagina del evento acta</a>
                <div class="course-footer" style="display: grid; position: relative; text-align: center;">
                  <img style="position: relative;
                  display: grid;
                  text-align: center;
                  width: 14em; padding-top: 2em; margin-left: 10em;" src="https://cidtca.com/wp-content/uploads/elementor/thumbs/CIDTCA-H@4x-pyecao76gp0sbpd7uugcmhomu7mx10tkko74vfnw0c.png" alt="" srcset="">
                </div>       
              </div>
            </div>
          </div>  
          <div class="courses-container">
            <div class="course" style="background: #282d32;">
              <h2 style="display: flex; position: relative; margin: 2em;">www.cidtca.com</h2>
            </div>
          </div>
        </body>
        <script>
          // INSERT JS HERE
        </script>
        </html>`
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(id)
        console.log('Message sent: %s', info.messageId);
      });
    }
  });
};

module.exports = {
  sendEmail, sendEmailInvitados
};