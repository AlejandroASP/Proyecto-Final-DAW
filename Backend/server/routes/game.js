import express from "express";
import { Game, Genre } from '../../models/associations.js';
import { Op } from "sequelize";


const router = express.Router();

// Obtener todos los juegos
router.get("/", async (req, res) => {
    try {
        const { genre_id } = req.query;  // Obtener el parámetro de consulta genre_id
        const whereClause = genre_id ? { genre_id } : {};  // Crear cláusula where si genre_id está presente
        const games = await Game.findAll({ where: whereClause });  // Buscar juegos con el filtro
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

// Obtener detalles de un juego específico y juegos del mismo género
router.get("/:gameId", async (req, res) => {
    try {
        const { gameId } = req.params;

        // Obtener el juego específico
        const game = await Game.findOne({
            where: { id: gameId },
            include: [{
                model: Genre,
                as: 'genre',
                attributes: ['id', 'nombre'],
            }]
        });

        if (!game) {
            return res.status(404).json({ error: "Juego no encontrado" });
        }

        res.json({ game });
    } catch (error) {
        console.error("Error al obtener los detalles del juego:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Metodo para obtener los juegos del mismo genero
router.get("/related/:gameId", async (req, res) => {
    try {
        const { gameId } = req.params;

        // Obtener el juego específico
        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({ error: "Juego no encontrado" });
        }

        // Obtener el género del juego actual
        const genreId = game.genre_id;

        // Obtener los juegos del mismo género (excluyendo el juego actual)
        const relatedGames = await Game.findAll({
            where: { genre_id: genreId, id: { [Op.ne]: gameId } },
            attributes: ['id', 'nombre', 'img', 'precio'],
        });

        res.json(relatedGames);
    } catch (error) {
        console.error("Error al obtener juegos del mismo género:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
