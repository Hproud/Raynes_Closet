express = require('express')
const {Inventory, Product} = require('../../db/models')
const router = express.Router();



//&--------------------Get All Inventory---------------------------
router.get('', async (req,res,next) => {
//query all inventory
    const all = await Inventory.findAll({
        include: {
            model: Product
        }
    })
//create empty array so that you can structure data
const inventory= [];
//loop through your inventory to send the correct structured data to the array
for (let i = 0; i < all.length; i++){
    //set var to pull specific inventory item
    const item = all[i];
    //structure the data the way you want it to show
const final ={
    id: item.id,
    product: {
        name: item.Product.name,
        size: item.Product.size,
        type: item.Product.type,
        quantity: item.Product.quantity
    },
    quantity: item.quantity
}
    //push structured data to  array set for the structured data
    inventory.push(final)
}


//return array made with structured data
    res.json(inventory)
})













module.exports = router;
