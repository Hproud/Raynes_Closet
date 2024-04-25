express = require("express");
const { Review, User, Product, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");




const validateReview = [
  check("review")
    .trim()
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Review text is required"),
  handleValidationErrors,
];
//^-------------Add Image for a review----------------

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  //pull review id
  const id = Number(req.params.reviewId);
  const user = req.user.id;
  //search for review by PK
  const review = await Review.findByPk(id);
  // console.log(review.dataValues)
  //if doesnt exist throw error
  if (!review) {
    const err = Error("Review Not Found");
    err.status = 404;
    err.message = "Review Not Found";
    return next(err);
  } else {

      if (review.user_id !== user) {
        const err = Error("Not Authorized");
        err.status = 401;
        err.message = "Not Authorized";
        return next(err);
      } else {
        //if review does exist then add the new image with body info
        const newImage = Image.create({
          imageable_id: id,
          imageable_type: "Review",
          url: req.body.url,
        });

        //run query for all images with imageable_id with itemId and type of 'Review'
        const allImages = await Image.findAll({
          where: {
            imageable_id: id,
            imageable_type: "Review",
          },
        });
        //return all photos for that review

        return res.json(allImages);
      }

  }
  return;
});

//^ --------------Delete Product Image by id -----------

router.delete(
  "/:reviewId/images/:imageId",
  requireAuth,
  async (req, res, next) => {
    //pull itemid imageId and user status

    const reviewId = Number(req.params.reviewId);
    const imageId = Number(req.params.imageId);
    const user = req.user.id;

    //search for the review
    const review = await Review.findByPk(reviewId);

    //if not found throw error
    if (!review) {
      const err = Error("Review Not Found");
      err.status = 404;
      err.message = "Review Not Found";
      return next(err);
    } else {
      //search for the picture
      const image = await Image.findByPk(imageId);
      if (!image) {
        //if not found throw error
        const err = Error("Image Not Found");
        err.status = 404;
        err.message = "Image Not Found";
        return next(err);
      }
      if (image) {
        // check that user is author
        if (user !== review.user_id) {
          const err = Error("Not Authorized");
          err.status = 401;
          err.message = "Not Authorized";
          return next(err);
        } else {
          //delete photo
          await image.destroy();
          //return success message
          return res.json("Successfully Deleted!");
        }
      }
    }
    return;
  }
);

//& ----------------------Get all current users reviews ---------------------------

router.get("/current", requireAuth, async (req, res, next) => {
  //get user id
  const user = req.user.id;

  // search for all reviews by user_id
  const reviews = await Review.findAll({
    where: {
      user_id: user,
    },

    //include the item with pictures
    include: [
      {
        model: Product,
        include: [
          {
            model: Image,
            where: {
              imageable_type: "Product",
            },
          },
        ],
        attributes: ["name", "size"],
      },
    ],
    attributes: ["review", "stars", "createdAt", "updatedAt"],
  });

  if (!reviews.length) {
   const err = Error('No Reviews Found');
   err.status=404;
   err.message="No Reviews Found"
   return next(err)
  }
  //return all reviews
  return res.json(reviews);
});

//&---------------Delete Review-------------------------------------

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  // grab id from params and curr user id
  const id = req.params.reviewId;
  const user = req.user.id;
  //search for the review
  const review = await Review.findByPk(id);
  //if not found throw error
  if (!review) {
    const err = Error("Review Not Found");
    err.status = 404;
    err.message = "Review Not Found";
    return next(err);
  }

  if (review) {
    //if found check that user is author
    if (review.user_id !== user) {
      const err = Error("Not Authorized");
      err.status = 401;
      err.message = "Not Authorized";
      return next(err);
    } else {
      await review.destroy();
      return res.json("Successfully Deleted");
    }
  }
  //if not throw unauthorized error
  //if they are then delete the review
  //return success message
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
  }else{

    //if its found return the review
    return res.json(review);
  }

});

//&--------------Edit Review---------------------------
router.put("/:reviewId",validateReview, requireAuth, async (req, res, next) => {
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
    return res.json(end);
  } else {
    //if not found return not found error
    const err = Error("Review Not Found");
    err.status = 404;
    err.message = "Review Not Found";
    return next(err);
  }
});

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

  return res.json(reviews);
});

module.exports = router;
