const bcrypt = require("bcrypt");
const validator = require("validator");
const passport = require("passport");

const vigTec = require("../../models/vigTecModel");
const User = require("../../models/userModel");

exports.postVigTec = async (req, res) => {
    let { title_ficha, area_tema, sector, poblacion } = req.body;
    const creator = req.user._id
    
    // console.log(req.body)
    // console.log(creator)

    let keywords_array =  req.body.keywords
    // keywords_array = keywords_array.replace(/ /g, "")
    let keywords  = keywords_array.split(',')

    // An array that contains the errors (if there are some)
    let errors = [];

    // check if one or more fields are missing
    if (!title_ficha || !area_tema || !keywords) {
    errors.push({ msg: "Por favor completar los campos obligatorios" });
    }

    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findOne({ title_ficha });
            // If user already exists, it renders the same page with the error
            if (vigTecExists) {
                errors.push({ msg: "Vigilancia tecnologica existente use otro titulo" });
                res.status(200).send({
                errors,
                });
            } else {

                // The vt that is going to be created
                const VigTec = new vigTec({ title_ficha, area_tema, sector, poblacion, keywords, creator});
    
                // Saves the user
                await VigTec.save();
                // req.flash("success_msg", "Vigilancia tecnologica registrada con exito");
                res.status(200).send({message:'Vigilancia tecnologica registrada con exito'})
            }
        // Error handling
        } catch (error) {
        console.log(error);
        res.status(500).send(error);
        }
    }
};

exports.getAllVigTec = async (req, res) => {
    try {
        // const user_id = req.user._id

        const VigTec = await vigTec.find({});
        if(req.user.rol != 'user') return res.status(200).json(VigTec);

        res.status(200).json({message: 'No tienes permiso para acceder a esta informacion'});
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getVigTecByUser = async (req, res) => {
    try {
        const user_id = req.user._id
        const VigTec = await vigTec.find({ $or: [{'creator': user_id}, { 'colabs.user_id': user_id }]}).sort({createdAt: -1});
        res.status(200).json(VigTec);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getVigTecPage = async (req, res) => {
    let user = req.user
    let vigTex = req.params.idVigTec
    const vigTecExists = await vigTec.findById(vigTex)
    if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
    if(user._id == vigTecExists.creator) return res.status(200).render("vigTec", { user, vigTex, home: false});
    let colab = vigTecExists.colabs.find(colab => colab.user_id == user._id)
    if(colab){
        // console.log(colab)
        if(colab.permissions.state == 'Active') return res.status(200).render("vigTec", { user, vigTex, home: false });
    }

    res.redirect('/dashboard-vig-tec');
    // console.log(vigTex)
    
};

exports.updateVigTec = async (req, res) => {
    let { title_ficha, area_tema, sector, poblacion } = req.body;
    const vig_tec_id = req.params.idVigTec

    let keywords_array =  req.body.keywords
    // keywords_array = keywords_array.replace(/ /g, "")
    let keywords  = keywords_array.split(',')

    // An array that contains the errors (if there are some)
    let errors = [];

    // check if one or more fields are missing
    if (!title_ficha || !area_tema || !keywords) {
        errors.push({ msg: "Por favor completar los campos obligatorios" });
    }

    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vig_tec_id);
            if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})

            vigTecExists.title_ficha = title_ficha
            vigTecExists.area_tema = area_tema
            vigTecExists.sector = sector
            vigTecExists.poblacion = poblacion
            vigTecExists.keywords = keywords

            // Saves the edit vig tec
            await vigTecExists.save();
            res.status(200).send({message:'Vigilancia tecnologica actualizada con exito'})
            
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};

exports.getVigTec = async (req, res) => {
    try {
        const user_id = req.user._id
        const vig_tec_id = req.params.idVigTec
        const VigTec = await vigTec.findById(vig_tec_id)
        if(vig_tec_id){
            res.status(200).json(VigTec);
        } else {
            res.status(200).redirect("/dashboard-vig-tec");
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

exports.postAddColab = async (req, res) => {
    const user_id = req.params.idUser
    const vig_tec_id = req.params.idVigTec
    console.log('post add user')
    // An array that contains the errors (if there are some)
    let errors = []

    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vig_tec_id)
            if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})

            const userExists = await User.findById(user_id)
            // 
            if (userExists) {
                const colab = new vigTec.colabs({
                    'user_id': userExists._id,
                    'user_name': userExists.username,
                    'user_email': userExists.email,
                });
    
                // Saves the new referent
                vigTecExists.colabs.push(colab);

                vigTecExists.save();

                res.status(200).send({message:'Colaborador registrado con exito', colab})
            
            } else {
                res.status(404).json({message: 'Usuario not found'})
                // The vt that is going to be created
            }
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};

exports.deleteVigTec = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    
    try{
        const vigTecExists = await vigTec.findById(vig_tec_id);
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})

        await vigTec.findByIdAndRemove(vig_tec_id)

        res.status(200).send({message:'Referente eliminado correctamente'})
    } catch (err) {
      console.log(err.message)
      res.status(500).send({message:'server error recargue la pagina e intente nuevamente'})
    }
}