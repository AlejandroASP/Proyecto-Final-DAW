import express from "express";
import Game from "../../models/game.js";
import { Op } from "sequelize";


const router = express.Router();

// Obtener todos los juegos
router.get("/", async (req, res) => {
  try {
    console.log("Request received to fetch all games"); // Agregar este registro de consola
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un juego por su ID
router.get("/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      res.status(404).json({ error: "Juego no encontrado" });
      return;
    }
    res.json(game);
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un nuevo juego
router.post("/", async (req, res) => {
  const { nombre, precio, fecha_de_salida, detalles, genre_id, img } = req.body;

  try {
    const newGame = await Game.create({
      nombre,
      precio,
      fecha_de_salida,
      detalles,
      genre_id,
      img,
    });
    res.status(201).json(newGame);
  } catch (error) {
    console.error("Error al crear un nuevo juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un juego
router.put("/:id", async (req, res) => {
  const gameId = req.params.id;
  const { nombre, precio, fecha_de_salida, detalles, genre_id, img } = req.body;

  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      res.status(404).json({ error: "Juego no encontrado" });
      return;
    }

    game.nombre = nombre;
    game.precio = precio;
    game.fecha_de_salida = fecha_de_salida;
    game.detalles = detalles;
    game.genre_id = genre_id;
    game.img = img;

    await game.save();

    res.json(game);
  } catch (error) {
    console.error("Error al actualizar el juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un juego
router.delete("/:id", async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      res.status(404).json({ error: "Juego no encontrado" });
      return;
    }

    await game.destroy();
    res.json({ message: "Juego eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Buscar juegos por nombre
router.get("/search", async (req, res) => {
    const { nombre } = req.query;
  
    try {
      const games = await Game.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%` // Busca juegos que contengan el nombre proporcionado, de manera insensible a mayúsculas y minúsculas
          }
        }
      });
      res.json(games);
    } catch (error) {
      console.error("Error al buscar juegos por nombre:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
  
export default router;
