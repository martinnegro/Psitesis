require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  DATABASE_URL,
  {
    logging: false,
    native: false,
  }
  /*   {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  } */
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Article, Institution, Rol, Network, User, Category, SubCategory, Tag } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//rol tiene muchos usuarios, se le añade el id de rol en la tabla user
//1 a N usuario --- rol
// Rol.hasMany(User);
User.belongsTo(Rol, { targetKey: "rol_id", foreignKey: "rol_id" });

// N a N red ----- usuario
User.hasMany(Network);
Network.belongsTo(User);

// 1 a N Usuario ----- Articulo
User.hasMany(Article, { as: "articles" });
Article.belongsTo(User, { foreignKey: "user_id" });

//#### Reemplazada la relacion inst - articulo por inst - user
Institution.belongsToMany(User, { through: "userinstitution" });
User.belongsToMany(Institution, { through: "userinstitution" });

//1 a N institucion ------redes
Institution.hasMany(Network);
Network.belongsTo(Institution);

//1 a N categoria------sub-categoria

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category, { targetKey: "cat_id", foreignKey: "cat_id" });

// 1 a N Categoria-----Articulo

SubCategory.hasMany(Article);
Article.belongsTo(SubCategory, {
  targetKey: "sub_cat_id",
  foreignKey: "sub_cat_id",
});

// N a N Tag-------Articulo

Article.belongsToMany(Tag, { through: "article_tag" });
Tag.belongsToMany(Article, { through: "article_tag" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
