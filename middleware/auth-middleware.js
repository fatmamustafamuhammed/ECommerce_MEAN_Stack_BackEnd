import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({
      error: "Access Denied",
    });
  }
  try {
    const decode = jwt.verify(token, "seceret");
    console.log(decode);
    next();
  } catch (err) {
    return res.satus(401).send({
      error: "Invalid Token",
    });
  }
}

export { verifyToken };
