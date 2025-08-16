import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const header = req.header('Authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing Bearer token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
