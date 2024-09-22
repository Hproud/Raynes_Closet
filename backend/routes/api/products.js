const express = require("express");
const { Product, Image, Review, Inventory, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require('express-validator');
const { handleValidationErrors}= require('../../utils/validation')
const router = express.Router();





const validateReview = [
  check("review")
    .trim()
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Review text is required"),
  handleValidationErrors,
];



const ValidateProduct = [
   check('name')
   .trim('')
  .exists({checkFalsy: true})
  .withMessage("Item must have a name"),
  check('description')
  .trim()
  .exists({checkFalsy: true})
  .withMessage("Item must have a description"),
  check('size')
  .exists({checkFalsy: true})
  .custom((value) =>{
    if(value !== 'Select Size' ) return true
  })
  .withMessage("Size is required"),
   check('price')
  .exists({checkFalsy: true})
  .withMessage("Price Must be greater than 0"),
  check('type')
  .exists({checkFalsy: true})
  .custom((value) =>{
    if(value !== 'Select Type' ) return true
  })
  .withMessage("Type of product is required"),
  handleValidationErrors
]

const ValidateEdit =[
  check('description')
  .exists({checkFalsy: true})
  .withMessage("Item must have a description"),
   check('price')
  .exists({checkFalsy: true})
  .withMessage("Price Must be greater than 0"),
  handleValidationErrors
]


const ValidatePic = [
  check('url')
  .exists()
  .custom((value) =>{
    if(value.includes('png') || value.includes('jpg') || value.includes('jpeg') || value.includes('webp') ) return true
  })
  .withMessage("Image Url must end in .png, .jpg, or .jpeg"),
  handleValidationErrors
]



//TODO--------------------------------------GET ALL PRODUCTS--------------------------------------------

router.get("", async (req, res, next) => {
  const products = await Product.findAll({
    // attributes: ["id", "name", "description", "size", "price", "type"],
    // where: {
    //   id: 1000
    // }
  });
if(!products.length){
  const err = Error("No Items Found");
  err.status = 404;
  err.message = "No Items Found"
  return next(err)
}
  if (products.length) {
    const final = [];

    for (let i = 0; i < products.length; i++) {
      const pic = await Image.findOne({
        where: {
          imageable_id: products[i].id,
          imageable_type: "Product",
          // preview: true,
        },
        attributes: ["id", "url"],
      });

      const newItem = {
        id: products[i].id,
        name: products[i].name,
        description: products[i].description,
        size: products[i].size,
        price: products[i].price,
        type: products[i].type, //!----------------------------
        preview: pic?.dataValues?.url,
      };
      let found = false

      final.map((prod) => {
        const name = prod.name
        if(name === newItem.name){
          found = true
        }
      })
      if(!found){
        final.push(newItem);

      }
    }

    return res.json(final);
  }
  return res.json(products);
});


//TODO--------------------------------GET PRODUCT BY NAME---------------------------------------------------
router.get('/item', async (req, res, next) =>{
//get the name from the body of the request
const {name} = req.body
// search for all items with the same name
const allItems = await Product.findAll({
  where:{
    name: name
  },
  include: [
    {
      model: Image,
      where: {
        imageable_type: "Product",
      },
    },
  ]
})
//return all found items with preview image
const finalProduct=[]

allItems.map((item)=>{
  const final = {
    id: item.id,
    name: item.name,
    description: item.description,
    size: item.size,
    price: item.price,
    type: item.price,
    preview: item.Images[0].url,
    images: item.Images,
    createdAt: item.createdAt,
    updatedAt: item.createdAt
  }
  finalProduct.push(final)
})

return res.json(finalProduct)
// return res.json(allItems)
})


//TODO--------------------------------GET PRODUCT BY ID--------------------------------------------

router.get("/:itemId", async (req, res, next) => {
  // get the id from params
  const id = Number(req.params.itemId);
  //query the db to find the item
  const prod = await Product.findByPk(id, {
    // attributes: ["id", "name", "description", "size", "price", "type"],
    include: [
      //query all pictures related to that item
      {
        model: Image,
        where: {
          imageable_id: id,
          imageable_type: "Product",
        },
      },
    ],
  });
if(!prod){
  const err = Error("No Item Found");
  err.status = 404;
  err.message = "No Item Found"
  return next(err)
}else{
const revs = []
  const reviews = await Review.findAll({
    where:{
      item_id: id
    },
  })
  if(reviews ){

    for (let i=0;i < reviews.length;i++){
      const rev = reviews[i]
      const pics = await Image.findAll({
        where:{
          imageable_id: rev.id,
          imageable_type: 'Review'
        }
      })

      const newrev={
        id: rev.id,
        user_id: rev.user_id,
        review: rev.review,
        stars: rev.stars,
        item_id: rev.itemId,
        images: pics,
        createdAt: rev.createdAt,
        updatedAt: rev.updatedAt
      }
      revs.push(newrev)
    }


    const final= {
      id: id,
      name: prod.name,
      description: prod.description,
      size: prod.size,
      price: prod.price,
      images: prod.Images[0],
      reviews: revs,
      type: prod.type,
      preview: prod.preview,
      createdAt: prod.createdAt,
      updatedAt: prod.updatedAt
    }
  return res.json(final);

  }else{
    const final= {
      id: id,
      name: prod.name,
      description: prod.description,
      size: prod.size,
      price: prod.price,
      images: prod.Images[0],
      type: prod.type,
      preview: prod.preview,
      createdAt: prod.createdAt,
      updatedAt: prod.updatedAt
    }
    // return all info for the product to the front end
    return res.json(final);
  }
}

});

//Todo-----------------------------------------ADD A PRODUCT---------------------------------------------------------------

router.post("", requireAuth, ValidateProduct, async (req, res, next) => {
  //get info from the body
  const proposed = req.body;

  //search to make sure the item doesnt already exist
  const exists = await Product.findOne({
    where: {
      name: proposed.name,
      size: proposed.size,
    },
  });

  //if item does exist return error
  if (exists) {
    const err = Error("Item Already Exists");
    err.status = 400;
    err.message = "Item Already Exists";
    return next(err);
  } else {
    //if item does not exist create new instance for item
    const newProduct = await Product.create(proposed);

    //query new item to confirm it exists
    const prod = await Product.findOne({
      where: {
        name: proposed.name,
        description: proposed.description,
        size: proposed.size,
      },
    });

    //create a new inventory item for your newly created item
     await Inventory.create({
      item_id: prod.id,
      quantity: proposed.quantity,
    });


    return res.json(newProduct);
  }
});


//&--------------------delete product--------------------------------------
router.delete("/:itemId", requireAuth, async (req, res, next) => {
  const id = req.params.itemId;
  //check if item exists
  const item = await Product.findByPk(id);

  //if item exists remove it
  if (item) {
    await item.destroy();

    //return success message
    return res.json({ message: "Successfully Deleted!" });
  } else {
    //if item does not exist return the item not found error
    const err = Error("Product Not Found");
    err.status = 404;
    err.message = "Product Not Found";
    return next(err);
  }
});

//Todo-----------Edit Product---------------------

router.put("/:itemId",ValidateEdit, requireAuth, async (req, res, next) => {
  //pull id from params
  const id = Number(req.params.itemId);
if(req.user.isAdmin || req.user.master){

  //find our item
  const item = await Product.findByPk(id);

  //update it
  const updated = await item.update(req.body, {
    where: {
      id: id,
    },
  });
  //return updated item
  return res.json(updated);
}else{
  const err = Error('Not Authorized');
  err.status=401;
  err.message='Not Authorized';
  return next(err)
}
});

//&-----------------------------------------Get Review by ItemId---------------------------------------
router.get("/:itemId/reviews", async (req, res, next) => {
  // pull id from params
  const id = Number(req.params.itemId);
  //query all reviews
  const reviews = await Review.findAll({

      where: {
        item_id: id
      }
    ,
    include: [
      // include the users name who wrote the review and the createdAt
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },


    ],
  });

const finalRevs = []
  for (let i = 0; i< reviews.length;i++){
    const review = reviews[i];
  const pictures = await Image.findOne({

        where: {
          imageable_id: review.id,
          imageable_type: "Review",
        },
        as: "ReviewImages",
  })


  const rev = {
    id: review.id,
    review: review.review,
    stars: review.stars,
    User: review.User,
    imageUrl: pictures.url,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt
  }
finalRevs.push(rev)
}

  //include the pictures for that review


  if( (reviews.length === 0)){
    const err = Error("Product Not Found");
    err.status = 404;
    err.message = "Product Not Found";
    return next(err);

return
  }else{
    //return all reviews
    return res.json(finalRevs);

  }
});

