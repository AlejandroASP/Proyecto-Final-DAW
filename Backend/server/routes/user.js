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

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Si no hay token, se deniega el acceso
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token no válido
    }
    req.user = user;
    next();
  });
};

// Obtener información del usuario
router.get("/profile", authenticateToken, async (req, res) => {
  const { id } = req.user;

  const user = await User.findByPk(id);

  if (!user) {
    logger.error("Usuario no encontrado");
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // No devuelvas la contraseña en la respuesta
  const { contraseña, ...userWithoutPassword } = user.dataValues;

  logger.info(`Información del usuario ${user.usuario} obtenida`);
  res.json(userWithoutPassword);
});

// Actualizar información del usuario
router.put("/profile", async (req, res) => {
  const { id, username, firstName, lastName, email } = req.body;

  try {
    // Verificar si algún campo está vacío o indefinido
    if (!id || !username || !firstName || !lastName || !email) {
      logger.error("Datos del usuario incompletos");
      return res.status(400).json({ error: "Datos del usuario incompletos" });
    }

    // Buscar al usuario por su ID
    const user = await User.findOne({ where: { id: id } });

    // Si el usuario no se encuentra, devolver un error
    if (!user) {
      logger.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el nuevo nombre de usuario ya está en uso por otro usuario
    const existingUserWithUsername = await User.findOne({ where: { usuario: username } });
    if (existingUserWithUsername && existingUserWithUsername.id !== id) {
      return res.status(400).json({ message: "❌ Ya existe un registro con ese Nombre de Usuario, por favor, introduzca otro" });
    }

    // Verificar si el nuevo correo electrónico ya está en uso por otro usuario
    const existingUserWithEmail = await User.findOne({ where: { email: email } });
    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
      return res.status(400).json({ message: "❌ Ya existe un registro con ese Correo Electrónico, por favor, introduzca otro" });
    }

    // Actualizar los campos del usuario
    user.usuario = username;
    user.nombre = firstName;
    user.apellido = lastName;
    user.email = email;

    // Guardar los cambios en la base de datos
    await user.save();

    logger.info(`Perfil del usuario ${username} actualizado`);
    return res.status(200).json({ message: "Perfil actualizado" });
  } catch (error) {
    logger.error("Error al actualizar el perfil del usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar avatar del usuario
router.put("/profile/avatar", authenticateToken, async (req, res) => {
  const { id } = req.user; // Obtener el ID del usuario autenticado
  const { imgNumber } = req.body; // Obtener el número de imagen del cuerpo de la solicitud

  console.log("ID del usuario:", id); // Log para verificar ID del usuario
  console.log("Número de imagen recibido:", imgNumber); // Log para verificar número de imagen

  try {
    // Buscar y actualizar el usuario con el nuevo número de imagen
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      logger.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.img = imgNumber;
    await user.save();

    logger.info(`Avatar del usuario ${user.usuario} actualizado`);
    res.status(200).json({ message: "Avatar actualizado exitosamente" });
  } catch (error) {
    logger.error("Error al actualizar el avatar del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
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

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { usuario: username } });
    if (existingUser) {
      return res.status(400).json({ message: "❌ Ya existe un registro con ese Nombre de Usuario, por favor, introduzca otro" });
    }
    // Verificar si el correo del usuario ya existe
    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
      return res.status(400).json({ message: "❌ Ya existe un registro con ese Correo Electrónico, por favor, introduzca otro" });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({
      usuario: username,
      nombre: firstName,
      apellido: lastName,
      email: email,
      contraseña: sha1(password),
      rol: rol,
      img: "1"
    });

    logger.info(`Nuevo usuario registrado: ${username}`);
    res.json({ success: true });
  } catch (error) {
    logger.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;

