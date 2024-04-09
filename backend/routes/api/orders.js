express = require("express");
const { Order, User, CartItem, Product } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");



//!----------------get current users orders--------------------------------------

router.get("/current", requireAuth, async (req, res, next) => {
  //pull user id
  const id = req.user.id;
  //query all orders where user is curr user
  const orders = await Order.findAll({
    where: {
      user_id: id,
    },
  });

  //if none error
  if (!orders) {
    const err = Error("No Orders Found");
    err.status = 404;
    err.message = "No Orders Found";
    return next(err);
  }
  //create array for structured data

  const completed = [];
  //loop through orders to find the cartitems and details for each order
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    //get contents for cart
    const contents = await CartItem.findAll({
      where: {
        id: order.cart_id,
      },
      include: [
        { model: Product, attributes: ["id", "name", "size", "price"] },
      ],
      attributes: ["id", `quantity`],
    });

    //structure the data you want to see
    const newOrder = {
      id: order.id,
      user: order.user_id,
      // cart_id: order.cart_id,
      cart: contents,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
    completed.push(newOrder);
  }
  //return structured data
  return res.json(completed);
});

//! ------------------get all orders------------------------------
router.get("", requireAuth, async (req, res, next) => {
  const admin = req.user.isAdmin;

  if (admin) {
    // find all orders
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    //create an empty array to put final info in
    const fullOrder = [];
    //loop through orders so you can have info on each order to pull specific info
    for (let i = 0; i < orders.length; i++) {
      //assign order to current order
      const order = orders[i];
      //get contents for cart
      const contents = await CartItem.findAll({
        where: {
          id: order.cart_id,
        },
        include: [{ model: Product }],
      });

      //set data up how you would like it to show on your return
      const specificOrder = {
        id: order.id,
        user: order.User,
        cart_id: order.cart_id,
        cart: contents,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
      // pust structured data to the array you created
      fullOrder.push(specificOrder);
    }
    //return structured array you created
    return res.json(fullOrder);
  } else {
    const err = Error("Forbidden");
    err.status = 401;
    err.message = "Forbidden";
    return next(err);
  }
});

//!---------------Update Order status by Id--------------

router.put("/:orderId", requireAuth, async (req, res, next) => {
  //pull order Id and user status
  const id = req.params.orderId;
  const admin = req.user.isAdmin;

  // check that user is an admin
  if (admin) {
    //search for Order
    const order = await Order.findByPk(id);
    //if no order return error
    if (!order) {
      const err = Error("No Order Found");
      err.status = 404;
      err.message = "No Order Found";
      return next(err);
    }

    //update order with new status
    await order.update(req.body, {
      where: {
        id: id,
      },
    });

    //return the order updated
    return res.json(order);
  } else {
    //if not admin throw error
    const err = Error("Forbidden");
    err.status = 401;
    err.message = "Forbidden";
    return next(err);
  }
});

module.exports = router;
