import {Request, Response, NextFunction} from "express"

// authorization middleware
export function authorizeRoles(...allowedRoles: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        // console.log(res)

        // checks if user is authentication. 
        if (!user){
            return res.status(401).json({error: "User not authenticated. "})
        }

        console.log(allowedRoles)
        console.log(user)

        if (!allowedRoles.includes(user.role)){
            return res.status(403).json({error: "User does not have accessForbidden: Insufficient privileges"})
        }

        next();
    }
}