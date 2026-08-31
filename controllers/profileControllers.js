const User = require('../models/userModel');
//# User.profile
module.exports = {
  /**
   * Desc:
   * Action: 
   * @param {*} req 
   * @param {*} res 
   */
  getUserProfileById: async (req, res) =>{
    let id = req.params.user_id || {};
    try {
      let user = await User.findById(id);
      let profile = user.profile
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * Desc:
   * Action:
   * @Body []
   * @param {*} req 
   * @param {*} res 
   */
  createProfileUserById: async (req, res) => {
    const {first_name,second_name,first_last_name,second_last_name,type_identification,identification_document,phone,address} = req.body
    let id = req.params.user_id || {};
    try {
      let profile = {first_name,second_name,first_last_name,second_last_name,type_identification,identification_document,phone,address}
      let user = await User.findById(id);
      if(!user) return res.status(400).json({ message: "No fount User" });
      user.profile = profile
      let newProfile = await user.save();
      res.status(200).json({ data: newProfile });
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err });
    }
  },
  /**
   * Desc:
   * Action: 
   * @param {*} req 
   * @param {*} res 
   */
  deleteUserByIdProfile: async (req, res) => {
    const id = req.params.user_id; //params yg di routes :Id
    try {
      let user = await User.findById(id);
      if(!user) return res.status(400).json({ message: "No fount User" });
      user.profile = {}
      user.save()
      res.status(200).json({message:'Se elimino correctamente el perfil del usuario'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /**
   * Desc:
   * Action:
   * @param {*} req 
   * @param {*} res
   */
  updateUserProfile: async (req, res) => {
    console.log(req.body)
    // const { name, las,first_last_name,second_last_name,type_identification,identification_document,phone,address } = req.body
    let user_id = req.user._id;

    try {
      let user = await User.findById(user_id);
      console.log(user)
      user.name = req.body.name
      user.last_name = req.body.last_name
      user.phone = req.body.phone
      user.address = req.body.address
      user.identification_type = req.body.identification_type
      user.identification_document = req.body.identification_document

      // user.profile = {first_name,second_name,first_last_name,second_last_name,type_identification,identification_document,phone,address} 
      await user.save()
      // let updateUserProfile = user.profile
      res.status(200).json({ message: 'Datos actualizados correctamente'});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // actusalizar rol de usuario
  UpdateRolUser: async (req, res) => {
    let user_id = req.params.user_id;
    console.log("update rol")
    console.log(user_id)
    try {
      // TO DO
      let user = await User.findById(user_id);
      console.log(user)

      user.rol = req.body.rol

      await user.save()

      res.status(200).json({ message: 'Rol actualizado correctamente', user});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Bloquear / desbloquear user
  UpdateStateUser: async (req, res) => {
    let user_id = req.params.user_id;
    console.log("update rol")
    console.log(user_id)
    try {
      // TO DO
      let user = await User.findById(user_id);
      console.log(user)

      user.state = req.body.state

      await user.save()

      res.status(200).json({ message: 'Rol actualizado correctamente', user});
    } catch (err) {
      res.status(500).json(err);
    }
  }
}