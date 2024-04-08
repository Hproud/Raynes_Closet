const express = require("express");
const { Product, Image, Review, Inventory } = require("../../db/models");
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






router.delete('/:itemId', requireAuth, async (req,res,next) => {
  const id = req.params.itemId
  //check if item exists
 const item = await Product.findByPk(id)


  //if item exists remove it
if(item){
  await item.destroy()

  //return success message
  res.json({message: 'Success'})
}else{

  //if item does not exist return the item not found error
const err = Error('Product Not Found');
err.status = 404;
err.message = 'Product Not Found';
next(err)
}

return
})



//Todo-----------Edit Product---------------------

router.put('/:itemId',requireAuth,async (req,res,next) =>{
  //pull id from params
  const id = Number(req.params.itemId)

  //find our item
  const item = await Product.findByPk(id);
  console.log(item)

  //update it
  const updated = await item.update(req.body,{
    where: {
      id: id
    }
  })
//return updated item
  res.json(updated)
})




module.exports = router;
