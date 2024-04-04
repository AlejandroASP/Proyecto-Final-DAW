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

            if (user.contraseña === password) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Contraseña incorrecta' });
            }
        } else {
            res.json({ success: false, message: 'Usuario no encontrado' });
        }
    });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Hashea la contraseña antes de guardarla en la base de datos
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            const sql = 'INSERT INTO User (usuario, email, contraseña, rol) VALUES (?, ?, ?, "user")';
            db.query(sql, [username, email, hash], (err, result) => {
                if (err) {
                    res.json({ success: false, message: err.message });
                } else {
                    res.json({ success: true });
                }
            });
        }
    });
});

app.listen(5173, () => console.log('El servidor está corriendo en el puerto 5173'));
