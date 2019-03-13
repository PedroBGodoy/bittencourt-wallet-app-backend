const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Não foi fornecido um Token" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({ error: "Token formatado incorretamente" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token formatado incorretamente" });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token inválido" });
    }

    req.body.userId = decoded.id;

    return next();
  });
};
