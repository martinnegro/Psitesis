const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { User, Institution } = require('../db');
const { Op } = require('sequelize');

router.post("/", async (req, res, next) => {
  const { user_id_A0, user_name, user_email, user_img_profile, inst_id, biography, rol_id } = req.body;
  if (!Array.isArray(inst_id)) {
    const err = new Error('inst_id must be an array');
    err.status = 400;
    return next(err);
  }
  const result = await User.findOne({ where: {
              [Op.or]: [{ user_id_A0 },{ user_email }] 
            },
            include:[{
              model: Institution,
              through:{ attributes: [] }
            }]
  });
  if (result) return res.json({...result, created: false})
  else {
    const user_id = uuidv4();
    try {
      const user =  await User.create({
          user_id,
          user_id_A0,
          user_name,
          user_email,
          user_img_profile,
          biography,
          rol_id,  
      });
      await user.addInstitution(inst_id)
      User.findByPk(user_id, {
        include: {
          model: Institution,
          through: {
            attributes: []
          }
        }
      }).then(finded => {
          console.log(finded)
          res.json({...finded.dataValues, created: true})
        })
    } catch(err) { return next(err) }
  }
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ id });
});

module.exports = router;
