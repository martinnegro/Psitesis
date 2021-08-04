const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");

router.post(
  "/",
  authorizeAccessToken,
  checkAdminPermission,
  (req, res, next) => {
    const id = uuidv4();
    console.log(req.body);
    res.json({ message: "Artícle recieved", id });
  }
);

router.get("/", (req, res, next) => {
  console.log(req.query);
  res.json(req.query);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    const err = new Error("No ID");
    err.status = 400;
    next(err);
  } else res.json({ id });
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: `ID recieved: ${id}` });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  res.json({ message: `ID recived: ${id}` });
});

module.exports = router;
