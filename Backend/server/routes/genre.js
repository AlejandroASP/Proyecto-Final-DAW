import express from "express";
import Genre from "../../models/genre.js";
import Genre_Translation from "../../models/genre_translations.js";

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

// Endpoint para obtener la traducción del género por ID y lenguaje
router.get('/:genreId/:lang', async (req, res) => {
    const { genreId, lang } = req.params;
    try {
        const genreTranslation = await Genre_Translation.findOne({
            where: { genre_id: genreId, language: lang }
        });
        if (genreTranslation) {
            res.json({ name: genreTranslation.name });
        } else {
            res.status(404).json({ error: 'Translation not found' });
        }
    } catch (error) {
        console.error("Error fetching genre translation:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;