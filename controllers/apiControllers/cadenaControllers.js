const vigTec = require("../../models/vigTecModel");

exports.getCadenaValorPage = async (req, res) => {
    let user = req.user
    let vigTex = req.params.idVigTec
    let id_tree = req.params.idTree
    const vigTecExists = await vigTec.findById(vigTex)
    if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
    const tree = vigTecExists.tree.id(id_tree)
    if (!tree) return res.status(400).send({message:'arbol de problemas no encontrada'})
    const obj=tree.objetivos
    // console.log(obj)


    if(user._id == vigTecExists.creator) return res.status(200).render("cadena-valor", { user, vigTex, obj, id_tree, home: false});
    
    let colab = vigTecExists.colabs.find(colab => colab.user_id == user._id)
    if(colab){
        console.log(colab)
        if(colab.permissions.state == 'Active') return res.status(200).render("cadena-valor", { user, vigTex, obj, id_tree, home: false });
    }

    res.redirect('/dashboard-vig-tec');
    // console.log(vigTex)
};

exports.getTree = async(req, res) => {
    const vig_tec_id = req.params.idVigTec
    const posTree = req.params.posTree

    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        
        let tree = vigTecExists.tree[posTree-1]

        res.status(200).send({tree})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.updateActividades = async (req, res) => {
    
    const vig_tec_id = req.params.idVigTec
    const tree_id = req.params.idTree
    const obj_id = req.params.idObj

    // An array that contains the errors (if there are some)
    try {
        const vigTecExists = await vigTec.findById(vig_tec_id);
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let tree = vigTecExists.tree.id(tree_id)
        if (!tree) return res.status(400).send({message:'Arbol de problemas no encontrado'})
        let objetivos = tree.objetivos.objs_especificos
        console.log('---------------- objetivos update -------------- ')
        // console.log(objetivos)
        let obj_find = objetivos.find(obj => obj.id_problem == obj_id)
        if (!obj_find) return res.status(400).send({message:'Objetivo no encontrado'})
        
        console.log(req.body.objetivos)
        tree.objetivos = req.body.objetivos

        // Saves the edit vig tec
        await vigTecExists.save();

        res.status(200).send({message:'Objetivo actualizado con exito'})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    
};