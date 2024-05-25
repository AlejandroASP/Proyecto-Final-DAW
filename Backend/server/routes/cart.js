import express from "express";
import { Game, Cart, User, CartGame } from '../../models/associations.js';
import { Op } from "sequelize";
import jwt from "jsonwebtoken"; // Importa la biblioteca JWT

const router = express.Router();

// Endpoint para agregar un juego al carrito de un usuario
router.post("/add-to-cart", async (req, res) => {
    try {
        // Obtener el token del usuario del encabezado de autorización
        const token = req.headers.authorization;

        // Verificar el token y extraer el userId si es necesario
        let userId;
        if (token) {
            // Decodificar el token para obtener el userId
            const decodedToken = jwt.decode(token.replace("Bearer ", ""));
            userId = decodedToken.userId;
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Verificar si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verificar si el juego existe
        const { gameId } = req.body;
        const game = await Game.findByPk(gameId);
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }

        // Verificar si el usuario ya tiene un carrito
        let cart = await Cart.findOne({
            where: { userId },
            include: [{ model: Game, as: 'games' }]
        });

        // Si el usuario no tiene un carrito, crear uno nuevo
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        // Agregar el juego al carrito
        await cart.addGame(game);

        // Obtener el carrito actualizado con los juegos
        const updatedCart = await Cart.findOne({
            where: { userId },
            include: [{ model: Game, as: 'games' }]
        });

        return res.status(200).json(updatedCart);
    } catch (error) {
        console.error("Error adding game to cart:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
