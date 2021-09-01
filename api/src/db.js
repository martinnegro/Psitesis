require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  DATABASE_URL,
  /*{
    logging: false,
    native: false,
  }*/
  {
    logging: false,
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
const {
  Article,
  Institution,
  User,
  Category,
  Subcategory,
  Tag,
  Topic,
  Subtopic,
  Forumpost,
  Comment,
  Notification,
  Report,
} = sequelize.models;

User.hasMany(Article, { foreignKey: "user_id" });
Article.belongsTo(User, { foreignKey: "user_id" });

Institution.belongsToMany(User, { through: "userinstitution" });
User.belongsToMany(Institution, { through: "userinstitution" });

Category.hasMany(Subcategory, { foreignKey: "cat_id" });
Subcategory.belongsTo(Category, { foreignKey: "cat_id" });

Subcategory.hasMany(Article, { foreignKey: "sub_cat_id" });
Article.belongsTo(Subcategory, { foreignKey: "sub_cat_id" });

Article.belongsToMany(Tag, { through: "article_tag" });
Tag.belongsToMany(Article, { through: "article_tag" });

// RELACIONES DE FORO
Topic.hasMany(Subtopic, { foreignKey: "topic_id" });
Subtopic.belongsTo(Topic, { foreignKey: "topic_id" });

Subtopic.hasMany(Forumpost, { foreignKey: "sub_topic_id" });
Forumpost.belongsTo(Subtopic, { foreignKey: "sub_topic_id" });

User.hasMany(Forumpost, { foreignKey: "user_id" });
Forumpost.belongsTo(User, { foreignKey: "user_id" });

Forumpost.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Forumpost, { foreignKey: "post_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Comment.hasMany(Comment, {
  foreignKey: "response_to_comment_id",
  as: "child_comment",
});
Comment.belongsTo(Comment, {
  foreignKey: "response_to_comment_id",
  as: "parent_comment",
});

User.hasMany(Notification, { as: "sender", foreignKey: "senderId" });
User.hasMany(Notification, { as: "receiver", foreignKey: "receiverId" });
Notification.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});
Notification.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiver",
});

Comment.hasMany(Report, { foreignKey: "comment_id" });
Report.belongsTo(Comment, { foreignKey: "comment_id" });

Forumpost.hasMany(Report, { foreignKey: "post_id" });
Report.belongsTo(Forumpost, { foreignKey: "post_id" });

User.hasMany(Report, { foreignKey: "user_id" });
Report.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
