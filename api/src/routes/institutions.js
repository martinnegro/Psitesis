const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Institution, User, Article } = require("../db");

router.post("/", (req, res, next) => {
  const { inst_name, inst_descriptions, inst_link, inst_logo } = req.body;
  const id = uuidv4();
  Institution.create({
    inst_id: id,
    inst_name,
    inst_descriptions,
    inst_link,
    inst_logo,
  })
    .then((created) => {
      res.json(created);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/", (req, res, next) => {
  return Institution.findAll()
    .then((finded) => res.json(finded))
    .catch((err) => next(err));
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const institutionProfile = await Institution.findOne({
      where: {
        inst_id: id,
      },
    });

    const institutionUsers = await User.findAll({
      include: [
        {
          model: Institution,
          where: {
            inst_id: id,
          },
        },
      ],
    });

    const instutionArticles = await Article.findAll({ where: { art_available: true } });

    let articlesResult = institutionUsers.map((user) => {
      return instutionArticles.filter((x) => {
        return x.user_id === user.user_id;
      });
    });

    if (institutionProfile === null) {
      console.log("Not Found");
    }

    return res.json({
      institution: institutionProfile,
      articles: articlesResult,
    });
  } catch (err) {
    return next(err);
  }
});

router.put("/:inst_id", async (req, res, next) => {
  const { inst_id } = req.params;
  const { inst_name, inst_descriptions, inst_link, inst_logo } = req.body;
  let inst = {};
  try {
    inst = await Institution.findOne({ where: { inst_id } });
  } catch (err) {
    next(err);
  }
  inst.inst_name = inst_name;
  inst.inst_descriptions = inst_descriptions;
  inst.inst_link = inst_link;
  inst.inst_logo = inst_logo;
  try {
    await inst.save();
  } catch (err) {
    next(err);
  }
  res.json(inst);
});

router.delete("/:inst_id", async (req, res, next) => {
  const { inst_id } = req.params;
  let inst = {};
  try {
    inst = await Institution.findOne({ where: { inst_id } });
  } catch (err) {
    next(err);
  }
  try {
    await inst.destroy();
  } catch (err) {
    next(err);
  }
  res.json({ message: "Deleting Succesful" });
});

module.exports = router;
