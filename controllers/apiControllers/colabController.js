const vigTec = require("../../models/vigTecModel");

exports.changePermissions = async (req, res) => {

    const vig_tec_id = req.params.idVigTec
    let id_colab = req.body.colab_id
    let permission = req.body.permission
    let state = req.body.state_permission
    console.log(req.body)
    
    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let colab = vigTecExists.colabs.id(id_colab)
        if (!colab) return res.status(400).send({message:'colaborador no encontrado'})

        console.log(colab)
        if(permission == 'writeCheck'){
            colab.permissions.write = state
        } else if(permission == 'updateCheck'){
            colab.permissions.update = state
        } else if(permission == 'deleteCheck'){
            colab.permissions.delete = state
        } else {
            return res.status(400).send({message:'tipo de permiso no encontrado'})
        }
        // Saves the new referent
        vigTecExists.save();
        res.status(200).send({message:'Permiso actualizado con exito'})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.blockColab = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    const id_colab = req.params.idColab

    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let colab = vigTecExists.colabs.id(id_colab)
        if (!colab) return res.status(400).send({message:'colaborador no encontrado'})

        colab.permissions.state = 'block'
        // Saves the new referent
        vigTecExists.save();
        res.status(200).send({message:'Estado actualizado con exito'})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.unlockColab = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    const id_colab = req.params.idColab

    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let colab = vigTecExists.colabs.id(id_colab)
        if (!colab) return res.status(400).send({message:'colaborador no encontrado'})

        colab.permissions.state = 'Active'
        // Saves the new referent
        vigTecExists.save();
        res.status(200).send({message:'Estado actualizado con exito'})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};