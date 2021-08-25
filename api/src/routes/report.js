const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");

const { Report, User, Comment } = require("../db");

router.post("/", authorizeAccessToken, async (req, res, next) => {
  try {
    const { rep_reason, comment_id, post_id } = await req.body;
    let newReport = await Report.create({
      rep_id: uuidv4(),
      rep_reason,
      rep_resolved: false,
    });

    const aux_user = await User.findOne({
      where: { user_id_A0: req.user.sub },
    });

    await newReport.setUser(aux_user.user_id);

    if (comment_id !== null) {
      await newReport.setComment(comment_id);
    }

    if (post_id !== null) {
      await newReport.setForumpost(post_id);
    }
    return res.json(newReport);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
