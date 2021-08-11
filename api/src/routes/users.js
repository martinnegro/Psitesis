const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { User, Institution, Rol, Article } = require("../db");
const { Op } = require("sequelize");
const { management } = require("../auth/index");
const { axios } = require("axios");

router.post("/", async (req, res, next) => {
  const {
    user_id_A0,
    user_name,
    user_email,
    user_img_profile,
    inst_id,
    biography,
    rol_id,
  } = req.body;
  let roles = [];
  if (!Array.isArray(inst_id)) {
    const err = new Error("inst_id must be an array");
    err.status = 400;
    return next(err);
  }
  try {
    const result = await User.findOne({
      where: {
        [Op.or]: [{ user_id_A0 }, { user_email }],
      },
      include: [
        {
          model: Institution,
          through: { attributes: [] },
        },
      ],
    });

    if (result) {
      const userRoles = await management.getUserRoles({
        id: result.dataValues.user_id_A0,
      });
      for (let i in userRoles) {
        roles.push(userRoles[i].name);
      }
      return res.json({
        ...result.dataValues,
        roles: roles,
        created: false,
      });
    }
  } catch (err) {
    return next(err);
  }

  const user_id = uuidv4();
  try {
    const user = await User.create({
      user_id,
      user_id_A0,
      user_name,
      user_email,
      user_img_profile,
      biography,
      rol_id,
    });
    inst_id.length > 0 && (await user.addInstitution(inst_id));
    User.findByPk(user_id, {
      include: {
        model: Institution,
        through: {
          attributes: [],
        },
      },
    }).then((found) => {
      res.json({ ...found.dataValues, roles: roles, created: true });
    });
  } catch (err) {
    return next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { rol } = req.query;
    let params = {
      id: rol,
    };
    if (rol) {
      const usersFound = await management.getUsersInRole(params);
      const mappedUsers = usersFound.map((u) => {
        return { user_id_A0: u.user_id };
      });

      const result = await User.findAll({
        where: {
          [Op.or]: mappedUsers,
        },
      });
      return res.json(result);
    }
    return User.findAll()
      .then((finded) => res.json(finded))
      .catch((err) => next(err));
  } catch (err) {
    console.error(err);
  }
});

router.get("/:user_id", (req, res, next) => {
  const { user_id } = req.params;
  if (user_id) {
    return User.findByPk(user_id, {
      include: [
        {
          model: Institution,
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((found) => {
        Article.findAll({ where: { user_id } }).then((arts) => {
          res.json({ ...found.dataValues, articles: arts });
        });
      })
      .catch((err) => next(err));
  }
});

router.post("/verifyemail", (req, res) => {
  const user = req.body;
  return management.sendEmailVerification(user, function (err) {
    if (err) {
      return res.send(err);
    }
    return res.send("Email verification sent");
  });
});

module.exports = router;
