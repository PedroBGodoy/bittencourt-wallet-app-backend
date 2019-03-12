const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(id) {
  const token = jwt.sign({ id: id }, process.env.secret, {
    expiresIn: 86400
  });

  return token;
}

module.exports = {
  async register(req, res) {
    const { email } = req.body;

    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: "Este usuário já existe!" });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({ user, token: generateToken(user.id) });
    } catch (err) {
      return res.status(400).send({ error: "Falha no registro" });
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).send({ error: "Usuário não encontrado!" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: "Senha inválida!" });
      }

      user.password = undefined;

      res.send({ user, token: generateToken(user.id) });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        error: "Ocorreu um erro nos servidores. Tente novamente mais tarde!"
      });
    }
  }
};
