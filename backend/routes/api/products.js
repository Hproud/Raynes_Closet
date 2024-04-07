const express = require('express');
const {Product} =require('../../db/models')
const {requireAuth} = require('../../utils/auth')


const router = express.Router()

//TODO--------------------------------------GET ALL PRODUCTS--------------------------------------------

router.get('/',async (req,res,next)=>{

  const prod = await Product.findAll()
    res.json({products: prod})
})









module.exports = router
