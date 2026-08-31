const vigTec = require("../../models/vigTecModel");

exports.postProblem = async (req, res) => {
    let {
        title,
        sigla,
        description
    } = req.body;

    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState

    console.log(req.body)
    
    // An array that contains the errors (if there are some)
    let errors = [];

    // check if one or more fields are missing
    if (!title || !sigla ||  !description) {
        errors.push({ msg: "Por favor completar los campos obligatorios" });
    }

    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vig_tec_id)
            if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
            let artState = vigTecExists.artState.id(art_state_id)
            if (!artState) return res.status(400).send({message:'Estado del arte no encontrado'})

            const problema = new vigTec.artState.problems({ title, sigla, description});
            // Saves the new referent
            artState.problems.push(problema);
            vigTecExists.save();
            length_problemas = artState.problems.length

            res.status(200).send({message:'Problema registrado con exito', problema, length_problemas})
            
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};

exports.getProblems = async (req, res) => {
    
    const vig_tec_id = req.params.idVigTec
    
    // An array that contains the errors (if there are some)
    let errors = [];
    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vig_tec_id);
            if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
            
            const problems = vigTecExists.artState[0]

            res.status(200).send(problems)
            
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};

exports.deleteProblem = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState
    const problem_id = req.params.idProblem
    
    try{
        const vigTecExists = await vigTec.findById(vig_tec_id);
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let art_state = vigTecExists.artState.id(art_state_id)
        if (!art_state) return res.status(400).send({message:'estado del arte no encontrado'})
        let problem = art_state.problems.id(problem_id)
        if (!problem) return res.status(400).send({message:'problema no encontrado'})
        let problem_delete = art_state.problems

        problem_delete.pull({_id:problem_id})
        vigTecExists.save()

        res.status(200).send({message:'Problema eliminado correctamente'})
    } catch (err) {
      console.log(err.message)
      res.status(500).send({message:'server error recargue la pagina e intente nuevamente'})
    }
}

exports.updateProblem = async (req, res) => {
    
    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState
    const problem_id = req.params.idProblem

    // console.log(req.body)
    let title = req.body.title
    let sigla = req.body.sigla
    let description = req.body.description

    // An array that contains the errors (if there are some)
    let errors = [];
    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vig_tec_id);
            if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
            let art_state = vigTecExists.artState.id(art_state_id)
            if (!art_state) return res.status(400).send({message:'estado del arte no encontrado'})
            let problem = art_state.problems.id(problem_id)
            if (!problem) return res.status(400).send({message:'problema no encontrado'})
            
            problem.title = req.body.title
            problem.sigla = req.body.sigla
            problem.description = req.body.description

            // Saves the edit vig tec
            await vigTecExists.save();

            res.status(200).send({message:'Problema actualizado con exito'})
            
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};