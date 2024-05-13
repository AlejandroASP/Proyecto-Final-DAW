import sequelize from "../server/db.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha_de_compra: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

export default Cart;
