const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const article = require('./article');
const users = require('./users');
const institutions = require('./institutions');
const categories = require('./categories');
const subCategories = require('./subCategories');
const tag = require('./tag')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/article", article);
router.use("/users", users);
router.use('/institutions',institutions);
router.use('/categories',categories);
router.use('/subcategories', subCategories);
router.use('/tag',tag);

module.exports = router;
