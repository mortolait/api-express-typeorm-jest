import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import { env } from '../../env/env';

interface AuthRequest extends Request {
    user?: string | object;
  }

export function exampleMiddleware(req:AuthRequest,res:Response, next:NextFunction){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({ message: "Access denied. No token provided"})
    }

    try {
        const decoded = jwt.verify(token,env.JWT_SECRET)
        req.user = decoded
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
    next()
    
}

