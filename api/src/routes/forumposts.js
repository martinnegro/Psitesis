const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const sequelize = require('sequelize');
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");


const { Forumpost, Comment, User, Subtopic, Topic } = require('../db');


router.get('/', async (req, res, next) => {
    const result = await Forumpost.findAll();
    res.json(result)
});

router.post('/create',authorizeAccessToken, async (req, res, next) => {
    try{
        const {post_contents, post_title, post_date, sub_topic_id} = req.body
        let newPost = await Forumpost.create({
            post_id: uuidv4(),
            post_contents,
            post_title,
            post_date,
            post_open: true,
            post_edited: false,
        })

        console.log(newPost)
      
        const aux_user = await User.findOne({ where: { user_id_A0: req.user.sub } });
        await newPost.setUser(aux_user.user_id)
        await newPost.setSubtopic(sub_topic_id)
        res.json(newPost)
    }catch(err){
        next(err)
    }
});



router.get('/:post_id', async (req, res, next) => {
    const { post_id } = req.params;
    
    try {
    const result = await Forumpost.findByPk(post_id,{
        include: [{ 
            model: Comment, 
            include: [{model: User}] 
        },{
            model: User
        },{
            model: Subtopic,
            include: [{ model: Topic }]
        }],
    });
    res.json(result);
    } catch(err) { next(err) } 
    
});

router.put('/edit/:post_id', async (req, res, next) => {
    const { post_id } = req.params;
    const { post_title, post_contents } = req.body;
    try {
        const post = await Forumpost.findByPk(post_id);
        post.post_contents = post_contents;
        post.post_title = post_title;
        post.post_edited = true;
        await post.save();
        
        res.json(post)
    } catch(err) { next(err) }

});

router.put('/thread_status/:post_id', async (req, res, next) => {
    const { post_id } = req.params;
    try {
        const post = await Forumpost.findByPk(post_id);
        post.post_open = !post.post_open;
        await post.save();
        res.json(post) 
    } catch(err) { next(err) }
});

router.delete('/delete/:post_id', async (req, res, next) => {
    const { post_id } = req.params;
    try {
        const post = await Forumpost.findByPk(post_id);
        await post.destroy();
        res.json({ message: 'Deleted' }) 
    } catch(err) { next(err) }
});


module.exports = router;
