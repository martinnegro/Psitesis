const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");
const { File } = require("../db");
const { Op } = require('sequelize');

router.post(
  "/",
  authorizeAccessToken,
  checkAdminPermission,
  async (req, res, next) => {
    const { name, description, url } = req.body;
    const fileExists = await File.findOne({ where: { name: name } });

    //si el archivo existe devuelvo el archivo existente
    if(fileExists){
      return res.status(201).send(fileExists);
    }else{
    const id = uuidv4();
    const createdFile = await File.create({
      id,
      name,
      description,
      url
    })
     return res.status(201).send(createdFile);
    }
  }
);

router.get("/", (req, res, next) => {
  const {name} = req.query
  if(name){
    File.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    }).then((files) => {
      return res.json(files);
    })
    .catch((err) => next(err));
  } else {
    File.findAll({
    order: [['name', 'ASC']]
  })
    .then((files) => {
      return res.json(files);
    })
    .catch((err) => next(err));
  }  
});


router.delete("/:id", authorizeAccessToken, async (req, res, next) => {
  const { id } = req.params;
  const fileToDelete = await File.findOne({ where: { id: id } });
  if (fileToDelete) {
    fileToDelete
      .destroy()
      .then(() =>
        res
          .status(200)
          .json({ message: `file ${id} deleted successfully` })
      )
      .catch((err) => next(err));
  } else {
    res.status(404).json({
      message: `file with id ${id} not found`,
    });
  }
});


module.exports = router;


