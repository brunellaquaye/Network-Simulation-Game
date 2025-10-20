import {Request, Response, NextFunction} from "express"

// authorization middleware
export function authorizeRoles(...allowedRoles: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        // checks if user is authentication. 
        if (!user){
            return res.status(401).json({error: "User not authenticated. "})
        }

        if (!allowedRoles.includes(user.role)){
            return res.status(403).json({error: "User is not forbidden, does not have access"})
        }

        next();
    }
}