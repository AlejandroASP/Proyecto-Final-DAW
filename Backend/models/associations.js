import Game from "./game.js";
import Genre from "./genre.js";
import Genre_Translation from "./genre_translations.js";

// Definir las asociaciones
Genre.hasMany(Game, { as: 'games', foreignKey: 'genre_id' });
Game.belongsTo(Genre, { as: 'genre', foreignKey: 'genre_id' });
Genre.hasMany(Genre_Translation,{as: 'genre_transtlations', foreignKey: 'genre_id'})
Genre_Translation.belongsTo(Genre, { as: 'genre', foreignKey: 'genre_id' });

export { Game, Genre };
