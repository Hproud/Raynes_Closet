const express = require('express');
const bcrypt= require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors}= require('../../utils/validation')
const {setTokenCookie, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models')
// const {Op} = require('sequelize')
const router = express.Router();

const validateSignUp = [
    check('firstName')
    .trim()
    .exists({checkFalsy: true})
    .withMessage('First Name is required.'),
    check('lastName')
    .trim()
    .exists({checkFalsy: true})
    .withMessage('Last Name is required.'),
    check('email')
    .isEmail()
    .withMessage('Invalid email.'),
    check('username')
    .trim()
    .exists({ checkFalsy: true})
    .isLength({min: 4})
    .withMessage('Username is required.'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username is required.'),
    check('password')
    .exists({ checkFalsy: true })
    .isLength({min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    check('zipcode')
    .isLength({min: 5, max: 5})
    .withMessage('ZipCode Must be 5 digits long'),
    check(`address`)
    .trim()
    .exists({ checkFalsy: true})
    .withMessage('Address is required'),
    check('city')
    .trim()
    .exists({checkFalsy: true})
    .withMessage('City is Required'),
    check('state')
    .trim()
    .exists({checkFalsy: true})
    .withMessage('State is Required'),
    handleValidationErrors
];


router.post('/', validateSignUp, async (req,res,next)=>{
    const {email, password, username, firstName, lastName, address,city,state,zipcode} = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const isEmail = await User.findOne({
        where:{
            email: email,
        }
    });
    const isusername = await User.findOne({
        where:{
            username: username
        }
    });

if(isEmail){
        const err = new Error('User already exists');
         err.status = 500
         err.errors = {
        email: 'User with that email already exists',
         }
        next(err)
    }else if(isusername){
            const err = new Error('User already exists');
            err.status = 500
            err.errors = {
                 username: 'User with that username already exists'
            }
            next(err)



}else{


       const user = await User.create({firstName,lastName,email,username,hashedPassword,address,city,state,zipcode});

       const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        isAdmin: user.isAdmin,
        isMaster: user.master
      };

            await setTokenCookie(res, safeUser);

            return res.json({
                user:safeUser,
            })

}






}
)

module.exports = router;
