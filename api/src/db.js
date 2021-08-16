require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  DATABASE_URL,
  /*   {
    logging: false,
    native: false,
  }*/ 
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
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
const { Article, Institution, Network, User, Category, Subcategory, Tag } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// 1 a N Usuario ----- Articulo
User.hasMany(Article, { foreignKey: "user_id" });
Article.belongsTo(User, { foreignKey: "user_id" });

//#### Reemplazada la relacion inst - articulo por inst - user
Institution.belongsToMany(User, { through: "userinstitution" });
User.belongsToMany(Institution, { through: "userinstitution" });

//1 a N categoria------sub-categoria

Category.hasMany(Subcategory, { foreignKey: "cat_id" });
Subcategory.belongsTo(Category, { foreignKey: "cat_id" });

// 1 a N Categoria-----Articulo
Subcategory.hasMany(Article, { foreignKey: 'sub_cat_id' });
Article.belongsTo(Subcategory, { foreignKey: 'sub_cat_id' });

// N a N Tag-------Articulo

Article.belongsToMany(Tag, { through: "article_tag" });
Tag.belongsToMany(Article, { through: "article_tag" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
