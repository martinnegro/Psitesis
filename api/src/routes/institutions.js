const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Institution, User, Article } = require("../db");

router.post("/", (req, res, next) => {
  const { name, description } = req.body;
  const id = uuidv4();
  Institution.create({
    inst_id: id,
    inst_name: name,
    inst_descriptions: description,
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

    const instutionArticles = await Article.findAll();

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

module.exports = router;
