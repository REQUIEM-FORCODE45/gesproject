const vigTec = require("../../models/vigTecModel");

exports.postArtState = async (req, res) => {
    let {   resumen,
            observaciones,
            description,
            conclusiones,
            extra_camps } = req.body;

    const creator = req.user._id
    const vigTec_id = req.params.idVigTec
    
    console.log(req.body)
    console.log(creator)

    // An array that contains the errors (if there are some)
    let errors = [];

    // check if one or more fields are missing
    if (!resumen || !description ) {
    errors.push({ msg: "Por favor completar los campos obligatorios" });
    }

    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vigTec_id);
            // If vig tec already exists, ceate a art state
            if (vigTecExists) {
                // The art state that is going to be created
                const artState = new vigTec.artState({ resumen, observaciones, description, conclusiones, extra_camps});
                //Add art state to vig tec
                vigTecExists.artState = artState
                // Saves the user
                await vigTecExists.save();
                // send response
                res.status(200).send({message:'Estado del arte generado con exito'})

            } else {
                errors.push({ msg: "vigTec not found" });
                res.status(404).send({
                    errors,
                });
                
            }
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};

exports.updateArtState = async (req, res) => {
    
    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState

    // console.log(req.body)
    let edit_type = req.body.edit_type
    let data_update = req.body.data

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
            // console.log(referents)
            if(edit_type == 'art_state_resumen'){
                art_state.resumen = data_update
            } else if(edit_type == 'art_state_observaciones'){
                art_state.observaciones = data_update
            } else if(edit_type == 'art_state_description'){
                art_state.description = data_update
            } else if(edit_type == 'art_state_conclusiones'){
                art_state.conclusiones = data_update
            } else {
                res.status(500).send({message:'Edit type not found'})
            }

            // Saves the edit vig tec
            await vigTecExists.save();

            res.status(200).send({message:'Actualizado con exito'})
            
        // Error handling
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};

exports.updateAllArtState = async (req, res) => {
    
    const vig_tec_id = req.params.idVigTec
    const art_state_id = req.params.idArtState

    let {   resumen,
        observaciones,
        description,
        conclusiones,
        extra_camps } = req.body;

    try {
        const vigTecExists = await vigTec.findById(vig_tec_id);
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let art_state = vigTecExists.artState.id(art_state_id)
        if (!art_state) return res.status(400).send({message:'estado del arte no encontrado'})
        // console.log(referents)
        art_state.resumen = resumen
        art_state.observaciones = observaciones
        art_state.description = description
        art_state.conclusiones = conclusiones
        art_state.extra_camps = extra_camps

        // Saves the edit vig tec
        await vigTecExists.save();

        res.status(200).send({message:'Estado del arte actualizado con exito'})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};