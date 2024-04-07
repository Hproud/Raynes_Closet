const express = require("express");
const { Product, Image, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

//TODO--------------------------------------GET ALL PRODUCTS--------------------------------------------

router.get("/", async (req, res, next) => {
  const products = await Product.findAll({
    // attributes: ["id", "name", "description", "size", "price", "type"],
  });

  if(products.length){
    const final = [];

    for (let i = 0; i < products.length; i++){


        const pic = await Image.findOne({
          where: {
            imageable_id: products[i].id,
            imageable_type: 'Product',
            preview: true
          },
          attributes:['id','url','preview']
        })
        const newItem = {
          id: products[i].id,
          name: products[i].name,
          description: products[i].description,
          size: products[i].size,
          price: products[i].price,
          type: products[i].price,
          preview: pic.dataValues.url
        }
        final.push( newItem)

    }

    res.json({products: final});
  }
});



//TODO--------------------------------GET PRODUCT BY ID--------------------------------------------

router.get('/:itemId', async (req, res, next) => {
  // get the id from params
  const id = Number(req.params.itemId)
  //query the db to find the item
  const prod = await Product.findByPk(id,{
    // attributes: ["id", "name", "description", "size", "price", "type"],
    include: ([{model: Image,
      where:{
        imageable_id: id,
        imageable_type: 'Product'
      }},
      {
        model: Review,
        where: {
          item_id : id
        }
      }
    ])
  })
  console.log(prod.dataValues,'this is the prod')
  //query all pictures related to that item
  // return all info for the product to the front end
  res.json({product: prod})

})






































module.exports = router;
