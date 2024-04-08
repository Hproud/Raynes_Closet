express = require("express");
const { Review, User, Product, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { route } = require("./products");
const router = express.Router();

//&-------------------------------------------Get All Reviews----------------------------------------

router.get("", async (req, res, next) => {
  const reviews = await Review.findAll({
    include: [
      { model: User, attributes: ["firstName", "lastName"] },
      {
        model: Product,
        attributes: ["name", "size"],
      },
      {
        model: Image,
        where: {
          imageable_type: "Review",
        },
        as: "ReviewImages",
      },
    ],
    attributes: ["id", "review", "stars"],
  });

  res.json(reviews);
});

//&--------------------------------Get Review by review Id-------------------------------------

router.get("/:reviewId", async (req, res, next) => {
  //pull the id
  const id = Number(req.params.reviewId);

  // find the review
  const review = await Review.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "createdAt"],
      },
      {
        model: Product,
        attributes: ["name", "size", "type"],
      },
      {
        model: Image,
        where: {
          imageable_id: id,
          imageable_type: "Review",
        },
        as: "ReviewImages",
        attributes: ["url", "preview"],
      },
    ],
  });

  //if not found throw not found error
  if (!review) {
    const err = Error("Review Not Found");
    (err.status = 404), (err.message = "Review Not Found");
    return next(err);
  }

  //if its found return the review
  res.json(review);
});

//&--------------Edit Review---------------------------
router.put("/:reviewId", requireAuth, async (req, res, next) => {
  //get id
  const id = Number(req.params.reviewId);
  const user = req.user.id;

  //search for review
  const review = await Review.findByPk(id);

  if (review) {
    //if found check that this is users review
    if (review.user_id !== user) {
      //if not throw unauthorized error
      const err = Error("UnAuthorized");
      err.status = 401;
      err.message = "UnAuthorized";
      return next(err);
    }

    //if it belongs to them submit changes
    const final = await Review.update(req.body, {
      where: {
        id: id,
      },
    });

    // pull new data
    const end = await Review.findByPk(id);

    //return new review
    res.json(end);
  } else {
    //if not found return not found error
    const err = Error("Review Not Found");
    err.status = 404;
    err.message = "Review Not Found";
    return next(err);
  }

  return;
});



//& ----------------------Get all current users reviews ---------------------------




module.exports = router;
