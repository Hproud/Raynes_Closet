const { requireAuth } = require("../../utils/auth");

const { Cart, CartItem, Image, Product } = require("../../db/models");
const express = require("express");

const router = express.Router();



//&------------------------GET ALL CARTS---------------------------------------------------------------------------
router.get("", async (req, res, next) => {
  // find the cart that is not purchased //! ADD USER LATER===============
  let cart = await Cart.findOne({
    where: {
      purchased: false,
    },
  });
  const newcart = cart.dataValues;
  const items = await CartItem.findAll({
    where: {
      cart_id: newcart.id,
    },
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
      },
    ],
  });
  const prods = [];
  for (let i = 0; i < items.length; i++) {
    const p = items[i];
    const item = p.dataValues;
    console.log(item, "this is from the cart=======================");
    const prodInfo = await Product.findOne({
      where: {
        id: item.item_id,
      },
      include: [
        {
          model: Image,
          where: {
            imageable_type: "Product",
            preview: true,
          },
        },
      ],
    });
    // console.log(prodInfo, "found product-*-*-*-*-*-*-*-*-*-*-*-*-*");
    prods.push(prodInfo);
  }

  res.json({
    cart_id: newcart.id,
    items: prods,
  });
});


//&------------add a cart Item--------------------------------

router.post("/items",requireAuth, async(req,res,next) => {
  // get user id
  //check for any cart not purchased;
  //if cart is found return error
  //if no cart is found create an cart
  //pull the new cart id
  //create a new cart item
  //query full cart
  //return full cart
  res.json('hit')
})







module.exports = router;
