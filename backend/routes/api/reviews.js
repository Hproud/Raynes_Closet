express = require('express')
const {Review,User,Product,Image} = require('../../db/models')
const router = express.Router();

//&-------------------------------------------Get All Reviews----------------------------------------

router.get('', async (req,res,next) => {
    const reviews = await Review.findAll({
        include:([{model: User,
        attributes: ['firstName','lastName']
        },
        {
            model: Product,
            attributes: ['name',"size"]
        },
        {
            model: Image,
            where: {
                imageable_type: "Review"
            },
            as: 'ReviewImages'
        },
    ]),
    attributes: ['id','review','stars']
    })

    res.json(reviews)
})



module.exports = router;
