import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role:string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenFromCookie = req.cookies?.token;

    const authHeader = req.headers.authorization;
    const tokenFromHeader =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ error: "Access denied. mmmmNo token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    (req as any).user = decoded;

    next();
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    }

    return res.status(500).json({ error: "Authentication failed due to a server error." });
  }
}
