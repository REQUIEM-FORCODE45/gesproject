const vigTec = require("../../models/vigTecModel");

exports.getMatrizPage = async (req, res) => {
    const user = req.user
    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState

    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})

        if(user._id == vigTecExists.creator) return res.status(200).render("matriz", { user, vig_tec_id, art_state_id, home: false});
        let colab = vigTecExists.colabs.find(colab => colab.user_id == user._id)
        // console.log(colab)
        if(colab){
            if(colab.permissions.state == 'Active') return res.status(200).render("matriz", { user, vig_tec_id, art_state_id, home: false});
        }

        // res.status(200).render("matriz", { user, vig_tec_id, art_state_id});
        res.redirect('/dashboard-vig-tec');
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

exports.getProblems = async (req, res) => {
    console.log('get art state')
    try {
        const user_id = req.user._id
        const vig_tec_id = req.params.idVigTec
        const art_state_id = req.params.idArtState

        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let artState = vigTecExists.artState.id(art_state_id)
        if (!artState) return res.status(400).send({message:'Estado del arte no encontrado'})
        let tree = vigTecExists.tree[vigTecExists.tree.length - 1]
        if(user_id == vigTecExists.creator) return res.status(200).json({artState, tree}); 
        let colab = vigTecExists.colabs.find(colab => colab.user_id == user_id)
        // console.log(colab)
        if(colab){
            if(colab.permissions.state == 'Active') return res.status(200).json({artState, tree}); 
        }
       
        res.redirect('/dashboard-vig-tec');

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

exports.postValueMatriz = async (req, res) => {
    let {
        id_problem,
        id_problem_col,
        value,

    } = req.body;

    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState
    const user_id = req.user._id
    const user_name = req.user.username
    const user_email = req.user.email
    const values = new vigTec.artState.problems.reg_users.values({ id_problem_col, value})
    
    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let artState = vigTecExists.artState.id(art_state_id)
        if (!artState) return res.status(400).send({message:'Estado del arte no encontrado'})
        let problem = artState.problems.id(id_problem)
        if (!problem) return res.status(400).send({message:'Problema no encontrado'})

        let regUserExists = problem.reg_users.find(user => user.user_id == user_id)
        if(regUserExists){
            // buscar registro del usuario
            // console.log("regUserExists")
            let valuesExists = regUserExists.values.find(problema => problema.id_problem_col == id_problem_col)
            if(valuesExists){
                // console.log("valuesExists")
                valuesExists.value = value
            } else {
                // console.log('value no econtrado se cre un nuevo objeto')
                regUserExists.values.push(values)
            }
        } else {
            // console.log('registro de usuario no encontrado se crea un nuevo registro')
            // crear registro de usuario
            const regUser = new vigTec.artState.problems.reg_users({ user_id, user_name, user_email, values});
            // Saves the new referent
            problem.reg_users.push(regUser);
        }
        
        vigTecExists.save();
        res.status(200).send({message:'se guardaron los cambios correctamente'})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Advertencia: NO se guardaron los cambios correctamente intente nuevamente'})
    }
};