//&-------------Add review by itemId-------------------

router.post("/:itemId/reviews",validateReview, requireAuth, async (req, res, next) => {
  //get the id and current user that is logged in
  const id = Number(req.params.itemId);
  const user = req.user.id;

  //find the item
  const item = await Product.findByPk(id, {
    include: {
      model: Review,
      where: {
        item_id: id,
      },
    },
  });

  if (item) {
    //if item is found check if it has length to its reviews
    const revs = item.Reviews;

    //if so loop through the reviews to check if user has reviewed this already

    if (revs.length > 0) {
      revs.map((review) => {
        if (review.user_id === user) {
          //if a review is found from the user throw error so they can not do more than 1 per item
          const err = Error("You can Only submit 1 review for this product.");
          err.status = 401;
          err.message = "You can Only submit 1 review for this product.";
          next(err);
        }
      });
    }

    //if not then create the new review
    const newReview = await Review.create({
      user_id: user,
      review: req.body.review,
      stars: req.body.stars,
      item_id: id,
    });

    return res.json(newReview);
  } else {
    //if no item found throw not found error
    const err = Error("Product Not Found");
    err.status = 404;
    err.message = "Product Not Found";
    return next(err);
  }
});

//^-------------Add Image for a product----------------

router.post("/:itemId/images", requireAuth,ValidatePic, async (req, res, next) => {
  if (req.user.isAdmin || req.user.master) {
    //pull product id
    const id = Number(req.params.itemId);

    //search for product by PK
    const item = await Product.findByPk(id);
    //if doesnt exist throw error
    if (!item) {
      const err = Error("Product Not Found");
      err.status = 404;
      err.message = "Product Not Found";
      return next(err);
    }
    //if product does exist then add the new image with body info
    const newImage = Image.create({
      imageable_id: id,
      imageable_type: "Product",
      url: req.body.url,
    });

    //run query for all images with imageable_id with itemId and type of 'Product'
    const allImages = await Image.findAll({
      where: {
        imageable_id: id,
        imageable_type: "Product",
      },
    });

    //return all photos for that product
    return res.json(allImages);
  } else {
    const err = Error("Not Authorized");
    err.status = 401;
    err.message = "Not Authorized";
    return next(err);
  }
});

