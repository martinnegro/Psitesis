const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res, next) => {
    console.log(req.body);
    const user = { provisional: 'Usuario creado' };
    res.json(user)
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    res.json({ id });
});


module.exports = router;