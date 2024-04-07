const { CgProductHunt } = require("react-icons/cg");
const { Cart, CartItem, Image, Product } = require("../../db/models");
const express = require("express");

const router = express.Router();

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
    console.log(prodInfo, "found product-*-*-*-*-*-*-*-*-*-*-*-*-*");
    prods.push(prodInfo);
  }

  res.json({
    cart_id: newcart.id,
    items: prods,
  });
});

module.exports = router;
