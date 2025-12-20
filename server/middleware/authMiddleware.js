import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // Remove "Bearer " if it's there (standard practice)
    const tokenString = token.replace("Bearer ", "");
    
    const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = verified; // Add user info to the request
    next(); // Pass them to the next step
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};