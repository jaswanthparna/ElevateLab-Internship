import Joi from 'joi';

export const signUpValidation = (req,res,next)=>{
    const schema  =Joi.object({
        name:Joi.string().max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(30).required(),
    });
    const {error} = schema.validate(req.body)

    if(error){
        return res.status(400).json({
            message:error.details[0].message,
            success: false,
            error: true,
        });
    }
    next();


}

export const loginValidation = (req,res,next)=>{
    const schema  =Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(30).required(),
    });
    const {error} = schema.validate(req.body)

    if(error){
        return res.status(400).json({
            message:error.details[0].message,
            success: false,
            error: true,
        });
    }
    next();


}