const jwt = require("jsonwebtoken");

const User = require("../models/user");

async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const dbUser = await User.findById(decoded.userId);

    if (!dbUser) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Not Authenticated" });
  }
}

function authorizeUserRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized to perform this action" });
    }
    next();
  };
}

module.exports = { authenticateUser, authorizeUserRoles };
