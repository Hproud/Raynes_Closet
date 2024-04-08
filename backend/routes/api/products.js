const express = require("express");
const { Product, Image, Review, Inventory, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

//TODO--------------------------------------GET ALL PRODUCTS--------------------------------------------

router.get("", async (req, res, next) => {
  const products = await Product.findAll({
    // attributes: ["id", "name", "description", "size", "price", "type"],
  });

  if (products.length) {
    const final = [];

    for (let i = 0; i < products.length; i++) {
      const pic = await Image.findOne({
        where: {
          imageable_id: products[i].id,
          imageable_type: "Product",
          preview: true,
        },
        attributes: ["id", "url", "preview"],
      });
      const newItem = {
        id: products[i].id,
        name: products[i].name,
        description: products[i].description,
        size: products[i].size,
        price: products[i].price,
        type: products[i].price,
        preview: pic.dataValues.url,
      };
      final.push(newItem);
    }

    res.json({ products: final });
  }
});

//TODO--------------------------------GET PRODUCT BY ID--------------------------------------------

router.get("/:itemId", async (req, res, next) => {
  // get the id from params
  const id = Number(req.params.itemId);
  //query the db to find the item
  const prod = await Product.findByPk(id, {
    // attributes: ["id", "name", "description", "size", "price", "type"],
    include: [
      {
        model: Image,
        where: {
          imageable_id: id,
          imageable_type: "Product",
        },
      },
      {
        model: Review,
        where: {
          item_id: id,
        },
      },
    ],
  });
  console.log(prod.dataValues, "this is the prod");
  //query all pictures related to that item
  // return all info for the product to the front end
  res.json({ product: prod });
});

//Todo-----------------------------------------ADD A PRODUCT---------------------------------------------------------------

router.post("", requireAuth, async (req, res, next) => {
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
    next(err);
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
    const newInventory = await Inventory.create({
      item_id: prod.id,
      quantity: proposed.quantity,
    });
    // console.log(newProduct,'this is my new product')

    res.json(newProduct);
  }
  return;
});

router.delete("/:itemId", requireAuth, async (req, res, next) => {
  const id = req.params.itemId;
  //check if item exists
  const item = await Product.findByPk(id);

  //if item exists remove it
  if (item) {
    await item.destroy();

    //return success message
    res.json({ message: "Success" });
  } else {
    //if item does not exist return the item not found error
    const err = Error("Product Not Found");
    err.status = 404;
    err.message = "Product Not Found";
    next(err);
  }

  return;
});

//Todo-----------Edit Product---------------------

router.put("/:itemId", requireAuth, async (req, res, next) => {
  //pull id from params
  const id = Number(req.params.itemId);

  //find our item
  const item = await Product.findByPk(id);

  //update it
  const updated = await item.update(req.body, {
    where: {
      id: id,
    },
  });
  //return updated item
  res.json(updated);
});

//&-----------------------------------------Get Review by ItemId---------------------------------------
router.get("/:itemId/reviews", async (req, res, next) => {
  // pull id from params
  const id = Number(req.params.itemId);

  //query all reviews
  const reviews = await Review.findAll({
    include: [
      // include the users name who wrote the review and the createdAt
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },

      //include the pictures for that review
      {
        model: Image,
        where: {
          imageable_id: id,
          imageable_type: "Review",
        },
        as: "ReviewImages",
      },
    ],
  });

  //return all reviews
  res.json(reviews);
});

//&-------------Add review by itemId-------------------

router.post("/:itemId/reviews", async (req, res, next) => {
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

    res.json(newReview);
  } else {
    //if no item found throw not found error
    const err = Error("Product Not Found");
    err.status = 404;
    err.message = "Product Not Found";
    return next(err);
  }

  return;
});





//^-------------Add Image for a product----------------

router.post('/:itemId/images',requireAuth, async (req,res,next) => {
//pull product id
const id = Number(req.params.itemId)

//search for product by PK
const item = await Product.findByPk(id)
//if doesnt exist throw error
if(!item){
  const err = Error("Product Not Found");
  err.status = 404;
  err.message= "Product Not Found"
  return next(err)
}
//if product does exist then add the new image with body info
const newImage = Image.create({
  imageable_id: id,
  imageable_type: 'Product',
  url: req.body.url
})

//run query for all images with imageable_id with itemId and type of 'Product'
const allImages = await Image.findAll({
  where:{
    imageable_id: id,
    imageable_type: 'Product'
  }
})
//return all photos for that product


  res.json(allImages)
})


//^ --------------Delete Product Image by id -----------

router.delete('/:itemId/images/:imageId',requireAuth, async (req,res,next) => {
  //pull itemid imageId and user status

  const itemId = Number(req.params.itemId);
  const imageId = Number(req.params.imageId)
  const admin = req.user.isAdmin

  //search for the item
const item = await Product.findByPk(itemId);

//if not found throw error
if(!item){
  const err = Error("Product Not Found");
  err.status = 404;
  err.message= "Product Not Found"
  return next(err)
}else{
  //search for the picture
  const image = await Image.findByPk(imageId);
  if (!image){
    //if not found throw error
    const err = Error("Image Not Found");
    err.status = 404;
    err.message= "Image Not Found"
    return next(err)
  }
  if(image){
    //!check that user is admin
    if(!admin){
      const err = Error("Not Authorized");
      err.status = 401;
      err.message= "Not Authorized"
      return next(err)
    }else{
      //delete photo
      await image.destroy();
      //return success message
      res.json("Successfully Deleted!")
    }
  }
}
return
})



module.exports = router;
