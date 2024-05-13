import sequelize from "../server/db.js";
import { DataTypes } from "sequelize";
import Cart from "./cart.js"; // Asumiendo que tienes el modelo Cart definido en cart.js
import Game from "./game.js"; // Asumiendo que tienes el modelo Game definido en game.js

const CartGame = sequelize.define("cart_game", {
  cart_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Cart,
      key: 'id',
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    }
  },
  game_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Game,
      key: 'id',
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

export default CartGame;
