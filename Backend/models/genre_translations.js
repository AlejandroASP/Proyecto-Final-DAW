import sequelize from "../server/db.js";
import { DataTypes } from "sequelize";
import Genre from "./genre.js";

const Genre_Translation = sequelize.define("genre_translations", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
    language: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Genre_Translation;
