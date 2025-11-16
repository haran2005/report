// server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ──────────────────────────────────────────────────────────────
// 1. Extend Express Request with user payload
// ──────────────────────────────────────────────────────────────
export interface JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// ──────────────────────────────────────────────────────────────
// 2. Middleware
// ──────────────────────────────────────────────────────────────
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get token from: "Authorization: Bearer <token>"
  const authHeader = req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return void res.status(401).json({ message: 'No token, access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded; // Now typed!
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;