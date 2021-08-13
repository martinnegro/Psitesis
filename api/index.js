//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const {
  conn,
  Rol,
  Category,
  Subcategory,
  Institution,
  User,
  Article,
  Tag,
  article_tag,
} = require("./src/db.js");

const { createData } = require("./preloadData.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    console.log("%s listening at 3001");
    const importedData = await createData()
    const tags = await Tag.bulkCreate(importedData.pdTags);
    console.log("**** ROLES CREADOS");
    // article_tag.bulkCreate([
    //   {articleArtId: uuid.v4(), articletagTagId: 1}
    // ])
    Rol.bulkCreate([
      { rol_id: 1, rol_name: "admin" },
      { rol_id: 2, rol_name: "colab" },
      { rol_id: 3, rol_name: "basic" },
    ]).then(() => {
      console.log("**** ROLES CREADOS");
    });

    const categories = await Category.bulkCreate(importedData.pdCategories);
    console.log("**** CATEGORÍAS CREADAS");

    const subCategories = await Subcategory.bulkCreate(importedData.pdSubcategories);
    console.log("**** SUB CAT CREADAS");

    const inst = await Institution.bulkCreate(importedData.pdInst);
    console.log("**** INSTITUCIÓN CREADA");

    const user = await User.bulkCreate(importedData.mappedusersA0);
    await user[0].addInstitution(inst[1].inst_id);
    await user[1].addInstitution(inst[0].inst_id);
    console.log("**** USUARIO CREADO");

    const art = await Article.bulkCreate(importedData.pdArts);
    await art[0].addTag([tags[0].tag_id, tags[1].tag_id]);
    await art[1].addTag([tags[2].tag_id]);
    await art[2].addTag([tags[2].tag_id]);
    console.log("**** ARTICULOS CREADOS");

  });
});