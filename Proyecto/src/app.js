import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vortex_Admin',
    password: 'Vortex_7788.',
    database: 'vortexdb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos VortexDB establecida');
});

// Sirve los archivos estáticos de tu aplicación React
app.use(express.static(path.join(__dirname, '/dist')));

// Cuando accedas a cualquier ruta, tu servidor Express servirá tu aplicación React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM User WHERE usuario = ?';
    db.query(sql, [username], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const user = result[0];

            // Compara la contraseña proporcionada con la versión hasheada en la base de datos
            bcrypt.compare(password, user.contraseña, (err, isMatch) => {
                if (err) {
                    res.json({ success: false, message: err.message });
                } else if (isMatch) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: 'Contraseña incorrecta' });
                }
            });
        } else {
            res.json({ success: false, message: 'Usuario no encontrado' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;

    // Verifica si el nombre de usuario ya existe
    const checkSql = 'SELECT * FROM User WHERE usuario = ?';
    db.query(checkSql, [username], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // Si el nombre de usuario ya existe, envía un mensaje de error
            res.json({ success: false, message: 'El usuario ya existe' });
        } else {
            // Si el nombre de usuario no existe, hashea la contraseña y registra al usuario
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.json({ success: false, message: err.message });
                } else {
                    const sql = 'INSERT INTO User (usuario, nombre, apellido, email, contraseña, rol) VALUES (?, ?, ?, ?, ?, "user")';
                    db.query(sql, [username, firstName, lastName, email, hash], (err, result) => {
                        if (err) {
                            res.json({ success: false, message: err.message });
                        } else {
                            res.json({ success: true });
                        }
                    });
                }
            });
        }
    });
});



app.listen(5173, () => console.log('El servidor está corriendo en el puerto 5173'));
