import {ZodError, ZodType} from 'zod';
import {Request, Response, NextFunction} from 'express';

export const validate=(schema:ZodType)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try{
            const validatedData=await schema.parseAsync(req.body);
            req.body=validatedData;
            next();
    } catch(error){
        if(error instanceof ZodError){
            return res.status(400).json({
                success:false,
                message:'Datos invalidos',
                errores:error.issues.map(err=>({
                    field:err.path.join('.'),
                    message:err.message
                }))
            });
        }
        return next(error)
    }
};
};