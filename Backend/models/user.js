import sequelize from "../server/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  apellido: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

export default User;
