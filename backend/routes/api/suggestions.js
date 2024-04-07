express = require('express')
const {Suggestion, User} = require('../../db/models')
const router = express.Router();


//&-------------------Get all suggestions----------------------------------------------

router.get('',async (req,res,next)=>{
    //query all suggestions include the user model include only first and last name attribute
    const suggestions = await Suggestion.findAll({
        include: ([{
            model: User,
        attributes: ['firstName','lastName']
        }]),
        attributes: ['id','suggestion']
    })
    //return data found
    res.json(suggestions)
})


module.exports = router;
