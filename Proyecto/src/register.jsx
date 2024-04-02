// Register.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Después de registrar al usuario, redirige a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="firstName" />
      </label>
      <label>
        Apellidos:
        <input type="text" name="lastName" />
      </label>
      <label>
        Correo electrónico:
        <input type="email" name="email" />
      </label>
      <label>
        Confirmar correo electrónico:
        <input type="email" name="confirmEmail" />
      </label>
      <label>
        Contraseña:
        <input type="password" name="password" />
      </label>
      <label>
        Confirmar contraseña:
        <input type="password" name="confirmPassword" />
      </label>
      <input type="submit" value="Registrarse" />
    </form>
  );
}

export default Register;
