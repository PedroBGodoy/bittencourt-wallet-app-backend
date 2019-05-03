const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(id) {
  const token = jwt.sign({ id: id }, process.env.secret, {});

  return token;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  async register(req, res) {
    const { email, name, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send({ error: "Email inválido!" });
    }

    if (name === null || name === undefined || name.trim() === "") {
      return res.status(400).send({ error: "Nome não pode ser nulo!" });
    }

    if (password === null || password === undefined || password.trim() === "") {
      return res.status(400).send({ error: "Senha não pode ser nula" });
    }

    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: "Este usuário já existe!" });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.status(200).send({ user, token: generateToken(user.id) });
    } catch (err) {
      return res.status(400).send({ error: "Falha no registro" });
    }
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send({ error: "Email inválido!" });
    }

    if (password === null || password === undefined || password.trim() === "") {
      return res.status(400).send({ error: "Senha não pode ser nula" });
    }

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).send({ error: "Usuário não encontrado!" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: "Senha inválida!" });
      }

      user.password = undefined;

      res.status(200).send({ user, token: generateToken(user.id) });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        error: "Erro interno. Por favor tente novamente mais tarde!"
      });
    }
  }
};
