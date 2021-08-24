const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const auth = require('./auth');
const article = require("./article");
const users = require("./users");
const institutions = require("./institutions");
const categories = require("./categories");
const Subcategory = require("./subCategory");
const search = require("./searchHome");
const subCategories = require("./subCategories");
const metadata = require("./metadata");
const topics = require("./topics");
const forumposts = require('./forumposts');
const forum_home = require('./forum_home')
const subtopics = require('./subTopics')
const forum_comments = require("./forum_comments");
const files = require('./file')
const report = require("./report");
const notification = require("./notification");
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/auth', auth);
router.use("/article", article);
router.use("/users", users);
router.use("/institutions", institutions);
router.use("/categories", categories);
router.use("/Subcategory", Subcategory);
router.use("/subcategories", subCategories);
router.use("/metadata", metadata);
router.use("/search", search);
router.use("/topics", topics);
router.use('/forumposts',forumposts)
router.use('/forum_home',forum_home);
router.use('/subtopics', subtopics);
router.use("/forum_comments", forum_comments);
router.use("/notification", notification);
router.use("/files", files);
router.use('/report', report);

module.exports = router;
