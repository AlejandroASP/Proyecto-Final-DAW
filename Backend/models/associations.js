import Game from "./game.js";
import Genre from "./genre.js";
import Genre_Translation from "./genre_translations.js";
import Cart from "./cart.js";
import CartGame from "./cart_game.js";
import User from "./user.js";

// Definir las asociaciones
Genre.hasMany(Game, { as: 'games', foreignKey: 'genre_id' });
Game.belongsTo(Genre, { as: 'genre', foreignKey: 'genre_id' });
Genre.hasMany(Genre_Translation,{as: 'genre_transtlations', foreignKey: 'genre_id'})
Genre_Translation.belongsTo(Genre, { as: 'genre', foreignKey: 'genre_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsToMany(Game, { through: CartGame, foreignKey: 'cart_id' });
CartGame.belongsTo(Cart, { foreignKey: 'cart_id' });
CartGame.belongsTo(Game, { foreignKey: 'game_id' });
Game.belongsToMany(Cart, { through: CartGame, foreignKey: 'game_id' });
User.hasMany(Cart, { foreignKey: 'user_id' });

export { Game, Genre, Cart, CartGame, User};
