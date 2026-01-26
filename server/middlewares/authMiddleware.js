import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");

  if (!token) {
    req.user = null; 
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, type }
  } catch (err) {
    req.user = null;
  }
  next();
};


// User-only access
export const requireUser = (req, res, next) => {
  if (!req.user?.userId) {
    return res.status(403).json({ msg: "User access only" });
  }
  req.userId = req.user.userId;
  next();
};

// Admin-only access
export const requireAdmin = (req, res, next) => {
  if (!req.user?.adminId) {
    return res.status(403).json({ msg: "Admin access only" });
  }
  req.adminId = req.user.adminId;  
  next();
};