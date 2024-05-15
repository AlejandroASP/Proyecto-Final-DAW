import Game from "./game.js";
import Genre from "./genre.js";

// Definir las asociaciones
Genre.hasMany(Game, { as: 'games', foreignKey: 'genre_id' });
Game.belongsTo(Genre, { as: 'genre', foreignKey: 'genre_id' });

export { Game, Genre };
