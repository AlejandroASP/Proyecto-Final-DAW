import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer'
import Header from '../header';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        fetch('http://localhost:5173/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Si el inicio de sesión es exitoso, redirige al usuario
                    navigate('/');
                } else {
                    // Si hay un error, muestra un mensaje de error
                    console.error('Error:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    };

    return (
        <>
        <Header/>
            <div className='content-login'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Usuario
                        <input type="text" name="username" />
                    </label>
                    <label>
                        Contraseña
                        <input type="password" name="password" />
                    </label>
                    <input className='login_button' type="submit" value="Iniciar sesión" />
                    <div>
                        <p>¿No tienes una cuenta? <Link to="/register">Registrate</Link></p>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;
