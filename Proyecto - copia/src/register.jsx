import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log('handleSubmit called');
    event.preventDefault();

    // Recoge la información del formulario
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const confirmEmail = event.target.elements.confirmEmail.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    // Verifica si los correos electrónicos y las contraseñas coinciden
    if (email !== confirmEmail) {
      alert('Los correos electrónicos no coinciden');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crea el objeto usuario
    const user = {
      username: firstName + ' ' + lastName, // Esto asume que 'usuario' es el nombre completo
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
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <div className="content-register">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input type="text" name="firstName" />
        </label>
        <label>
          Apellidos
          <input type="text" name="lastName" />
        </label>
        <label>
          Correo electrónico
          <input type="email" name="email" />
        </label>
        <label>
          Confirmar correo electrónico
          <input type="email" name="confirmEmail" />
        </label>
        <label>
          Contraseña
          <input type="password" name="password" />
        </label>
        <label>
          Confirmar contraseña
          <input type="password" name="confirmPassword" />
        </label>
        <label>
          Confirmar contraseña
          <input type="password" name="confirmPassword" />
        </label>
        <label>
          Confirmar contraseña
          <input type="password" name="confirmPassword" />
        </label>
        <input className='register' type="submit" value="Registrarse" />
      </form>
    </div>
  );
}

export default Register;
