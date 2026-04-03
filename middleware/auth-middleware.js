import jwt from "jsonwebtoken";
// Who are you?
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ error: "Access Denied" });
  }
  try {
    const decode = jwt.verify(token, "secret");
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid Token" });
  }
}

// What is your Role?
function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({ error: "Forbidden" });
  }
}

export { verifyToken, isAdmin };
