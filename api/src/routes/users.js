const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { User, Institution, Rol, Article } = require('../db');
const { Op } = require('sequelize');




router.post("/", async (req, res, next) => {
  const { user_id_A0, user_name, user_email, user_img_profile, inst_id, biography, rol_id } = req.body;
  if (!Array.isArray(inst_id)) {
    const err = new Error('inst_id must be an array');
    err.status = 400;
    return next(err);
  }
  try {
  const result = await User.findOne({ where: {
              [Op.or]: [{ user_id_A0 },{ user_email }] 
            },
            include:[{
              model: Institution,
              through:{ attributes: [] }
            }]
  });
  if (result) return res.json({...result.dataValues, created: false})
  } catch (err) {
    return next(err);
  }
  
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
      }).then(found => {
          res.json({...found.dataValues, created: true})
        })
    } catch(err) { return next(err) }
  
});

router.get('/',(req,res,next) => {
  User.findAll()
    .then(finded => res.json(finded))
    .catch(err => next(err));
});

router.get("/:user_id", (req, res, next) => {
  const { user_id } = req.params;
  User.findByPk(user_id,
    {
      include: [
        { 
          model: Institution,
          through: {
            attributes: [] 
          }
        }
      ]
  }).then(found => {
    Article.findAll({where: {user_id}})
      .then(arts => {
        res.json({...found.dataValues, articles: arts});
      })
  }).catch(err => next(err));
});

module.exports = router;
