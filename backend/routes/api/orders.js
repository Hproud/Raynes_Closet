express = require('express')
const {Order,User} = require('../../db/models')
const router = express.Router();
const { requireAuth } = require("../../utils/auth");



router.get('', async (req,res,next) => {
// find all orders
    const orders = await Order.findAll({
        include:{model: User,
        attributes: ['firstName','lastName']}
    });
    //create an empty array to put final info in
    const fullOrder = []
    //loop through orders so you can have info on each order to pull specific info
    for(let i=0; i < orders.length; i++){
        //assign order to current order
        const order = orders[i];
        //set data up how you would like it to show on your return
        const specificOrder ={
            id: order.id,
            user: order.User,
            cart_id: order.cart_id,
            total: order.total,
            status: order.status
        }
        // pust structured data to the array you created
        fullOrder.push(specificOrder)
    }
    //return structured array you created
   return res.json(fullOrder)
})











module.exports = router;
