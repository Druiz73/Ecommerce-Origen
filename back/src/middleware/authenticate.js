import config from "./config";
import jwt, { verify } from "jsonwebtoken";

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["auth"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(bearerHeader, config.key, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // forbidden
    console.log("else");
    res.json({ mensaje: "No Autorizado" });
  }
}

export default verifyToken;
