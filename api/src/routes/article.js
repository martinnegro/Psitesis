const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");
const { Article, User, Tag, Subcategory, Category } = require("../db");
const { Op } = require('sequelize');

router.post(
  "/",
  authorizeAccessToken,
  checkAdminPermission,
  async (req, res, next) => {
    const { art_contents, art_title, art_date, art_tags, sub_cat_id, user_id, art_abstract, cat_id } =
      req.body;
    let id_cat = cat_id
    let id_subcat = sub_cat_id
    let aux_id = user_id;
    const art_id = uuidv4();
    if (aux_id.includes("google")) {
      const aux_user = await User.findOne({ where: { user_id_A0: aux_id } });
      aux_id = aux_user.user_id;
    }
    const createdArticle = await Article.create({
      art_title,
      art_contents,
      art_date,
      art_abstract,
      art_id,
      sub_cat_id,
      cat_id,
      user_id: aux_id,
      art_views: 0,
    })

    const tags = []

    /*Creo una promesa para poder esperar por el forEach*/
    var aux = new Promise((resolve, reject) => {
      art_tags.forEach( async (tag_name, index, array) => {
        const tag = await Tag.findOne(
          { where: {tag_name: {[Op.iLike]: `%${tag_name}`}}}
        );
        if(tag){
          tags.push(tag)
        }else{
          const createdTag = await Tag.create({
            tag_id: uuidv4(),
            tag_name: tag_name
          });
          tags.push(createdTag)
        }
        if (index === array.length -1) resolve();
      });
  });
  
  aux.then(async () => {
     await createdArticle.setTags(tags);
     
     return res.status(201).send(createdArticle);
  });

  }
);

router.get("/", (req, res, next) => {
  const { orderBy, order } = req.query;
  if (orderBy && order) {
    return Article.findAll({
      order: [[orderBy, order]],
      include:[{ model: Subcategory}]
    })
      .then((articlesOrdered) => res.json(articlesOrdered))
      .catch((err) => next(err));
  }
  Article.findAll({
    include:[{ model: Subcategory,
      attributes:['sub_cat_id'],
    include: [{model: Category,
    attributes:['cat_id']}]}]
  })
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
    Article.findByPk(art_id, {
      include: [{ model: Subcategory }]
    })
      .then((finded) => {
        finded.increment("art_views");
        console.log('FINDED:',finded.dataValues)
        res.json(finded.dataValues);
      })
      .catch((err) => next(err));
  }
});

router.put("/:art_id", authorizeAccessToken, async (req, res, next) => {
  const { art_contents, art_title, art_abstract } = req.body;
  const { art_id } = req.params;
  const artToEdit = await Article.findOne({ where: { art_id: art_id } });
  if (artToEdit) {
    artToEdit
      .update({
        art_title,
        art_contents,
        art_abstract
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

router.get("/sinseccion/hola", async (req, res, next) => {
  try {
    let articleWithoutCategory = await Article.findAll( {
      where: { 
        sub_cat_id: null
      }
    })
  
    // let articleWithoutSubcategory = await Article.findAll({ 
    //   include:[{ model: Subcategory}],
    //   where: [{ subcategory : null }]
    // })
   
    return res.json(articleWithoutCategory /*articleWithoutSubcategory*/ )
  } catch (e){
    next(e)
  }
});

module.exports = router;
