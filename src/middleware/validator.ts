import { Request, Response, NextFunction  } from 'express';
import Joi from 'joi';

const deviceSchema = Joi.object({
  id: Joi.forbidden(),
  name: Joi.string().min(3).max(30).required(),
  type: Joi.string().required(),
  pingRate: Joi.number().min(1).max(100).optional(),
  latency: Joi.number().min(0).max(1000).optional(),
  trafficLoad: Joi.number().min(0).max(100).optional(),
  status: Joi.string().valid("online", "offline").optional(),
  scenarioId: Joi.number().integer().required()
})




export function deviceValidator ( req:Request, res:Response, next:NextFunction) {
    const {error} = deviceSchema.validate(req.body)
    if(error) return next(error)
    next()
}