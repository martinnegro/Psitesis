const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const { authorizeAccessToken } = require("../auth/index.js");

const { Article, Tag, User } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    if (search) {
      const article = await Tag.findAll({
        include: { model: Article },
        where: { tag_name: { [Op.iLike]: `%${search}%` } },
      });
      if (article.length === 0) {
        const artTitle = await Article.findAll({
          where: { art_title: { [Op.iLike]: `%${search}%` } },
        });
        if (artTitle.length === 0) {
          const autor = await User.findAll({
            where: { user_name: { [Op.iLike]: `%${search}%` } },
          });
          if (autor.length === 0) {
            res.json({ message: "Articulo no encontrado" });
          } else {
            const artAutor = await Article.findAll({
              where: { user_id: autor[0].user_id },
            });
            res.json(artAutor);
          }
        }else{
          res.json(artTitle);
        }
      } else {
        let articles = [];
        for (let x in article) {
          articles = article[x].articles;
        }
        res.json(articles);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
