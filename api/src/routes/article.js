const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");
const { Article, User } = require("../db");

router.post(
  "/",
  authorizeAccessToken,
  checkAdminPermission,
  async (req, res, next) => {
    const { art_contents, art_title, art_date, art_tags, sub_cat_id, user_id } =
      req.body;
    let aux_id = user_id;
    const art_id = uuidv4();
    if (aux_id.includes("google")) {
      const aux_user = await User.findOne({ where: { user_id_A0: aux_id } });
      aux_id = aux_user.user_id;
    }
    Article.create({
      art_title,
      art_contents,
      art_date,
      art_tags,
      art_id,
      sub_cat_id,
      user_id: aux_id,
      art_views: 0,
    })
      .then((created) => res.json(created.dataValues))
      .catch((err) => next(err));
  }
);

router.get("/", (req, res, next) => {
  const { orderBy, order } = req.query;
  if (orderBy && order) {
    return Article.findAll({
      order: [[orderBy, order]],
    })
      .then((articlesOrdered) => res.json(articlesOrdered))
      .catch((err) => next(err));
  }
  Article.findAll()
    .then((articlesFound) => {
      return res.json(articlesFound);
    })
    .catch((err) => next(err));
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
      .then((finded) => {
        console.log(finded);
        finded.increment("art_views");
        res.json(finded.dataValues);
      })
      .catch((err) => next(err));
  }
});

router.put("/:art_id", authorizeAccessToken, async (req, res, next) => {
  const { art_contents, art_title } = req.body;
  const { art_id } = req.params;
  const artToEdit = await Article.findOne({ where: { art_id: art_id } });
  if (artToEdit) {
    artToEdit
      .update({
        art_title,
        art_contents,
      })
      .then((updated) => res.json(updated.dataValues))
      .catch((err) => next(err));
  } else {
    res.json({
      message: `ID recieved: ${art_id} but dont exist article with ID!`,
    });
  }
});

router.delete("/:art_id", authorizeAccessToken, async (req, res, next) => {
  const { art_id } = req.params;
  const artToDelete = await Article.findOne({ where: { art_id: art_id } });
  if (artToDelete) {
    artToDelete
      .destroy()
      .then(() =>
        res
          .status(200)
          .json({ message: `article ${art_id} successfully deleted` })
      )
      .catch((err) => next(err));
  } else {
    res.status(404).json({
      message: `ID recieved: ${art_id} but dont exist article with ID!`,
    });
  }
});

module.exports = router;
