const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");
const { Article, User } = require('../db')


router.post(
  "/",
  // authorizeAccessToken,
  // checkAdminPermission,
  async (req, res, next) => {
    const { art_contents, art_title, art_date, art_tags, sub_cat_id, user_id } = req.body;
    let aux_id = user_id;
    const art_id = uuidv4();
    if (aux_id.includes('google')) {
      const aux_user = await User.findOne({ where: { user_id_A0: aux_id }})
      aux_id = aux_user.user_id;
    }
    Article.create({
      art_title,
      art_contents,
      art_date,
      art_tags,
      art_id,
      sub_cat_id,
      user_id: aux_id
    }).then(created => res.json(created.dataValues))
    .catch(err => next(err))
  }
);

router.get("/", (req, res, next) => {
  Article.findAll()
    .then(finded => {
      res.json(finded)
    }).catch(err => next(err));
});

router.get("/:art_id", (req, res, next) => {
  const { art_id } = req.params;
  console.log(art_id);
  if (!art_id) {
    const err = new Error("No Id");
    err.status = 400;
    next(err);
  } else {
    Article.findByPk(art_id)
      .then(finded => {
        res.json(finded.dataValues)
      }).catch(err => next(err));
  };
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: `ID recieved: ${id}` });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: `ID recieved: ${id}` });
});

module.exports = router;
