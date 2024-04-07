const {Cart,CartItem} = require('../../db/models')
const express = require('express')

const router = express.Router();


router.get('/', async (req,res,next) => {
    const cart = await Cart.findOne({
        where:{
            purchased: false
        }
    })
    res.json(cart)
})
























module.exports = router
