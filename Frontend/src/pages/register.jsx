import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Recoge la información del formulario
    const username = event.target.elements.username.value;
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const confirmEmail = event.target.elements.confirmEmail.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    // Verifica si los correos electrónicos y las contraseñas coinciden
    if (email !== confirmEmail) {
      setError('Los correos electrónicos no coinciden');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Crea el objeto usuario
    const user = {
      username,
      firstName,
      lastName,
      email,
      password
    };

    // Hace una petición POST al servidor para registrar al usuario
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Si el registro es exitoso, redirige a la página de inicio de sesión
          navigate('/login');
        } else {
          // Si hay un error, muestra el mensaje de error
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Header />
      <div className="content-register">
        {error && <div onClick={() => setError(null)}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de usuario
            <input type="text" name="username" required />
          </label>
          <label>
            Nombre
            <input type="text" name="firstName" required />
          </label>
          <label>
            Apellidos
            <input type="text" name="lastName" required />
          </label>
          <label>
            Correo electrónico
            <input type="email" name="email" required />
          </label>
          <label>
            Confirmar correo electrónico
            <input type="email" name="confirmEmail" required />
          </label>
          <label>
            Contraseña
            <input type="password" name="password" required />
          </label>
          <label>
            Confirmar contraseña
            <input type="password" name="confirmPassword" required />
          </label>
          <input className='register' type="submit" value="Registrarse" />
        </form>
        <div>
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesion</Link></p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Register;
