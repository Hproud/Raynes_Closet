express = require('express')
const {Suggestion, User} = require('../../db/models')
const router = express.Router();

/*
   if(admin){
    const newGuy=req.user
    await newGuy.update({isAdmin: false},{
        where: {
            id: req.user.id
        }
    })}else{
        const newGuy=req.user

        await newGuy.update({isAdmin: true},{
            where: {
                id:req.user.id
            }
        })
    }
*/


//&-------------------Get all suggestions----------------------------------------------

router.get('',async (req,res,next)=>{
    //check user status
    const admin = req.user.isAdmin
    
    //if admin find all suggestions
    if(admin){

        //query all suggestions include the user model include only first and last name attribute
        const suggestions = await Suggestion.findAll({
            include: ([{
                model: User,
                attributes: ['firstName','lastName']
            }]),
            attributes: ['id','suggestion']
        })

        //if no suggestions return error
        if (!suggestions){
            const err = Error("No Suggestions Found");
            err.status = 404;
            err.message = "No Suggestions Found"
            return next(err)
        }

        //return data found
        return res.json(suggestions)
    }else{
        //if not admin throw error
        const err = Error("Not Authorized");
        err.status = 401;
        err.message = "Not Authorized";
        return next(err)
    }
    })


    module.exports = router;
