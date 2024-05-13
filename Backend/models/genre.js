import sequelize from "../server/db.js";
import { DataTypes } from "sequelize";

const Genre = sequelize.define("genre", {
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
}, {
  freezeTableName: true,
  timestamps: false,
});

export default Genre;
