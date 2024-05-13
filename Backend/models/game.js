import sequelize from "../server/db.js";
import { DataTypes } from "sequelize";
import Genre from "./genre.js"; // Asumiendo que tienes el modelo Genre definido en genre.js

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha_de_salida: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'id',
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    }
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

export default Game;
