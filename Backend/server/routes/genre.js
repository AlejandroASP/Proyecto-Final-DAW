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


export default router;