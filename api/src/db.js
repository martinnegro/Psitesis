require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/psitesis`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
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
const { Article, Institution, Rol, Network, User, Category, SubCategory } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
//rol tiene muchos usuarios, se le añade el id de rol en la tabla user
//1 a N usuario --- rol
Rol.hasMany(User);
User.belongsTo(Rol);

// N a N red ----- usuario
User.hasMany(Network)
Network.belongsTo(User);

// 1 a N Usuario ----- Articulo
User.hasMany(Article)
Article.belongsTo(User);

// 1 a N institucion ----- Articulo
Institution.hasMany(Article)
Article.belongsTo(Institution);

//1 a N institucion ------redes
Institution.hasMany(Network)
Network.belongsTo(Institution);

//1 a N categoria------sub-categoria

Category.hasMany(SubCategory)
SubCategory.belongsTo(Category);

// 1 a N Categoria-----Articulo

Category.hasMany(Article)
Article.belongsTo(Category);




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
