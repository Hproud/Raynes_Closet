express = require('express')
const {Suggestion, User} = require('../../db/models')
const { requireAuth } = require("../../utils/auth");

const router = express.Router();


//&-------------------Get all suggestions----------------------------------------------

router.get('',requireAuth,async (req,res,next)=>{
    //check user status
    const admin = req.user.isAdmin
    const user = req.user.id;
    //if admin find all suggestions


        if(admin || req.user.master){

            //query all suggestions include the user model include only first and last name attribute
            const suggestions = await Suggestion.findAll({
                include: ([{
                    model: User,
                    attributes: ['firstName','lastName']
                }]),
                // attributes: ['id','suggestion']
            })
            // console.log('hit this guy')

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
            const suggestions = await Suggestion.findAll({
                where: {
                    user_id: user
                }
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

        }

    })


    //&----------------Write a Suggestion---------------

    router.post('',requireAuth,async (req,res,next) =>{
        //grab user id and status
        const userId = req.user.id;
        const admin = req.user.isAdmin
        //grab suggestion from req.body
        const {suggestion} = req.body
 if(suggestion.length === 0 || !suggestion){
    const err = Error("You must enter a suggestion");
    err.status=401;
    err.message="You must enter a suggestion"
    return next(err)
 }
        //if admin throw error
        if(admin){
            const err = Error("Admins Can Not Submit Suggestions");
            err.status=401;
            err.message="Admins Can Not Submit Suggestions"
            return next(err)
        }else{

            //check to make sure suggestion doesnt exist
            const possible = await Suggestion.findOne({
                where:{
                    user_id: userId,
                    suggestion: suggestion
                }
            });
            //if does throw error
            if(possible){
                //make sure user is NOT an Admin
                const err = Error('You Have Already Submitted this suggestion');
                err.status = 400;
                err.message='You Have Already Submitted this suggestion'
                return next(err)
            }else{
                //if not admin create new suggestion
                const newSugg = await Suggestion.create({
                    user_id: userId,
                    suggestion: suggestion
                })
                //return new Suggestion
                return res.json(newSugg)
            }
        }
    })


    //&------------------Edit Suggestion------------------
router.put('/:suggestionId',requireAuth,async (req,res,next) => {
    //get suggestionId
    const id = req.params.suggestionId;
    //get user id
    const user = req.user.id;
    // search for suggestion
    const sugg = await Suggestion.findByPk(id);

    //if not found throw error
    if(!sugg){
        const err = Error("No Suggestion Found");
        err.status = 404;
        err.message="No Suggestion Found"
        return next(err)
    }else{
        //confirm user wrote suggestion
        //if not throw error
        if(sugg.user_id !== user){
            const err = Error("Not Authorized");
            err.status = 401;
            err.message = "Not Authorized";
            return next(err)
        }else{
            //if belongs to user then update
            await sugg.update(req.body,{
                where:{
                    id: id
                }
            })

            //return new suggestion
            return res.json(sugg)
        }
    }
})



//&---------------Delete suggestion------------------------
router.delete('/:suggestionId',requireAuth,async (req,res,next) => {
    //get suggestionId
    const id = req.params.suggestionId;
    //get user id
    const user = req.user.id;
    // search for suggestion
    const sugg = await Suggestion.findByPk(id);

    //if not found throw error
    if(!sugg){
        const err = Error("No Suggestion Found");
        err.status = 404;
        err.message="No Suggestion Found"
        return next(err)
    }else{
        //confirm user wrote suggestion
        //if not throw error
        if(sugg.user_id !== user){
            const err = Error("Not Authorized");
            err.status = 401;
            err.message = "Not Authorized";
            return next(err)
        }else{
            //if belongs to user then update
            await sugg.destroy()

            //return new suggestion
            return res.json("Successfully Deleted")
        }
    }
})


router.get('/:suggestionId', requireAuth, async (req,res,next) =>{
    const id = req.params.suggestionId
    const suggestion = await Suggestion.findByPk(id)

    if(!suggestion){
        const err = Error('Suggestion Not Found')
        err.status = 404
        err.message = 'Suggestion Not Found'
        return next(err)
    }

    res.json(suggestion)
})



    module.exports = router;
