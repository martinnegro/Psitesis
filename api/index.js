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
const server = require('./src/app.js');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const {
	conn,
	Rol,
	Category,
	SubCategory,
	Institution,
	User,
	Article,
	Tag,
	article_tag,
} = require('./src/db.js');
const { management } = require('./src/auth/index.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
	server.listen(process.env.PORT || 3001, async () => {
		console.log('%s listening at 3001');
		const tags = await Tag.bulkCreate([
			{ tag_id: uuidv4(), tag_name: 'Investigacion' },
			{ tag_id: uuidv4(), tag_name: 'Tesis' },
			{ tag_id: uuidv4(), tag_name: 'General' },
		]);
		console.log('**** ROLES CREADOS');
		// article_tag.bulkCreate([
		//   {articleArtId: uuid.v4(), articletagTagId: 1}
		// ])
		Rol.bulkCreate([
			{ rol_id: 1, rol_name: 'admin' },
			{ rol_id: 2, rol_name: 'colab' },
			{ rol_id: 3, rol_name: 'basic' },
		]).then(() => {
			console.log('**** ROLES CREADOS');
		});

		const cat_id1 = uuidv4();
		const cat_id2 = uuidv4();

		const categories = await Category.bulkCreate([
			{ cat_id: cat_id1, cat_name: 'Investigación' },
			{ cat_id: cat_id2, cat_name: 'Normas APA' },
		]);
		if (categories) console.log('**** CATEGORÍAS CREADAS');

		const sub_cat_id1 = uuidv4();
		const sub_cat_id2 = uuidv4();
		const sub_cat_id3 = uuidv4();
		const sub_cat_id4 = uuidv4();

		const subCategories = await SubCategory.bulkCreate([
			{
				sub_cat_id: sub_cat_id1,
				sub_cat_name: 'Metodología de la investigación',
				cat_id: cat_id1,
			},
			{
				sub_cat_id: sub_cat_id2,
				sub_cat_name: 'Elección de tema',
				cat_id: cat_id1,
			},
			{
				sub_cat_id: sub_cat_id3,
				sub_cat_name: 'Citado en el texto',
				cat_id: cat_id2,
			},
			{
				sub_cat_id: sub_cat_id4,
				sub_cat_name: 'Referencias bibliográficas',
				cat_id: cat_id2,
			},
		]);
		if (subCategories) console.log('**** SUB CAT CREADAS');
		
		const inst_id = uuidv4();
		const inst = await Institution.bulkCreate([
			{
				inst_id: uuidv4(),
				inst_name: 'Henry',
				inst_description: 'Bootcamp',
			},
			{
				inst_id: uuidv4(),
				inst_name: 'UBA',
				inst_description: 'Universidad',
			},
		]);
		console.log('**** INSTITUCIÓN CREADA');
		const usersA0 = await management.getUsers();
		const mappedusersA0 = usersA0.map((u) => {
			return {
				user_id: uuidv4(),
				user_name: u.name,
				user_id_A0: u.user_id,
				user_email: u.email,
				user_img_profile: u.picture,
				biography: '',
			};
		});
		const user = await User.bulkCreate(mappedusersA0);
		await user[0].addInstitution(inst[1].inst_id);
		await user[1].addInstitution(inst[0].inst_id);
		console.log('**** USUARIO CREADO');
		const art_id = uuidv4();
		const art = await Article.bulkCreate([
			{
				art_title: 'Sobre tesis',
				art_contents: 'Contenido extenso',
				art_date: '05/10/2021',
				art_views: 0,
				art_abstract: 'Abstract-1',
				art_id: uuidv4(),
				sub_cat_id: sub_cat_id1,
				user_id: user[0].user_id,
			},

			{
				art_title: 'Sobre APA',
				art_contents: 'Contenido Extenso',
				art_date: '17/01/1997',
				art_views: 0,
				art_abstract: 'Abstract-2',
				art_id: uuidv4(),
				sub_cat_id: sub_cat_id3,
				user_id: user[0].user_id,
			},
			{
				art_title: 'Sobre Proyectos',
				art_contents: 'Contenido Extenso',
				art_date: '03/05/2020',
				art_views: 0,
				art_abstract: 'Abstract-3',
				art_id: uuidv4(),
				sub_cat_id: sub_cat_id4,
				user_id: user[1].user_id,
			},
			//1ab454b1-b0ee-4a6e-a3a7-a4a5afbf1899
		]);
		await art[0].addTag([tags[0].tag_id, tags[1].tag_id]);
		await art[1].addTag([tags[2].tag_id]);
		await art[2].addTag([tags[2].tag_id]);
		console.log('**** ARTICULOS CREADOS');

		// eslint-disable-line no-console
	});
});
