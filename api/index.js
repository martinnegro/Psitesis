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
const { v4: uuidv4 } = require('uuid');
const { conn, Rol, Category, SubCategory, Institution, User, Article } = require("./src/db.js");


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
      { sub_cat_id: 1 , sub_cat_name: 'Metodología de la investigación', cat_id: 1 },
      { sub_cat_id: 2 , sub_cat_name: 'Elección de tema', cat_id: 1 },
      { sub_cat_id: 3 , sub_cat_name: 'Citado en el texto', cat_id: 2 },
      { sub_cat_id: 4 , sub_cat_name: 'Referencias bibliográficas', cat_id: 2 }
      
    ])
  }).then(async () => {
    console.log('**** SUB CAT CREADAS');
    const inst_id = uuidv4();
    const inst = await Institution.bulkCreate([
      {inst_id: uuidv4(), inst_name: 'Henry', inst_description: 'Bootcamp'},
      {inst_id: uuidv4(), inst_name: 'UBA', inst_description: 'Universidad'}
      ]);
    console.log('**** INSTITUCIÓN CREADA');
    const user_id = uuidv4();
    const user = await User.bulkCreate([
      {
        user_id,
        user_name: 'Santiago',
        user_email: 'santiago@psitesis.com',
        user_img_profile: 'http://img.jpg',
        biography: 'Creador de Psitesis',
        rol_id: 1,  
      },{
        user_id: uuidv4(),
        user_name: 'Wanda',
        user_email: 'wanda@henry.com',
        user_img_profile: 'http://img.jpg',
        biography: 'Instructora en Henry',
        rol_id: 2,  
      }])
    await user[0].addInstitution(inst[1].inst_id);
    await user[1].addInstitution(inst[0].inst_id);
    console.log('**** USUARIO CREADO');
    const art_id = uuidv4();
    const art = await Article.bulkCreate([
      {
        art_title: 'Sobre tesis',
        art_contents: 'Contenido extenso',
        art_date: '05/10/2021',
        art_tags: '',
        art_abstract: 'Abstract-1',
        art_id: uuidv4(),
        sub_cat_id: 1,
        user_id: user[0].user_id
      },{
        art_title: 'Sobre APA',
        art_contents: 'Contenido Extenso',
        art_date: '17/01/1997',
        art_tags: '',
        art_abstract: 'Abstract-2',
        art_id: uuidv4(),
        sub_cat_id: 3,
        user_id: user[0].user_id
      },{
        art_title: 'Sobre Proyectos',
        art_contents: 'Contenido Extenso',
        art_date: '03/05/2020',
        art_tags: '',
        art_abstract: 'Abstract-3',
        art_id: uuidv4(),
        sub_cat_id: 4,
        user_id: user[1].user_id
      }
    ])
    console.log('**** ARTICULOS CREADOS')
  });
   // eslint-disable-line no-console
});
});
