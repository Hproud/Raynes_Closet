const { requireAuth } = require("../../utils/auth");
const {User} = require('../../db/models')

const express = require("express");



const router = express.Router();

router.put('',requireAuth, async (req,res,next)=>{
    //confirm user is master
    const master = req.user.master
    //if not throw auth err
    if(!master){
        const err = Error("Not Authorized");
        err.status = 401;
        err.message = "Not Authorized";
        return next(err)
    }else{
        //if is master find person by given info
        const employee = await User.findOne({
            where: req.body
        })
        //if no employee found throw error
        if(!employee){
            const err = Error("No Employee Found");
            err.status = 404;
            err.message = "No Employee Found";
            return next(err)
        }else{
            //update that users isAdmin status
            await employee.update({isAdmin: true},{
                where: req.body
            })
            //return that user
            return res.json(`Admin status granted for employee ${(req.body.firstName)} ${req.body.lastName}`)
        }
    }
})




router.delete('',requireAuth, async (req,res,next)=>{
    //confirm user is master
    const master = req.user.master
    //if not throw auth err
    if(!master){
        const err = Error("Not Authorized");
        err.status = 401;
        err.message = "Not Authorized";
        return next(err)
    }else{
        //if is master find person by given info
        const employee = await User.findOne({
            where: req.body
        })
        //if no employee found throw error
        if(!employee){
            const err = Error("No Employee Found");
            err.status = 404;
            err.message = "No Employee Found";
            return next(err)
        }else{
            //update that users isAdmin status
            await employee.update({isAdmin: false})
            //return that user
            return res.json(`Admin status removed for employee ${(req.body.firstName)} ${req.body.lastName}`)
        }
    }
})

module.exports = router
