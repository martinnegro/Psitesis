const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { User, Institution } = require('../db') 

router.post("/", async (req, res, next) => {
  const { user_id_A0, user_name, user_email, user_img_profile, inst_id, biography, rol_id } = req.body;
  const user_id = uuidv4();
  if (user_id_A0){
    const [user, created] = await User.findOrCreate({
      where: { user_id_A0 },
      include: [ { model: Institution } ],
      defaults: {
        user_id,
        user_id_A0,
        user_name,
        user_email,
        user_img_profile,
        biography,
        rol_id
      },
    });
    if (created && inst_id) {
      await user.addInstitution(inst_id);
      User.findByPk(user_id,{
        include:[{
          model: Institution,
          through:{
            attributes: []
          }
        }]
      })
        .then((finded) => {
          res.json(finded)
        });
    } else {
      User.findOne({ where: { user_id_A0 }})
        .then((finded) => {
          res.json(finded)
        });
    }
  } else {

  }


});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ id });
});

module.exports = router;
