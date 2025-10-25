import { Request, Response, NextFunction  } from 'express';
import Joi from 'joi';

/* DEVICE VALIDATION*/
const deviceSchema = Joi.object({
  id: Joi.forbidden(),
  name: Joi.string().min(3).max(30).required(),
  type: Joi.string().required(),
  ipAddress: Joi.string().ip({ version: ['ipv4', 'ipv6'] }).optional(),
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


/* SCENARIO VALIDATION*/
const scenarioSchema = Joi.object({
    id: Joi.forbidden(),
    name: Joi.string().min(3).required(),
    difficulty: Joi.string().valid('easy','medium','hard'),
    timeLimit: Joi.number().required(),
    userId: Joi.number()
})

export function scenarioValidator ( req:Request, res:Response, next:NextFunction) {
    const {error} = scenarioSchema.validate(req.body)
    if(error) return next(error);
    next()
}


/* authentication validator*/
const UserSchema = Joi.object({
  id: Joi.forbidden(),
  username: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("player","admin").required(),
  password: Joi.string().required()
})


export function userValidator (req: Request, res: Response, next: NextFunction){
  const {error} = UserSchema.validate(req.body)
  if(error) return next(error);
  next()

}

const UserSigninSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("player", "admin").optional(),
});

export function signinValidator(req: Request, res: Response, next: NextFunction) {
  const { error } = UserSigninSchema.validate(req.body);
  if (error) return next(error);
  next();
}