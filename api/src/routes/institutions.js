const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { Institution } = require('../db'); 

router.post('/', (req, res, next) => {
    const { name, description } = req.body;
    const id = uuidv4()
    Institution.create({
        inst_id: id,
        inst_name: name,
        inst_descriptions: description
    }).then((created) => {
        
        res.json(created)
    }).catch((err) => {
        next(err)
    });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    Institution.findByPk(id)
        .then((inst) => {
            res.json(inst);
        }).catch((err) => {
            next(err)
        })
});


module.exports = router;