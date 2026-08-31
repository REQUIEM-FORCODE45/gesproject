const vigTec = require("../../models/vigTecModel");

exports.postTree = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    console.log(req.body)
    
    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        
        const tree = new vigTec.tree(req.body);
        vigTecExists.tree.push(tree)
        // const problema = new vigTec.tree({ title, sigla, description});
        // // Saves the new referent
        // artState.problems.push(problema);
        vigTecExists.save();
        let length_tree = vigTecExists.tree.length

        res.status(200).send({message:'Arbol de problemas generado con exito', length_tree})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.getViewTree = (req, res) => {
    let user = req.user
    const vig_tec_id = req.params.idVigTec
    const posTree = req.params.posTree
    res.status(200).render("tree", { user, home: false, vig_tec_id, posTree });
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

exports.postObj = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    const tree_id = req.params.idTree
    console.log(req.body)
    
    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        const tree = await vigTecExists.tree.id(tree_id)
        if (!tree) return res.status(400).send({message:'arbol de problemas no encontrado'})

        tree.objetivos = req.body
        // tree.objetivos.push(req.body)
        // const problema = new vigTec.tree({ title, sigla, description});
        // // Saves the new referent
        // artState.problems.push(problema);
        vigTecExists.save();
        let objetivos = vigTecExists.tree.objetivos

        res.status(200).send({message:'Objetivos generados con exito', objetivos})
        
    // Error handling
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};