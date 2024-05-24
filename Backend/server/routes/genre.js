import express from "express";
import Genre from "../../models/genre.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un género por su ID
router.get('/:genreId', async (req, res) => {
    const { genreId } = req.params;
    try {
        const genre = await Genre.findByPk(genreId);
        if (!genre) {
            return res.status(404).json({ error: "Género no encontrado" });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;