import Joi from 'joi'



const addCategoryVaildtion=Joi.object({
    name:Joi.string().min(1).max(50).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg',).required(),
        filename:Joi.string().required(),
        destination:Joi.string().required(),
        size:Joi.number().max(5242880).required(),
        path:Joi.string().required()
    }).required()
    
})

export{
    addCategoryVaildtion
}