//^ --------------Delete Product Image by id -----------

router.delete(
  "/:itemId/images/:imageId",
  requireAuth,
  async (req, res, next) => {
    //pull itemid imageId and user status
    if (req.user.isAdmin || req.user.master) {
      const itemId = Number(req.params.itemId);
      const imageId = Number(req.params.imageId);

      //search for the item
      const item = await Product.findByPk(itemId);

      //if not found throw error
      if (!item) {
        const err = Error("Product Not Found");
        err.status = 404;
        err.message = "Product Not Found";
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
          //check that user is admin
          if (!admin) {
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
    } else {
      const err = Error("Not Authorized");
      err.status = 401;
      err.message = "Not Authorized";
      return next(err);
    }
  }
);

//^------------------------------Update preview--------------------------
router.put('/:itemId/images/:imageId',requireAuth,async (req,res,next) =>{
  if (req.user.isAdmin || req.user.master) {
    const itemId = Number(req.params.itemId);
    const imageId = Number(req.params.imageId);

    //search for the item
    const item = await Product.findByPk(itemId);

    //if not found throw error
    if (!item) {
      const err = Error("Product Not Found");
      err.status = 404;
      err.message = "Product Not Found";
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
        //check that user is admin

          //update photo
          const newOne = await image.update(req.body,{
            where: {
              id: imageId
            }
          })
          //return success message
          return res.json(newOne);
        }

    }
  } else {
    const err = Error("Not Authorized");
    err.status = 401;
    err.message = "Not Authorized";
    return next(err);
  }
})


//&----------------- GET ALL SIZES FOR A PRODUCT ----------------------
// router.get('/sizes', async (req,res,next)=>{
// const {message} = res.body

//   res.json(message)
// }) //--------end


module.exports = router;
