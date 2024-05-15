// import express from 'express';
// import cors from 'cors';
// import mysql from 'mysql';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import bcrypt from 'bcrypt';
// import multer from 'multer';
// import session from 'express-session';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const upload = multer({ dest: 'uploads/' });

// const app = express();

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'Vortex_Admin',
//     password: 'Vortex_7788.',
//     database: 'vortexdb'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Conexión a la base de datos VortexDB establecida');
// });

// // Sirve los archivos estáticos de tu aplicación React
// app.use(express.static(path.join(__dirname, '/dist')));

// app.use(session({
//     secret: 'PapasConMojo',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // establece esto en true si estás en https
// }));


// // Funcionalidad para editar el perfil de usuario
// app.put('/update-profile', upload.single('img'), async (req, res) => {
//     const { usuario, contraseñaActual, contraseñaNueva } = req.body;
//     const img = req.file;
//     const userId = req.session.userId;
//     // Primero, obtenemos el usuario de la base de datos
//     db.query('SELECT * FROM User WHERE id = ?', [req.userId], async (error, results) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send({ message: 'Error al buscar el usuario' });
//             return;
//         }

//         if (results.length === 0) {
//             res.status(404).send({ message: 'Usuario no encontrado' });
//             return;
//         }

//         const user = results[0];

//         // Comprobamos si la contraseña actual es correcta
//         const match = await bcrypt.compare(contraseñaActual, user.contraseña);

//         if (!match) {
//             res.status(401).send({ message: 'Contraseña incorrecta' });
//             return;
//         }

//         // Si la contraseña es correcta, actualizamos la contraseña y el nombre del usuario
//         const hashedPassword = await bcrypt.hash(contraseñaNueva, 10);

//         const imgPath = img ? path.join(img.destination, img.filename) : user.img;

//         db.query('UPDATE User SET usuario = ?, contraseña = ?, img = ? WHERE id = ?', [usuario, hashedPassword, imgPath, req.userId], (error, results) => {
//             if (error) {
//                 console.log(error);
//                 res.status(500).send({ message: 'Error al actualizar el perfil' });
//                 return;
//             }

//             res.send({ message: 'Perfil actualizado con éxito' });
//         });
//     });
// });

// // Cuando accedas a cualquier ruta, tu servidor Express servirá tu aplicación React
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/dist', 'index.html'));
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     const sql = 'SELECT * FROM User WHERE usuario = ?';
//     db.query(sql, [username], (err, result) => {
//         if (err) throw err;

//         if (result.length > 0) {
//             const user = result[0];

//             // Compara la contraseña proporcionada con la versión hasheada en la base de datos
//             bcrypt.compare(password, user.contraseña, (err, isMatch) => {
//                 if (err) {
//                     res.json({ success: false, message: err.message });
//                 } else if (isMatch) {
//                     req.session.userId = user.id; // guarda el ID de usuario en la sesión
//                     res.json({ success: true });
//                 } else {
//                     res.json({ success: false, message: 'Contraseña incorrecta' });
//                 }
//             });
//         } else {
//             res.json({ success: false, message: 'Usuario no encontrado' });
//         }
//     });
// });

// // Funcionalidad de registro del usuario en la base de datos
// app.post('/register', (req, res) => {
//     const { username, firstName, lastName, email, password } = req.body;

//     // Verifica si el nombre de usuario ya existe
//     const checkSql = 'SELECT * FROM User WHERE usuario = ?';
//     db.query(checkSql, [username], (err, result) => {
//         if (err) throw err;

//         if (result.length > 0) {
//             // Si el nombre de usuario ya existe, envía un mensaje de error
//             res.json({ success: false, message: 'El usuario ya existe' });
//         } else {
//             // Si el nombre de usuario no existe, hashea la contraseña y registra al usuario
//             bcrypt.hash(password, 10, (err, hash) => {
//                 if (err) {
//                     res.json({ success: false, message: err.message });
//                 } else {
//                     const sql = 'INSERT INTO User (usuario, nombre, apellido, email, contraseña, rol) VALUES (?, ?, ?, ?, ?, "user")';
//                     db.query(sql, [username, firstName, lastName, email, hash], (err, result) => {
//                         if (err) {
//                             res.json({ success: false, message: err.message });
//                         } else {
//                             res.json({ success: true });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });

// app.get('/get-user', (req, res) => {
//     const userId = req.session.userId;

//     db.query('SELECT * FROM User WHERE id = ?', [userId], (error, results) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send({ message: 'Error al buscar el usuario' });
//             return;
//         }

//         if (results.length === 0) {
//             res.status(404).send({ message: 'Usuario no encontrado' });
//             return;
//         }

//         const user = results[0];

//         // Devuelve los detalles del usuario al cliente
//         res.json({ usuario: user.usuario, img: user.img });
//     });
// });


// app.listen(5173, () => console.log('El servidor está corriendo en el puerto 5173'));
import express from 'express';
import cors from 'cors';
import winston from 'winston';
import './server/db.js';
import './models/associations.js';

// import cartRouter from './server/routes/cart.js'; // Asumiendo que tienes un archivo cart.js en la carpeta routes
import gameRouter from './server/routes/game.js'; // Asumiendo que tienes un archivo game.js en la carpeta routes
import genreRouter from './server/routes/genre.js'; // Asumiendo que tienes un archivo genre.js en la carpeta routes
import userRouter from './server/routes/user.js'; // Asumiendo que tienes un archivo user.js en la carpeta routes
const app = express();
const port = process.env.PORT || 3002; // Utilizar el puerto definido en las variables de entorno o 3002 como predeterminado

const corsOptions = {
  origin: [`http://127.0.0.1:5173`, `http://localhost:5173`],
  optionsSuccessStatus: 200
};

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({limit: '50mb'}));

import './models/associations.js'; 

// app.use('/api/cart', cartRouter);
app.use('/api/game', gameRouter);
app.use('/api/genre', genreRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
