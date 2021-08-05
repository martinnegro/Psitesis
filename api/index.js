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
const { conn, Rol, Category, SubCategory } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
server.listen(3001, () => {
  console.log("%s listening at 3001");
  Rol.bulkCreate([
    {rol_id: 1, rol_name: 'admin' },
    {rol_id: 2, rol_name: 'colab' },
    {rol_id: 3, rol_name: 'basic' }
  ]).then(() => { console.log('**** ROLES CREADOS')})
  Category.bulkCreate([
    { cat_id: 1, cat_name: 'Investigación' },
    { cat_id: 2, cat_name: 'Normas APA' }
  ]).then(() => {
    console.log('**** CATEGORÍAS CREADAS')
    SubCategory.bulkCreate([
      { sub_cat_id: 1 , sub_cat_name: 'Diseño Experimental', cat_id: 1 },
      { sub_cat_id: 2 , sub_cat_name: 'Elección de Tema', cat_id: 1 },
      { sub_cat_id: 3 , sub_cat_name: 'Citado en el texto', cat_id: 2 },
      { sub_cat_id: 4 , sub_cat_name: 'Referencias Bibliográficas', cat_id: 2 }
    ])
  }).then(() => {
    console.log('**** SUB CAT CREADAS')
  });
   // eslint-disable-line no-console
});
});
