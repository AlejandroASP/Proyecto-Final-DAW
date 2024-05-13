import express from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../app.js";
import { sha1 } from "js-sha1";
import User from "../../models/user.js";

const JWT_SECRET = "mysecretkey";
const router = express.Router();

// Iniciar sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    logger.error("Usuario o contraseña indefinidos");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  const user = await User.findOne({
    where: {
      usuario: username,
      contraseña: sha1(password),
    },
  });

  if (!user) {
    logger.error("Usuario o contraseña incorrectos");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.usuario }, JWT_SECRET, {
    expiresIn: "2h",
  });

  logger.info(`Usuario ${user.usuario} ha iniciado sesión`);
  res.json({ token });
});

// Cambiar contraseña
router.put("/change-password", async (req, res) => {
  const { username, password, newPassword } = req.body;
  
  if (
    username === undefined ||
    password === undefined ||
    newPassword === undefined
  ) {
    logger.error("Usuario o contraseña indefinidos");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  const user = await User.findOne({
    where: {
      usuario: username,
      contraseña: sha1(password),
    },
  });

  if (!user) {
    logger.error("Usuario o contraseña incorrectos");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  user.password = sha1(newPassword);
  await user.save();

  logger.info(`Usuario ${username} cambió la contraseña`);
  res.json({ message: "Contraseña cambiada" });
});

// Registrar usuario
router.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password, rol } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ where: { usuario: username } });
  if (existingUser) {
    res.json({ error: "El usuario ya existe" });
    return;
  }

  // Crear un nuevo usuario
  const newUser = await User.create({
    usuario: username,
    nombre: firstName,
    apellido: lastName,
    email: email,
    contraseña: sha1(password),
    rol: rol,
  });

  logger.info(`Nuevo usuario registrado: ${username}`);
  res.json({ success: true });
});


export default router;
