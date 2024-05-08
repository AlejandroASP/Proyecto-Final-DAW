import express from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../app.js";

import { sha1 } from "js-sha1";

import Admin from "../../models/admin.js";

const JWT_SECRET = "mysecretkey";
const router = express.Router();

// Iniciar sesión
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    logger.error("Usuario o contraseña udefined");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }
  const admin = await Admin.findOne({
    where: {
      email: email,
      password: sha1(password),
    },
  });

  if (!admin) {
    logger.error("Usuario o contraseña incorrectos");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: "2h",
  });

  logger.info(`Admin ${admin.email} logged in`);
  res.json({ token });
});

// Cambiar contraseña
router.put("/", async (req, res) => {
  const { email, password, newPassword } = req.body;
  
  if (
    email === undefined ||
    password === undefined ||
    newPassword === undefined
  ) {
    logger.error("Usuario o contraseña udefined");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  const admin = await Admin.update(
    {
      password: sha1(newPassword),
    },
    {
      where: {
        email: email,
        password: sha1(password),
      },
    }
  );

  if (!admin) {
    logger.error("Usuario o contraseña incorrectos");
    res.json({ error: "Usuario o contraseña incorrectos" });
    return;
  }

  logger.info(`Admin ${email} changed password`);
  res.json({ message: "Contraseña cambiada" });
});

export default router;
