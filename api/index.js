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
require("dotenv").config();
const {
  conn,
  Category, Subcategory, Institution, User, Article, Tag,
  Topic, Subtopic, Forumpost, Comment
} = require("./src/db.js");

const { createData } = require("./preloadData.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    console.log("%s listening at 3001");
    const importedData = await createData()
    const tags = await Tag.bulkCreate(importedData.pdTags);
    console.log("**** TAGS CREADOS");

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

    const topics = await Topic.bulkCreate(importedData.pdTopics);
    console.log('**** TEMAS FORO CREADOS');

    const subTopics = await Subtopic.bulkCreate(importedData.pdSubtopic);
    console.log('**** SUBTEMAS CREADOS');

    const posts = await Forumpost.bulkCreate(importedData.pdPost);
    console.log('**** POSTEOS CREADOS');

    const comments = await Comment.bulkCreate(importedData.pdComments);
    console.log('**** COMENTARIOS CREADOS')
  });
});