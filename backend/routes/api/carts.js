const { requireAuth } = require("../../utils/auth");

const { Cart, CartItem, Image, Product } = require("../../db/models");
const express = require("express");

const router = express.Router();

//&------------------------GET ALL CARTS---------------------------------------------------------------------------
router.get("", requireAuth, async (req, res, next) => {

  let cart = await Cart.findOne({
    where: {
      user_id: req.user.id,
      purchased: false,
    },
  });
  if(!cart.length){
    const err = Error("Cart Not Found")
    err.status = 404;
    err.message = "Cart Not Found"
  }
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

    prods.push(prodInfo);
  }

  return res.json({
    cart_id: newcart.id,
    items: prods,
  });
});

//&------------add a cart Item--------------------------------

router.post("", requireAuth, async (req, res, next) => {
  // get user id
  const user = req.user.id;

  //check for any cart not purchased;
  const cart = await Cart.findAll({
    where: {
      user_id: user,
      purchased: false,
    },
  });

  //if cart is found return error
  if (cart.length) {
    const err = Error("User has an active cart.");
    err.status = 400;
    err.message = "User has an Active Cart";
    return next(err);
  } else {
    //if no cart is found create an cart
    const newCart = await Cart.create({
      user_id: user,
    });
    //pull the new cart id
    console.log(newCart);

    //return new cart
    return res.json(newCart);
  }
});

//&-----------add item to cart---------------------

router.post("/:cartId/items", requireAuth, async (req, res, next) => {
  //get user id and cartId
  const user = req.user.id;
  const cart = req.params.cartId;

  //destructure req. body
  const { item_id, size, price, quantity } = req.body;

  //check if item in cart already
  const item = await CartItem.findOne({
    where: {
      cart_id: cart,
      item_id: item_id,
    },
  });

  //throw error if it is in cart
  if (item) {
    const err = Error("Item already in cart");
    err.status = 400;
    err.message = "Item already in cart";
    return next(err);
  } else {
    //if not in cart already create cartitem with req.body
    const newItem = await CartItem.create({
      cart_id: cart,
      user_id: user,
      item_id: item_id,
      size: size,
      price: price,
      quantity: quantity,
    });

    //return new cartItem;
    return res.json(newItem);
  }
});

//&------------edit cart Item----------------------------

router.put("/:cartId/items/:itemId", requireAuth, async (req, res, next) => {
  //pull itemId and cartId and proposed quantity update
  const { itemId, cartId } = req.params;
  const { quantity } = req.body;
  //search for that item in the cart
  const item = await CartItem.findOne({
    where: {
      cart_id: cartId,
      item_id: itemId,
    },
  });

  //if not found throw error
  if (!item) {
    const err = Error("Item Not In Cart");
    err.status = 404;
    err.message = "Item Not In Cart";
    return next(err);
  } else {
    //if found update quantity
    await item.update(
      { quantity: quantity },
      {
        where: {
          cart_id: cartId,
        },
      }
    );
    //return updated cartitem
    return res.json(item);
  }
});

//&----------------------------delete cartItem ---------------------------------
router.delete("/:cartId/items/:itemId", requireAuth, async (req, res, next) => {
  //get cartId and Item id from params and user from req.user
  const cartId = Number(req.params.cartId);
  const itemId = Number(req.params.itemId);
  const userId = req.user.id;
  //search cart
  const cart = await Cart.findByPk(cartId);
  //if no cart throw error
  if (!cart) {
    const err = Error("Cart Not Found");
    err.status = 404;
    err.message = "Cart Not Found";
    return next(err);
  } else {
    //check user is owner of cart
    if (cart.user_id !== userId) {
      //if not throw error
      const err = Error("Forbidden");
      err.status = 401;
      err.message = "Forbidden";
      return next(err);
    } else {
      //search for item
      const item = await CartItem.findOne({
        where: {
          item_id: itemId,
          cart_id: cartId,
        },
      });

      //if not found throw error
      if (!item) {
        const err = Error("Item Not Found");
        err.status = 404;
        err.message = "Item Not Found";
        return next(err);
      } else {
        //if found delete item
        await item.destroy();
        //return success message
        return res.json("Successfully Deleted!");
      }
    }
  }
});

//&---------------------Delete Cart---------------------------

router.delete("/:cartId", requireAuth, async (req, res, next) => {
  //pull user id
  const user = req.user.id;
  //pull cartId
  const cartId = Number(req.params.cartId);

  //search for cart
  const cart = await Cart.findByPk(cartId);
  //if not found throw error
  if (!cart) {
    const err = Error("Cart Not Found");
    err.status = 404;
    err.message = "Cart Not Found";
    return next(err);
    //if cart then check that user owns cart
  } else if (cart.user_id !== user) {
    //if not throw error
    const err = Error("Forbidden");
    err.status = 401;
    err.message = "Forbidden";
    return next(err);
  } else {
    //if user owns delete cart
    await cart.destroy();
    //return success message
    return res.json("Successfully Deleted!");
  }
});













module.exports = router;
