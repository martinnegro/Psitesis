const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid')

router.post('/', (req, res, next) => {
    const id = uuidv4();
    console.log(req.body);
    res.json({message: 'Artículo recibido', id })
});

router.get('/', (req, res, next) => {
    console.log(req.query);
    res.json(req.query);
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!id) {
        const err = new Error ('No hay id');
        err.status = 400;
        next(err)
    } else res.json({ id });
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    res.json({ message: `ID recibido: ${id}`})
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    res.json({ message: `ID recibido: ${id}`})
});



module.exports = router;