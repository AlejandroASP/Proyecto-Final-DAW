import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

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

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
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

app.listen(5173, () => console.log('El servidor está corriendo en el puerto 5173'));
