-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2024 a las 15:57:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vortexdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `precio_total` decimal(10,2) DEFAULT NULL,
  `fecha_de_compra` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_game`
--

CREATE TABLE `cart_game` (
  `cart_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `fecha_de_salida` date DEFAULT NULL,
  `detalles` text DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `game`
--

INSERT INTO `game` (`id`, `nombre`, `precio`, `fecha_de_salida`, `detalles`, `genre_id`, `img`) VALUES
(1, 'Skul the hero slayer', 3.00, '2021-01-21', 'El castillo del rey demonio en ruinas\nLa raza humana ha atacado el castillo del rey demonio, aunque eso no es nada nuevo. No obstante, esta vez los aventureros han decidido unir fuerzas con el Ejército Imperial y el «Héroe de Carleon» para lanzar un ataque sin precedentes contra las fuerzas demoniacas e intentar acabar con ellas de una vez por todas. Han atacado la fortaleza demoniaca con una cantidad de efectivos apabullante y han conseguido destruirla por completo. Todos los demonios que estaban en el castillo han sido capturados, excepto un esqueleto solitario llamado «Skul».', 5, 'https://cdn1.epicgames.com/offer/6feac7e685174dd698e90ca9536e1299/EGS_SkulTheHeroSlayer_SOUTHPAWGAMES_S1_2560x1440-3d430ac16bd3fd2d43673ea1f027eba0'),
(2, 'Terraria', 9.00, '2011-05-16', '¡Cava, lucha, explora, construye! Nada es imposible en este juego de aventuras repleto de acción. El mundo es tu lienzo y la tierra misma es tu pintura.\r\n¡Coge tus herramientas y adelante! Crea armas para deshacerte de una gran variedad de enemigos en numerosos ecosistemas. Excava profundo bajo tierra para encontrar accesorios, dinero y otras cosas muy útiles. Reúne recursos para crear todo lo que necesites y conformar así tu propio mundo. Construye una casa, un fuerte o incluso un castillo. La gente se mudará a vivir ahí e incluso quizás te vendan diferentes mercancías que te ayuden en tu viaje.\r\nPero ten cuidado, aún te aguardan más desafíos... ¿Estás preparado para la tarea?\r\nCaracterísticas principales:\r\nJugabilidad \"sandbox\" (juega libremente en un mundo a tu disposición)\r\nMundos generados de forma aleatoria\r\nActualizaciones gratuitas de contenido', 4, 'https://www.mundodeportivo.com/alfabeta/hero/2021/08/Creaciones-en-Terraria.jpg?width=1200'),
(3, 'Dead Cells', 15.00, '2018-08-07', 'RogueVania: la exploración de un mundo interconectado con la rejugabilidad de un juego roguelite y la adrenalina que produce la amenaza de la muerte permanente\r\nAcción en 2D de tipo Dark Souls: combates duros pero justos, más de 50 armas y hechizos con un sistema de juego exclusivo y, por supuesto, la tirada de emergencia para salir de apuros.\r\nProgresión no lineal: ¿alcantarillas, osario o murallas? Una vez desbloqueadas, con las habilidades especiales permanentes podrás acceder a nuevas rutas para alcanzar tu objetivo. Opta por el camino que mejor se ajuste a tu estilo de juego o simplemente a tu estado de ánimo.\r\nExploración: salas secretas, pasadizos ocultos, paisajes encantadores... Tómate un momento para pasear por las torres y respirar ese aire fresco empapado de bruma marina.\r\n\r\nLos niveles interconectados y el desbloqueo progresivo del acceso a la isla te proporcionan un auténtico incentivo para explorar tus alrededores. Además, súmale un grado de evolución para tu personaje y las mejoras de armas permanentes para tener claro lo que Dead Cells ha tomado prestado del largo catálogo de metroidvanias que lo preceden.\r\n\r\nEso sí, ¡lo más importante será tu habilidad como jugador! Los juegos de tipo roguelite consisten en mejorar constantemente hasta que lo que antes era un obstáculo insalvable se convierte en un paseo militar. Los combates implacables, junto con la ausencia de cualquier tipo de red de seguridad, hace que vivas una aventura adrenalínica cada vez que juegas. Además, su rejugabilidad no tiene rival.', 5, 'https://cdn1.epicgames.com/1368a7f14c3344bbaededbae528fafed/offer/EGS_DeadCells_MotionTwin_S1-2560x1440-87045359c3856ef941959aeeb00dbc7f.jpg'),
(4, 'Cuphead', 6.00, '2017-09-29', 'Cuphead es un juego de acción clásico estilo \"dispara y corre\" que se centra en combates contra el jefe. Inspirado en los dibujos animados de los años 30, los aspectos visual y sonoro están diseñados con esmero empleando las mismas técnicas de la época, es decir, animación tradicional a mano, fondos de acuarela y grabaciones originales de jazz.\r\n\r\nJuega como Cuphead o Mugman (en modo de un jugador o cooperativo) y cruza mundos extraños, adquiere nuevas armas, aprende poderosos supermovimientos y descubre secretos ocultos mientras procuras saldar tu deuda con el diablo.', 5, 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Cuphead_image1600w.jpg'),
(5, 'Rayman Legends', 6.00, '2017-09-29', 'Modo cooperativo de 4 jugadores:\nHasta 4 jugadores podrán jugar a la vez, y cualquiera podrá unirse o salir en cualquier momento, el juego continuará sin interrupción.\n\nModo Auto-Murfy:\nUn botón específico en el mando te permite dar órdenes a Murfy como continuar jugando con tus personajes clásicos (Rayman o cualquiera de sus amigos)\n\nRetos en línea:\nConecta con tus amigos disfrutando de la gran variedad de retos disponibles que pondrán a prueba vuestra habilidad y velocidad. Revisa las clasificaciones para ver tu puesto a nivel mundial\n\nEl juego debe continuar:\nSalta cuando redoble el tambor, golpea al ritmo del bajo, o baja en tirolina durante el solo de guitarra. El ritmo y la sincronización son claves para superar estos mapas musicales. A ver si tienes lo que hay tener para ser el auténtico Héroe de las Plataformas.\n\nBatallas finales en 3D:\nLos jefes tienen una gran ventaja sobre la banda de Rayman… ¡una dimensión más! Los dragones y otras criaturas épicas atacarán desde cualquier ángulo, así que tendrás que dar lo mejor de ti para vencerlos.\n\nUbiArt Engine mejorado:\nEl motor UbiArt Engine ha ampliado sus posibilidades para poder incluir elementos jugables en 3D, un nuevo diseño de iluminación y un nuevo sistema de renderizado, capaces de llevar los premiados gráficos de Rayman a un nuevo nivel.\n\nVuelve el galardonado equipo:\nEl legendario equipo de reconocidos artistas, diseñadores y compositores se han unido una vez más para crear nuevos mundos, nuevos personajes y una nueva banda sonora.', 5, 'https://cdn.cloudflare.steamstatic.com/steam/apps/242550/header.jpg?t=1680012063'),
(6, 'Hollow Knight', 3.00, '2021-01-21', 'Enfréntate a las profundidades de un reino olvidado\r\nBajo la deteriorada ciudad de Petrópolis yace un antiguo reino en ruinas. A muchos les atrae la vida bajo la superficie y van en busca de riquezas, gloria o respuestas a viejos enigmas.\r\n\r\n\r\nHollow Knight es una aventura de acción clásica en 2D ambientada en un vasto mundo interconectado. Explora cavernas tortuosas, ciudades antiguas y páramos mortales. Combate contra criaturas corrompidas, haz amistad con extraños insectos y resuelve los antiguos misterios que yacen en el corazón de reino.', 5, 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/wiiu_download_software_5/H2x1_WiiUDS_HollowKnight_image1600w.jpg'),
(7, 'Hollow Knight Silksong', 3.00, '2021-01-21', 'Enfréntate a las profundidades de un reino olvidado\r\nBajo la deteriorada ciudad de Petrópolis yace un antiguo reino en ruinas. A muchos les atrae la vida bajo la superficie y van en busca de riquezas, gloria o respuestas a viejos enigmas.\r\n\r\n\r\nHollow Knight es una aventura de acción clásica en 2D ambientada en un vasto mundo interconectado. Explora cavernas tortuosas, ciudades antiguas y páramos mortales. Combate contra criaturas corrompidas, haz amistad con extraños insectos y resuelve los antiguos misterios que yacen en el corazón de reino.', 5, 'https://cdn.cloudflare.steamstatic.com/steam/apps/1030300/capsule_616x353.jpg?t=1695443850'),
(8, 'Limbo', 3.00, '2021-01-21', 'Dudoso sobre el destino de su hermana, un niño entra en LIMBO.', 5, 'https://cdn.akamai.steamstatic.com/steam/apps/48000/header.jpg?t=1673342440'),
(9, 'Prince of Persia The Lost Crown', 3.00, '2021-01-21', 'Dash into a stylish and thrilling action-adventure platformer set in a mythological Persian world where the boundaries of time and space are yours to manipulate. Play as Sargon and evolve from sword-wielding prodigy to extraordinary legend as you master acrobatic combat and unlock new Time Powers and unique super abilities.', 5, 'https://cdn1.epicgames.com/offer/22600f09e936468c8ecfc22b5eac7d7c/EGST_StoreLandscape_2560x1440_2560x1440-d49d4862a0e1a243638d5f95517ed205'),
(10, 'Shovel Knight', 3.00, '2021-01-21', '¡Shovel Knight: Treasure Trove es la edición completa de Shovel Knight, un arrasador clásico de acción-aventura con una jugabilidad apasionante, personajes memorables y estética retro de 8-bits! Corre, salta y lucha encarnando a Shovel Knight, Caballero de la Pala, en busca de su amada perdida. Acaba con los infames miembros de la Orden Sin Cuartel y enfréntate a su amenazante líder, la Hechicera.\r\n\r\n¡Pero eso no es todo! Shovel Knight: Treasure Trove también incluye 4 juegos completos adicionales! Toma el control de Plague Knight, Specter Knight y King Knight en sus propias aventuras y lucha contra el resto en un Showdown para cuatro jugadores en modo local. ¡Todos juntos, forman una arrolladora y enorme saga!\r\n\r\nLlévatelo todo con Shovel Knight: Treasure Trove. Juega con un amigo en la campaña cooperativa de Shovel of Hope, pon tu temple a prueba en completos modos desafío, combate contra otros jugadores en Showdown y dale la vuelta al juego con el modo Cambio de Cuerpo. ¡Defiende las virtudes de la Palería, consigue reliquias y tesoros y descubre el verdadero significado de la justicia de la pala!', 5, 'https://gaming-cdn.com/images/products/1898/616x353/shovel-knight-treasure-trove-pc-mac-juego-steam-cover.jpg?v=1705490824'),
(11, 'Have a Nice Death', 3.00, '2021-01-21', 'Te damos la bienvenida a Death Inc.\r\nDescubre y explora los oscuros y encantadores departamentos generados de forma procedimental de Death Incorporated, donde conocerás a un variado elenco de personajes memorables, como tu simpático asistente con cabeza de calabaza, Pump Quinn. ¡Todos se mueren de ganas de contarte los cotilleos de la oficina!\r\n\r\n\r\n\r\nCosecha lo que siembres\r\nPule tus habilidades (y tu guadaña) con los frenéticos combates hack and slash utilizando más de 70 armas y hechizos únicos que podrás encontrar y mejorar para crear combinaciones mortíferas.\r\n\r\n\r\n\r\nLa Parca nunca duerme\r\nDado que Parca no puede morir, usa lo que aprendas y consigas para vencer a los numerosos esbirros y jefes de cada departamento de Death Incorporated... una y otra vez. Con la evaluación de rendimiento después de cada recorrido, desbloquearás objetos y mejoras interesantes que te ayudarán a progresar en tu viaje.\r\n\r\n\r\n\r\nSi la vida muerte te da maldiciones...\r\nAsumir más poder sería un tanto polémico y no encajaría con la cultura de empresa de Death Incorporated. Por ejemplo, si te aplicaras una mejora de maldición, el inspector de trabajo podría aumentar el poder de tus subordinados o, peor aún, subir el precio del kafé y de otros objetos fundamentales para tu rendimiento laboral.', 5, 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_HaveANiceDeath_image1600w.jpg'),
(12, 'God Of War', 3.00, '2021-01-21', 'Entra en los dominios nórdicos\r\nKratos ha dejado atrás su venganza contra los dioses del Olimpo y vive ahora como un hombre en los dominios de los dioses y monstruos nórdicos. En este mundo cruel e implacable debe luchar para sobrevivir… y enseñar a su hijo a hacerlo también.\r\n\r\nAprovecha una segunda oportunidad\r\nKratos vuelve a ser padre. Como progenitor y protector de Atreus, un hijo decidido a ganarse el respeto del padre, Kratos debe sobrevivir en un mundo muy peligroso dominando y controlando la ira que tanto lo ha caracterizado.\r\n\r\nViaja a un mundo oscuro y elemental de criaturas temibles\r\nEste entorno inequívocamente nuevo, con su propio panteón de criaturas, monstruos y dioses, nos lleva desde las columnas de mármol del fastuoso Olimpo hasta los bosques agrestes, las montañas y las cuevas de la tradición nórdica anterior a los vikingos.\r\n\r\nLucha en combates físicos y viscerales\r\nCon una cámara al hombro que acerca al jugador a la acción más que antes, las peleas de God of War™ son un reflejo del panteón de criaturas nórdicas que encontrará Kratos: grandiosas, duras y extenuantes. La nueva arma principal y las nuevas habilidades mantienen el espíritu que define la saga God of War y presentan una visión del conflicto que renueva el género.', 4, 'https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png'),
(13, 'Elden Ring', 3.00, '2021-01-21', 'EL NUEVO JUEGO DE ROL Y ACCIÓN DE AMBIENTACIÓN FANTÁSTICA.\r\nÁlzate, Sinluz, y que la gracia te guíe para abrazar el poder del Círculo de Elden y encumbrarte como señor del Círculo en las Tierras Intermedias.\r\n\r\n• Un extenso mundo lleno de emociones\r\nUn vasto mundo perfectamente conectado en el que los territorios abiertos estarán repletos de situaciones y mazmorras enormes con diseños complejos y tridimensionales. Mientras exploras, experimentarás el deleite de descubrir amenazas desconocidas y sobrecogedoras, y eso te haré sentir la emoción de la superación.\r\n\r\n• Crea tu propio personaje\r\nAdemás de personalizar la apariencia de tu personaje, puedes combinar libremente las armas, armaduras y la magia que te equipas. Puedes desarrollar a tu personaje según tu estilo de juego, tanto para aumentar tu fuerza bruta y ser un guerrero poderoso, como para dominar la magia.\r\n\r\n• Un drama épico nacido de un mito\r\nUna historia muy profunda contada en fragmentos. Un drama épico en el que las motivaciones de cada personaje se encuentran en las Tierras Intermedias.\r\n\r\n• Jugabilidad online única que te conecta libremente con otros jugadores\r\nAdemás del multijugador, en el que te puedes conectar directamente con otros jugadores y viajar juntos, el juego incluye un elemento online asíncrono único que te permite sentir la presencia de otros.', 4, 'https://image.api.playstation.com/vulcan/ap/rnd/202107/1612/Y5RHNmzAtc6sRYwZlYiKHAxN.png'),
(14, 'Metal Gear Solid V The Panthom Pain', 3.00, '2015-09-01', 'METAL GEAR SOLID V: The Phantom Pain marca la entrada de la franquicia en una nueva era gracias a la innovadora tecnología de Fox Engine y ofrece a los jugadores una experiencia de juego de máximo nivel y libertad táctica para llevar a cabo misiones en mundo abierto.', 4, 'https://image.api.playstation.com/vulcan/ap/rnd/202010/0205/dyvo9eGUf7WTZx49eTpQyDuL.png'),
(15, 'Monster Hunter World', 3.00, '2018-08-08', '¡Bienvenidos a un nuevo mundo! En Monster Hunter: World, la última entrega de la serie, podrás disfrutar de la mejor experiencia de juego, usando todos los recursos a tu alcance para acechar monstruos en un nuevo mundo rebosante de emociones y sorpresas.', 4, 'https://fanatical.imgix.net/product/original/7f6e4bbc-69a4-4910-a424-8b4f14100c12.jpeg?auto=compress,format&w=870&fit=crop&h=489'),
(16, 'Resident Evil 7', 3.00, '2017-01-24', 'El peligro y la soledad emanan de las decrépitas paredes de una granja abandonada en el sur de los EE. UU. «7» marca un nuevo inicio para el género del survival horror, con el cambio a la aterradora perspectiva de jugador «vista aislada». Con el RE Engine, el terror llega a nuevas cotas de fotorrealismo.', 4, 'https://image.api.playstation.com/vulcan/ap/rnd/202206/0207/V6IViuKogBMRtajqjnYrcj0e.png'),
(17, 'Halo The Master Chief Collection', 3.00, '2019-12-03', 'El emblemático viaje del Jefe Maestro incluye seis juegos creados para PC y recopilados en una sola experiencia. Ya seas un seguidor de toda la vida o descubras al Spartan 117 por primera vez, la colección Jefe Maestro te resultará la experiencia de juego definitiva de Halo.', 4, 'https://assets.xboxservices.com/assets/e5/7e/e57e0914-91e6-4865-8dbb-b830b72d7ba1.jpg?n=Halo-MCC_GLP-Page-Hero-0_1083x609.jpg'),
(18, 'Far Cry 5', 3.00, '2018-03-27', 'Te damos la bienvenida al condado de Hope (Montana), la tierra de los libres y valientes, pero también el hogar de una secta apocalíptica llena de fanáticos. Enfréntate a su líder, Joseph Seed, y sus hermanos, los Heraldos, para prender la mecha de la resistencia y liberar a la comunidad asediada.\r\n\r\nJuega en solitario o en un modo cooperativo de dos jugadores en el inmenso mundo abierto del condado de Hope. Haz uso de un vasto arsenal que incluye desde lanzacohetes hasta palas, y conduce cochazos icónicos, quads, avionetas y muchas cosas más para luchar contra las fuerzas de la secta en enfrentamientos épicos.\r\n\r\nDESCUBRE UNO DE LOS FAR CRY MÁS ACLAMADOS\r\nÚnete a los millones de jugadores de Far Cry® 5 y descubre lo que IGN describe como \"diversión frenética\".\r\n\r\nPLANTA CARA A LA SECTA MORTAL DE JOSEPH SEED\r\nLibra al condado de Hope de la secta de la Puerta del Edén y de la familia Seed. Descubre la primera aparición del carismático antagonista Joseph Seed antes de su regreso en Far Cry® New Dawn y su propio DLC en Far Cry® 6: Caída.\r\n\r\nEXPLORA EL CONDADO DE HOPE EN SOLITARIO O COOPERATIVO Y ESTABLECE TUS PROPIAS REGLAS\r\nJuega en solitario o en un modo cooperativo de dos jugadores en el inmenso mundo abierto del condado de Hope. Haz uso de un vasto arsenal que incluye desde lanzacohetes hasta palas, y conduce cochazos icónicos, quads, avionetas y muchas cosas más para luchar contra las fuerzas de la secta en enfrentamientos épicos. Alíate con animales de compañía, como el aclamado oso Cheeseburger y el perro Boomer, y libera el condado de Hope de las garras de sus opresores.', 4, 'https://i.blogs.es/3bec51/far-cry-r-5_20180320221123/1366_2000.jpg'),
(19, 'Arma 3', 3.00, '2013-09-12', 'Combate realista en un enorme mundo abierto militar. Gran cantidad de contenido en solitario y multijugador, más de 20 vehículos y 40 armas e infinitas posibilidades de creación de contenido. El mejor juego militar para PC. Auténtico, diverso, abierto... Con Arma 3 vas a vivir la guerra.', 4, 'https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg?t=1709821285'),
(20, 'Doom Eternal', 3.00, '2020-03-20', 'Los ejércitos del infierno han invadido la Tierra. Ponte en la piel del Slayer en una épica campaña para un jugador y cruza dimensiones para detener la destrucción definitiva de la humanidad. No le tienen miedo a nada... salvo a ti.', 4, 'https://media.vandal.net/i/1024x576/6-2019/201961213194638_1.jpg'),
(21, 'Baldurs Gate 3', 2.00, '2023-08-03', 'Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo, traición, sacrificio, supervivencia y la atracción de un poder absoluto.\r\n\r\nUnas misteriosas aptitudes empiezan a surgir en tu interior por obra de un parásito de los azotamentes que te han implantado en el cerebro. Resístete y vuelve a la oscuridad contra sí misma o abraza la corrupción y conviértete en el mal supremo.\r\n\r\nDe manos de los creadores de Divinity: Original Sin 2, llega un juego de rol para la nueva generación de consolas, ambientado en el mundo de Dungeons & Dragons.\r\n\r\n\r\n\r\nElige entre 12 clases y 11 razas del manual de jugador de D&D para crear tu propia identidad, o bien juega con un héroe con origen, que cuenta con su propio trasfondo. También puedes abrazar tu corrupción interior como el Ansia Oscura, un héroe con un origen completamente personalizable con sus propias mecánicas e historia. Elijas a quien elijas, prepárate para vivir aventuras, saquear, combatir y vivir romances a lo largo y ancho de los Reinos Olvidados y más allá. Reúne al grupo. Disfruta de la aventura online con un grupo de hasta cuatro jugadores.\r\n\r\n\r\n\r\nPrimero, te secuestran; luego, te infectan y, al final, te pierdes. Te estás convirtiendo en un monstruo, pero, a medida que la corrupción crece en tu interior, también crece tu poder. Ese poder puede ayudarte a sobrevivir, pero tendrás que pagar un precio. Con todo, tu mejor baza, más que cualquier habilidad, podrían ser los vínculos de confianza que establezcas con tu grupo. En medio de un conflicto entre diablos, deidades y siniestras fuerzas de otros mundos, juntos decidiréis el destino de los Reinos Olvidados.', 1, 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37e49fba1a572ea3b89971ee7b.jpg'),
(22, 'Darkest Dungeon II', 2.00, '2016-01-19', 'Darkest Dungeon es un desafiante juego de rol gótico en mazmorras y por turnos que gira en torno al esfuerzo psicológico de la aventura.\r\n\r\nRecluta, entrena y lidera a un equipo de héroes imperfectos a través de enrevesados bosques, laberintos olvidados, criptas en ruinas y más allá. Te enfrentarás no solo a enemigos inimaginables, sino al esfuerzo, el hambre, la enfermedad y la siempre acechante oscuridad. Descubre extraños misterios y enfrenta a los héroes a una serie de temibles monstruos con un innovador sistema de combate estratégico por turnos.\r\n\r\n3 modos de juego y más de 80 horas de duración\r\nCompatibilidad con Steam Workshop para uso de modificaciones\r\nSistema de aflicción: ¡enfréntate no solo a monstruos, sino al esfuerzo! ¡Lidia con la paranoia, el masoquismo, el miedo, la irracionalidad y una serie de peculiaridades que afectarán a la dinámica de juego!\r\nImpresionante estilo de ilustraciones góticas dibujadas a mano.\r\nEl innovador combate por turnos te enfrenta a una horda de monstruos diabólicos.\r\n¡16 clases de héroes seleccionables (¡y más que se añadirán!), entre ellos la doctora de plagas, la diabla e incluso un leproso!\r\nAcampa para curar heridas o dar discursos inspiradores.\r\nPermite que tus agotados personajes descansen en la ciudad, la taberna o la abadía para que el esfuerzo no les afecte.\r\nCaracterísticas de los clásicos juegos de rol y mazmorras, como la muerte permanente, las mazmorras generadas por procedimientos e increíbles posibilidades de volver a jugar\r\n\r\n¿Puedes contener la horda de horrores y espíritus que están surgiendo en el feudo ancestral de tu familia?\r\n\r\n¡Desciende bajo tu propio riesgo!', 1, 'https://blog.es.playstation.com/tachyon/sites/14/2024/04/fed386c47a4cd1924cb8990847b85f2c5d371f7c.jpeg?resize=1088%2C612&crop_strategy=smart'),
(23, 'World Of Warcraft', 15.00, '2004-11-23', 'World of Warcraft es un videojuego de rol multijugador masivo en línea desarrollado por Blizzard Entertainment. Es el cuarto juego lanzado establecido en el universo fantástico de Warcraft, el cual fue introducido por primera vez por Warcraft: Orcs & Humans en 1994.​', 1, 'https://img.asmedia.epimg.net/resizer/v2/XOFIS5U5N5OFNJRGJTUJOVEZHU.jpg?auth=02ee6f43be08d225ad913d2903baa1f415eb4ff0f2a69713d0aa0bd2bf9f5dcc&width=644&height=362&smart=true'),
(24, 'Diablo 3', 12.00, '2012-05-15', 'Diablo III es un videojuego de rol de acción, desarrollado por Blizzard Entertainment. Ésta es la continuación de Diablo II y la tercera parte de la serie que fue creada por la compañía estadounidense Blizzard. Su temática es de fantasía oscura y terrorífica.', 1, 'https://i.blogs.es/aa72a1/250814-diablo3-reaper-souls-ultimate-evil-edition-analisis/650_1200.jpg'),
(25, 'Divinity Original Sin II', 3.00, '2017-09-14', 'Gather your party and get ready for a new, back-to-the-roots RPG adventure! Discuss your decisions with companions; fight foes in turn-based combat; explore an open world and interact with everything and everyone you see. Join up with a friend to play online in co-op and make your own adventures with the powerful RPG toolkit.\r\n\r\nIn Divinity: Original Sin you take on the role of a young Source Hunter: your job is to rid the world of those who use the foulest of magics. When you embark on what should have been a routine murder investigation, you suddenly find yourself in the middle of a plot that will rattle the very fabric of time.\r\n\r\nDivinity: Original Sin is a game that gives you a lot of freedom and plenty of gameplay mechanics to use or abuse. The game\'s epic story may drive you toward your ultimate end-goal, but how you get there is entirely up to you.\r\n\r\nOr up to you and a friend, because Divinity: Original Sin can be played completely cooperatively, and features both online and local drop-in/drop-out multiplayer. Great adventures become even greater when shared with a trusted comrade-in-arms!', 1, 'https://www.fantasymundo.com/wp-content/uploads/2018/09/DOS-II-DE-Portada.jpg'),
(26, 'Path of Exile', 3.00, '2013-10-23', 'Eres un exiliado. Tendrás que esforzarte por sobrevivir en el oscuro continente de Wraeclast mientras luchas para conseguir el poder que te permitirá vengarte de quienes te traicionaron. Path of Exile es un RPG de acción en línea creado por jugadores expertos que se desarrolla en un mundo de fantasía oscura. Se centra en el combate de acción visceral, en los objetos poderosos y en una enorme personalización de personajes. Path of Exile es completamente gratis y nunca tendrás que pagar para ganar.', 1, 'https://cdn.cloudflare.steamstatic.com/steam/apps/238960/header.jpg?t=1711061755'),
(27, 'The Elder Scrolls Online', 3.00, '2014-04-04', 'Vive una historia en permanente estado de expansión por todo Tamriel con The Elder Scrolls Online, un RPG en línea que ha recibido toda clase de premios y alabanzas. Explora un mundo lleno de vida y sorpresas con tus amigos, o embárcate en una aventura en solitario. Disfruta de un control total sobre el aspecto y la forma de jugar de tu personaje: de las armas que esgrimas a las habilidades que uses, las decisiones que tomes darán forma a tu destino. Te damos la bienvenida a un mundo sin límites.\r\nJUEGA COMO QUIERAS\r\nCombate, construye, roba, asedia, explora y combina distintos tipos de armaduras, armas y habilidades hasta crear un estilo de juego propio. Tú decides lo que quieres hacer en el mundo persistente, vivo y siempre en crecimiento de The Elder Scrolls.\r\nCUENTA TU PROPIA HISTORIA\r\nDesvela los secretos de Tamriel tras partir en una aventura para recobrar tu alma perdida y salvar al mundo de la amenaza de Oblivion. Vive cualquiera de sus historias en cualquier parte del mundo y en el orden que quieras, por tu cuenta o en compañía de otros.\r\nUN RPG MULTIJUGADOR\r\nCumple misiones con tus amigos, únete a otros aventureros para explorar mazmorras repletas de peligros y monstruos o participa en épicas batallas JcJ con otros centenares de jugadores.', 1, 'https://cdn.cloudflare.steamstatic.com/steam/apps/306130/capsule_616x353.jpg?t=1714743018'),
(28, 'Final Fantasy XV', 3.00, '2018-03-06', 'Este episodio original relata el origen del odio y pesar del mayor rival de Noctis, Ardyn Lucis Caelum. Su pasado fue borrado de la historia de Eos y tuvo que cargar con una cruz cuyo peso aún sostiene. El misterio de su existencia queda desvelado a través del jugador, quien podrá controlarle por vez primera.\r\n\r\n*Para jugar a este contenido es necesario poseer FINAL FANTASY XV (a la venta por separado) y descargarse la última actualización.', 1, 'https://i0.wp.com/metodologic.net/wp-content/uploads/2017/01/FFXV_portada-1.jpg?fit=800%2C571&ssl=1'),
(29, 'Grim Dawn', 3.00, '2016-02-25', 'Enter an apocalyptic fantasy world where humanity is on the brink of extinction, iron is valued above gold and trust is hard earned. This ARPG features complex character development, hundreds of unique items, crafting and quests with choice & consequence.\nKey Features\nDual Class - Combine any of six distinct classes with over 25 skills and modifiers per class. Base classes include Soldier, Demolitionist, Occultist, Nightblade, Arcanist and Shaman.\nHundreds of Item Skills - Augment your class build with a diverse array of over 250 unique skills granted by items and equipment add-ons.\nCollect hundreds of Items - Common, magical, rare, epic and legendary classes of loot. Plus over 20,000 possible magical affix combinations and over 200 rare affixes.\nQuests with Choice and Consequence - You will face tough decisions that leave significant impacts upon the world. Strangers on the road, desperate families and even entire villages may live or perish based on your actions. Currently over 35 quests with 75+ lore notes to be collected.\nFriendly and Enemy Factions - Earn favor with human factions to unlock additional quest lines, vendor discounts and special faction-based items and augments. Some neutral factions can be turned into allies but aiding one will make the enemy of another. Hostile factions will remember your deeds and deepen their hatred of you, sending out large packs and elite heroes to hunt you down.\nDevotion, an additional layer of skill customization allows you to acquire bonuses and powerful secondary effects for your class skills. These are unlocked from a giant constellation map with points acquired by finding and restoring destroyed or corrupted shrines hidden throughout the world.\nRebuild the World - Help human enclaves survive and flourish by securing vital necessities, rebuilding structures and rescuing survivors who can then lend their services to your cause.\n4 Person Multiplayer - Connect with Friends or make new allies in glorious multiplayer. Multiplayer encounters will put your teamwork to the ultimate challenge.\nFast-paced Visceral Combat - Enemy blood spatters, ragdoll physics and satisfying enemy death effects. Smash in doors and fight house to house, leaving a path of demolished furniture in your wake.\nRotatable Camera - If you choose to survey the full beauty of the world and always fight from the most optimal angle. Levels are still designed so that players are not forced to rotate the camera; it is purely optional.\nSecrets and Perils Abound - 200+ Enemy heroes and bosses, hand-configured with their own unique arrays of deadly skills. 20+ secret areas hidden behind crumbling walls, hidden gaps and mysterious locked doors. Explode obstacles or repair structures to open new paths.\nRogue-Like Dungeons - Descend into special locked challenge dungeons that require a rare crafted key, where enemy levels increase as you progress and player teleport is disabled. There is no way out except to complete the dungeon or die trying.\nDynamic Weather - The world is brought to life with region-specific climates and a variety of weather effects. A sunny day can cloud over with mild rain showers that builds into a booming thunderstorm. Variable wind gusts blow grass and affect objects like windmills.\nRecipe Based Crafting - Collect over 250 crafting recipes that allow you to combine salvaged components into unique crafted items and then, later, use those basic crafted items with higher-tiered recipes to complete items of amazing power.\nReclaim Skill Points - The ability to pay to reclaim points alleviates the fear and frustration of having to make early, uninformed skill choices that could permanently gimp a character.\n', 1, 'https://cdn.cloudflare.steamstatic.com/steam/apps/219990/capsule_616x353.jpg?t=1709073331'),
(30, 'Guild Wars II', 3.00, '2022-05-23', 'El mundo abierto de Guild Wars 2 se basa en el descubrimiento y la exploración. Echa un vistazo a nuestra guía de contenido para ver sugerencias al comenzar tu aventura, consulta tu brújula para encontrar lugares interesantes... o escoge la dirección que más te guste y viaja hasta que sea la aventura la que te encuentre a ti. Tyria está llena de personajes con sus propias historias y objetivos, y tú recibirás recompensas por ayudarlos (o por frustrar sus planes) al completar corazones de prestigio y eventos dinámicos. Consulta nuestra nueva guía para jugadores nuevos para ver más consejos.\r\n', 1, 'https://guildwars2.staticwars.com/wp-content/themes/guildwars2.com-live/img/og-img.f6214476.jpg'),
(31, 'Battlefield 3', 3.00, '2011-10-28', 'Aumenta la intensidad en Battlefield 3™ y disfruta de libertad plena para luchar como tú quieras. Explora nueve gigantescos mapas multijugador y haz uso de multitud de vehículos, armas y dispositivos para ponerte por delante. Cada segundo de batalla te dejará más cerca de desbloquear un montón de extras.\r\n\r\nCaracterísticas principales:\r\n\r\nJuega al límite. Hay cuatro clases (Asalto, Ingeniero, Apoyo y Reconocimiento), cada una con sus especialidades, y la colaboración entre ellas es clave para la victoria.\r\nVe a donde quieras, haz lo que quieras. Dirige cualquier vehículo que encuentres, desde tanques a buggies, pasando por helicópteros y cazas. ¡Podrás incluso estrellar un F/A-18E Super Hornet directamente sobre el enemigo!\r\nExperimenta el caos total. Disfruta de nueve mapas multijugador. ¿Entornos con destrucción sin igual? Sí. ¿Amplios espacios abiertos para un combate de vehículos desmadrado? Recibido.\r\nConsigue montones de desbloqueables. En cada batalla ganarás rangos, galones, medallas y más; que te servirán para mejorar tu destreza. Puedes ser fiel a tu helicóptero, ser un as del aire y desbloquear bengalas infrarrojas que alerten sobre misiles; o aumentar tus capacidades de sigilo.\r\nLa Edición Premium de Battlefield 3 incluye:\r\nEl juego con los cinco packs de expansión. La Edición Premium contiene 20 mapas nuevos, 20 armas nuevas, 10 vehículos nuevos y 4 nuevos modos de juego.\r\nKit de ventaja multijugador. Desbloquea al instante 15 armas avanzadas, además de otros dispositivos, mejoras de vehículos y más.\r\nNuevas funciones. Reinicia las estadísticas para empezar de cero, tener prioridad en colas de servidores y obtener nuevos distintivos para los emblemas de tus pelotones. Además, únete a eventos exclusivos como los fines de semana de Doble EXP y participa en competiciones exclusivas.\r\nObjetos de juego exclusivos. Consigue objetos de juego exclusivos que no están disponibles en ninguna otra parte, como nuevos camuflajes para soldado y armas, el cuchillo ACB-90 o un montón de chapas exclusivas.', 2, 'https://www.mundodeportivo.com/alfabeta/hero/2024/03/battlefield-3-remaster.jpg?width=768&aspect_ratio=16:9&format=nowebp'),
(32, 'Helldivers 2', 3.00, '2024-02-08', 'La última línea de ataque de la galaxia. Alístate en los Helldivers y únete a la lucha por la libertad en una galaxia hostil en un juego de disparos en tercera persona rápido, frenético y feroz.', 2, 'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/capsule_616x353.jpg?t=1709666906'),
(33, 'Tom Clancy´s Rainbow Six Siege', 3.00, '2015-12-01', 'Tom Clancy\'s Rainbow Six® Siege es un shooter táctico realista por equipos donde una cuidadosa planificación y ejecución son claves para la victoria.', 2, 'https://www.emp-online.es/on/demandware.static/-/Library-Sites-EMPSharedLibrary/default/dw21d9d50f/images/blog/blog-es/11330/rainbow-six-siege.jpg'),
(34, 'Star Wars Battlefront II', 3.00, '2015-11-16', 'La Ed. Ultimate de STAR WARS™ Battlefront™ incluye la Ed. Deluxe de STAR WARS™ Battlefront™ además del pase de temporada de STAR WARS™ Battlefront™.', 2, 'https://media.contentapi.ea.com/content/dam/walrus/celebration-edition/swbf2-blog-image-ce-rise-of-skywalker-keyart.jpg.adapt.crop191x100.628p.jpg'),
(35, 'Wolfenstein The New Order', 3.00, '2014-05-20', 'Wolfenstein®: The New OrderTM revitaliza la serie que creó el género de los shooters en primera persona. MachineGames, un estudio compuesto por un veterano grupo de desarrolladores muy laureados por su labor creando juegos impulsados por la trama, han sido los encargados de desarrollar Wolfenstein, que ofrece una elaborada narrativa repleta de acción, aventura y combate en primera persona.', 2, 'https://pivigames.blog/wp-content/uploads/2017/05/328778-analisis-wolfenstein-new-order.jpg'),
(36, 'Hunt Showdown', 3.00, '2019-08-27', 'Hunt: Showdown es un emocionante shooter de alto riesgo en primera persona para JcJcE. Elimina monstruos de pesadilla, mientras compites por las recompensas que te llevarán a alcanzar la gloria, el equipo y el oro en esta experiencia multijugador online implacable e inolvidable.', 2, 'https://portal.33bits.net/wp-content/uploads/2020/05/Hunt-Showdown.jpg'),
(37, 'Superhot', 3.00, '2016-02-25', 'En SUPERHOT se desdibujan los límites entre estrategia precavida y caos desatado, creando un shooter en primera persona donde el tiempo solo se mueve si tú lo haces. Sin barras de salud que se regeneren. Ni alijos de municiones convenientemente situados. Solo estás tú, superado en número y armamento, aunque podrás recoger las armas de los enemigos abatidos, disparando, dando tajos y maniobrando en medio de un aluvión de balas a cámara lenta.', 2, 'https://assetsio.gnwcdn.com/ar6vr.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp'),
(38, 'Gray Zone Warfare', 3.00, '2024-04-30', 'Gray Zone Warfare es un juego de disparos táctico en 1.ª persona. Únete a una empresa militar privada y explora un gran mundo abierto en un multijugador masivo con modos PvEvP y PvE. Diseña estrategias y sobrevive contra enemigos humanos y de IA mientras descubres los misterios de la isla de Lamang.', 2, 'https://cdn.cloudflare.steamstatic.com/steam/apps/2479810/capsule_616x353.jpg?t=1714668079'),
(39, 'Metro Exodus', 3.00, '2019-02-14', 'Huye de las ruinas devastadas del metro de Moscú y embárcate en un viaje épico por todo el continente en las estepas de la Rusia postapocalíptica. Explora niveles no lineales enormes, sobrevive en un mundo abierto y sigue una narrativa apasionante que abarca todo un año en la mayor aventura de Metro hasta ahora.', 2, 'https://laedicionespecial.es/wp-content/uploads/2019/02/Metro-Exodus-portada-invierno.jpg'),
(40, 'Borderlands 3', 3.00, '2020-03-13', '¡Vuelve el padre de los shooter-looter, con tropecientas mil armas y una aventura caótica! Arrasa a tus enemigos y descubre mundos inéditos con uno de los cuatro nuevos buscacámaras. Juega solo o con amigos para derribar a adversarios increíbles, hacerte con montones de botín y salvar tu hogar de la secta más cruel de la galaxia.', 2, 'https://i.blogs.es/juegos/11199/borderlands_3/fotos/noticias/borderlands_3-4855853.jpg'),
(41, '7 Days to Die', 3.00, '2013-12-13', '7 Days to Die es un juego de mundo abierto que combina de forma extraordinaria juegos de disparos en primera persona, supervivencia de terror, defensa de torres y rol. Juega al primer RPG de supervivencia zombi de entorno abierto. ¡Navezgane te espera!', 3, 'https://www.yosoyungamer.cloud/wp-content/uploads/2016/05/7D2D_KeyArt-980x551.jpg'),
(42, 'Rust', 3.00, '2018-02-08', 'El único objetivo en Rust es sobrevivir. Todo quiere que mueras - la vida silvestre de la isla y otros habitantes, el medio ambiente, otros sobrevivientes. Haz lo que sea necesario para pasar otra noche.', 3, 'https://www.mundodeportivo.com/alfabeta/hero/2021/01/rust-portada.jpg?width=768&aspect_ratio=16:9&format=nowebp'),
(43, 'Dayz', 3.00, '2018-12-13', '¿Cuánto podrás sobrevivir en un mundo posapocalíptico? Es una tierra plagada de zombis infectados donde compites por recursos escasos. ¿Colaborarás con desconocidos y permaneceréis juntos? ¿O irás de lobo solitario para evitar traiciones? Esto es DayZ. Esta es tu historia.', 3, 'https://i.ebayimg.com/images/g/7QIAAOSw10ZkFLJE/s-l1600.jpg'),
(44, 'Project Zomboid', 3.00, '2013-11-08', 'Project Zomboid is the ultimate in zombie survival. Alone or in MP: you loot, build, craft, fight, farm and fish in a struggle to survive. A hardcore RPG skillset, a vast map, massively customisable sandbox and a cute tutorial raccoon await the unwary. So how will you die? All it takes is a bite..', 3, 'https://cdn.cloudflare.steamstatic.com/steam/apps/108600/capsule_616x353.jpg?t=1691508011'),
(45, 'Subnautica', 3.00, '2018-01-23', 'Desciende a las profundidades de un mundo submarino alienígena lleno de belleza y peligros. Crea equipamiento, pilota submarinos, terraforma el terreno, y burla los peligros para explorar exhuberantes arrecifes de coral, volcanes, sistemas de cuevas y más - Todo mientras intentas sobrevivir.', 3, 'https://www.revogamers.net/wp-content/uploads/2021/05/Subnautica-e1621376884348.jpg'),
(46, 'Valheim', 3.00, '2021-02-02', 'Un brutal juego de supervivencia y exploración multijugador, ambientado en un purgatorio generado de forma procedural e inspirado en la cultura vikinga. ¡Lucha, construye y conquista tu viaje en una saga digna de la bendición de Odin!', 3, 'https://www.somosxbox.com/wp-content/uploads/2022/11/Valheim-portada-imagen-585x329.jpg?mrf-size=m'),
(47, 'V Rising', 3.00, '2022-05-12', 'Despierta siendo un vampiro. Sal en busca de sangre para recuperar tus fuerzas y evade la abrasadora luz solar para sobrevivir. Alza tu castillo y progresa en un mundo abierto lleno de misterios que cambia constantemente. Gana aliados en línea y conquista las tierras de los vivos.', 3, 'https://cdn1.idcgames.com/storage/image/1367/thumb_slider/default.jpg'),
(48, 'Sons of The Forest', 3.00, '2024-02-22', 'Enviado a buscar a un multimillonario desaparecido en una isla remota, te encuentras en un paisaje infernal infestado de caníbales. Crea, construye y lucha para sobrevivir, solo o con amigos, en este aterrador simulador de terror de supervivencia de mundo abierto.', 3, 'https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/capsule_616x353.jpg?t=1708624856'),
(49, 'Ark Survival Ascended', 3.00, '2023-10-26', '¡Ark se reinventa desde cero en esta próxima generación de tecnología de videojuegos con Unreal Engine 5! Forma una tribu, domestica y cría cientos de dinosaurios únicos y criaturas primitivas, exploran, cree, construyen y luchan hasta la cima de la cadena alimentaria. ¡Tu nuevo mundo te espera!', 3, 'https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/capsule_616x353.jpg?t=1712339593'),
(50, 'Raft', 3.00, '2022-06-20', '¡Raftạ te lanza a ti y a tus amigos en una aventura oceánica épica! ¡Solos o juntos, los jugadores luchan para sobrevivir a un peligroso viaje a través de un vasto mar! Recoge escombros, recoge arrecifes y construye tu propio hogar flotante, ¡pero ten cuidado con los tiburones devoradores de hombres!', 3, 'https://hardzone.es/app/uploads-hardzone.es/2022/11/raft1-1.jpg?x=480&y=375&quality=40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genre`
--

INSERT INTO `genre` (`id`, `nombre`) VALUES
(1, 'rol'),
(2, 'shooter'),
(3, 'survival'),
(4, 'acción'),
(5, 'plataformas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` enum('admin','user') DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `usuario`, `contraseña`, `rol`, `email`, `nombre`, `apellido`, `img`) VALUES
(9, 'agantz', '$2b$10$iY3aKc2XTLCGJjrYl/KKceXCkPKX/ET2D/jDcu6b663QhHFIQUP9u', 'user', 'popo@popo.com', 'ale', 'serafin', NULL),
(10, 'hunter', '$2b$10$GydJCe9gJ9L8h1RLH9dr1edlC0n7URGIEHZLwmhG00vWGpjMmt2fq', 'user', 'prueba@prueba.com', 'ale', 'serafin', NULL),
(11, 'nigger', '$2b$10$lZY9PIjD4nVNMh6BBNOp6el39DxkUzqp4OazaZ9aKJs/mVImiXowy', 'user', 'pepe@pepe.com', 'pepe', 'de la cruz', NULL),
(12, 'ale', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'popo@popo.com', 'pedropedro', 'pedro', NULL),
(13, 'aaaaaa', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'user', 'aa@aa.com', 'aaaaaa', 'aaaa', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `cart_game`
--
ALTER TABLE `cart_game`
  ADD PRIMARY KEY (`cart_id`,`game_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indices de la tabla `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indices de la tabla `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `cart_game`
--
ALTER TABLE `cart_game`
  ADD CONSTRAINT `cart_game_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `cart_game_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);

--
-- Filtros para la tabla `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
