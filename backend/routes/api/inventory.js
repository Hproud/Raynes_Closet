express = require('express')
const {Inventory, Product} = require('../../db/models')
const router = express.Router();
const { requireAuth } = require("../../utils/auth");


//~--------------------Get All Inventory---------------------------
router.get('', requireAuth, async (req,res,next) => {
    if(user.isAdmin){

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
        return res.json(inventory)
    }else{
        const err= Error("Forbidden")
        err.status = 401;
        err.message = "Forbidden"
        return next(err)
    }
})


//~-------------Get inventory of single item--------

router.get('/:itemId',requireAuth, async (req,res,next) => {
    //check if user is an admin
    if(req.user.isAdmin){

        //pull item id
        const id = Number(req.params.itemId)

        //check that item exists
        const item = await Product.findByPk(id);

        //if not throw error
        if(!item){
            const err = Error("Product Not Found");
            err.status = 404;
            err.message= "Product Not Found"
            return next(err)
        }


        //search inventory for itemId include products model
        const inventoried = await Inventory.findOne({
            where: {
                item_id: id
            },
            include:([{
                model: Product,
                attributes: ["name","size"]
            }]),
            attributes: ['quantity']
        })


        //return inventory for that item
        return  res.json(inventoried)
    }else{ const err= Error("Forbidden")
    err.status = 401;
    err.message = "Forbidden"
    return next(err)}
    })



//~--------------Update quantity in iventory------------

router.put('/:itemId',requireAuth, async (req,res,next) =>{
    //pull itemId
    const id = req.params.itemId
    //pull user status

    const admin = req.user.isAdmin
    //check that item exists
    const item = await Product.findByPk(id);
  //if not throw error
if(!item){
    const err = Error("Product Not Found");
    err.status = 404;
    err.message= "Product Not Found"
    return next(err)
}


//if not admin throw error
if(!admin){
    const err = Error("Forbidden");
    err.status = 401;
    err.message= "Forbidden"
    return next(err)
}
    //update quantity of item
    const inventory = await Inventory.findOne({
        where:{
            item_id: id
        }
    });
    await inventory.update(req.body,{where:{item_id: id}})
    //return the updated inventory
    return res.json(inventory)
})






module.exports = router;
