
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer'
function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí iría tu lógica de registro

        // Después de registrar al usuario, redirige a la página de inicio de sesión
        navigate('/');
    };
    return (
        <>
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