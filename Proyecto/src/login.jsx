import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí iría tu lógica de registro
  
      // Después de registrar al usuario, redirige a la página de inicio de sesión
      navigate('/');
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Usuario:
                <input type="text" name="username" />
            </label>
            <label>
                Contraseña:
                <input type="password" name="password" />
            </label>
            <input type="submit" value="Iniciar sesión" />
            <Link to="/register">Crear una cuenta</Link>
        </form>
    );
}

export default Login;