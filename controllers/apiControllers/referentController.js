const fs = require('fs');

const vigTec = require("../../models/vigTecModel");

exports.postReferent = async (req, res) => {
    let { doc_type, doc_title, doc_area_tema, year_publication, country_publication,  institution_entity,
        ref_keywords, indexing, categorization, ISDN_ISBN, DOI, doc_URL, authors, abstract, file_name} = req.body;

    console.log('post referent')
    console.log(req.body)

    const vig_tec_id = req.params.idVigTec

    // desencriptacion nombres autores
    let authors_arr = authors.split('#')
    let authors_array = []
    authors_arr.forEach(author => {
        if(author != ''){
            let separation = author.split(';')
            // console.log (separation)
            let json_authors = {}
            json_authors.name = separation[0]
            json_authors.lastname = separation[1]
            authors_array.push(json_authors)
        }
    })
    authors = authors_array

    let keywords = []
    if(ref_keywords != ''){
        keywords= ref_keywords.split(',')
    }
    // console.log('keywords')
    // console.log(keywords)

    if(file_name != ''){
        file_name = req.user._id + '-' + file_name
    }

    // An array that contains the errors (if there are some)
    let errors = [];

    // check if one or more fields are missing
    if (!doc_type || !doc_area_tema ||  !doc_title || !year_publication || !country_publication || !authors) {
        errors.push({ msg: "Por favor completar los campos obligatorios" });
    }

    // if there are errors, it renders the same page with the error messages
    if (errors.length > 0) {
        console.log("ERROR")
    } else {
        try {
            const vigTecExists = await vigTec.findById(vig_tec_id)
            // 
            if (vigTecExists) {
                const referente = new vigTec.referent({ doc_type, doc_area_tema, doc_title, year_publication, country_publication,  institution_entity,
                    keywords, indexing, categorization, ISDN_ISBN, DOI, doc_URL, authors, abstract, file_name});
    
                // Saves the new referent
                vigTecExists.referents.push(referente);

                vigTecExists.save();

                res.status(200).send({message:'Referente registrado con exito'})
            
            } else {
                res.status(404).json({message: 'Vig tec not found'})
                // The vt that is going to be created
            }
        // Error handling
        } catch (error) {
        console.log(error);
        res.status(500).send(error);
        }
    }
};

exports.getRefetent = async (req, res) => {
    console.log('get referent')
    try {
        const user_id = req.user._id
        const vig_tec_id = req.params.idVigTec
        const refetent_id = req.params.idReferent

        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let referents = vigTecExists.referents.id(refetent_id)
        if (!referents) return res.status(400).send({message:'referente no encontrado'})

        res.status(200).json(referents);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

exports.updateReferent = async (req, res) => {
    
    const vig_tec_id = req.params.idVigTec
    const referents_id = req.params.idReferent

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
            let referents = vigTecExists.referents.id(referents_id)
            if (!referents) return res.status(400).send({message:'referente no encontrado'})
            // console.log(referents)
            if(edit_type == 'doc_type'){
                referents.doc_type = data_update
            } else if(edit_type == 'doc_area_tema'){
                referents.doc_area_tema = data_update
            } else if(edit_type == 'doc_title'){
                referents.doc_title = data_update
            } else if(edit_type == 'year_publication'){
                referents.year_publication = data_update
            } else if(edit_type == 'country_publication'){
                referents.country_publication = data_update
            } else if(edit_type == 'institution_entity'){
                referents.institution_entity = data_update
            } else if(edit_type == 'indexing'){
                referents.indexing = data_update
            } else if(edit_type == 'categorization'){
                referents.categorization = data_update
            } else if(edit_type == 'ISDN_ISBN'){
                referents.ISDN_ISBN = data_update
            } else if(edit_type == 'DOI'){
                referents.DOI = data_update
            } else if(edit_type == 'doc_URL'){
                referents.doc_URL = data_update
            } else if(edit_type == 'abstract'){
                referents.abstract = data_update
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

exports.deleteReferent = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    const referents_id = req.params.idReferent
    
    try{
        const vigTecExists = await vigTec.findById(vig_tec_id);
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let referents = vigTecExists.referents.id(referents_id)
        if (!referents) return res.status(400).send({message:'referente no encontrado'})
        let referent_delete = vigTecExists.referents

        referent_delete.pull({_id:referents_id})
        vigTecExists.save()

        res.status(200).send({message:'Referente eliminado correctamente'})
    } catch (err) {
      console.log(err.message)
      res.status(500).send({message:'server error recargue la pagina e intente nuevamente'})
    }
}

exports.deleteFile = async (req, res) => {
    const vig_tec_id = req.params.idVigTec
    const referents_id = req.params.idReferent
    
    try{
        const vigTecExists = await vigTec.findById(vig_tec_id);
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let referents = vigTecExists.referents.id(referents_id)
        if (!referents) return res.status(400).send({message:'referente no encontrado'})
        // let referent_delete = vigTecExists.referents
        let DeletedFile = referents.file_name

        fs.unlinkSync('./public/uploads/files/' + DeletedFile)
        referents.file_name = ''

        vigTecExists.save()

        res.status(200).send({message:'Documento eliminado correctamente'})
    } catch (err) {
      console.log(err.message)
      res.status(500).send({message:'server error recargue la pagina e intente nuevamente'})
    }
}

exports.updateAllReferent = async (req, res) => {
    let { doc_type, doc_title, doc_area_tema, year_publication, country_publication,  institution_entity,
        ref_keywords, indexing, categorization, ISDN_ISBN, DOI, doc_URL, authors, abstract, file_name} = req.body;

    console.log('update referent')
    console.log(req.body)

    const vig_tec_id = req.params.idVigTec
    const referents_id = req.params.idReferent

    // desencriptacion nombres autores
    let authors_arr = authors.split('#')
    let authors_array = []
    authors_arr.forEach(author => {
        if(author != ''){
            let separation = author.split(';')
            // console.log (separation)
            let json_authors = {}
            json_authors.name = separation[0]
            json_authors.lastname = separation[1]
            authors_array.push(json_authors)
        }
    })
    authors = authors_array

    let keywords = []
    if(ref_keywords != ''){
        keywords= ref_keywords.split(',')
    }

    try {
        const vigTecExists = await vigTec.findById(vig_tec_id)
        if (!vigTecExists) return res.status(400).send({message:'Vigilancia tecnologica no encontrada'})
        let referent = vigTecExists.referents.id(referents_id)
        if (!referent) return res.status(400).send({message:'referente no encontrado'})

        referent.doc_type = doc_type
        referent.doc_area_tema = doc_area_tema
        referent.doc_title = doc_title
        referent.year_publication = year_publication
        referent.keywords = keywords
        referent.country_publication = country_publication
        referent.institution_entity = institution_entity
        referent.indexing = indexing
        referent.categorization = categorization
        referent.ISDN_ISBN = ISDN_ISBN
        referent.DOI = DOI
        referent.doc_URL = doc_URL
        referent.authors = authors
        referent.abstract = abstract

        if(referent.file_name == ''){
            console.log('pass')
            if(file_name != ''){
                console.log('pass2')
                file_name = req.user._id + '-' + file_name
                referent.file_name = file_name
            }
        }
        

        // Saves the new referent

        vigTecExists.save();

        res.status(200).send({message:'Referente actualizado con exito'})

    // Error handling
    } catch (error) {
    console.log(error);
    res.status(500).send(error);
    }
}