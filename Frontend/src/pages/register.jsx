import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"; // Importa los iconos de ojo y ojo desactivado de Heroicons v2

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar la contraseña repetida

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
      setError("Los correos electrónicos no coinciden");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Crea el objeto usuario
    const user = {
      username,
      firstName,
      lastName,
      email,
      password,
      rol: "user",
    };

    // Hace una petición POST al servidor para registrar al usuario
    fetch("http://localhost:3002/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Si el registro es exitoso, redirige a la página de inicio de sesión
          navigate("/login");
        } else {
          // Si hay un error, muestra el mensaje de error
          setError(data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900">
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-black bg-opacity-45 border border-white-500 border-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Registrarse
            </h2>
            {error && (
              <div className="text-red-600 text-center mb-4">{error}</div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Nombre de usuario
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nombre"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Apellidos
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Apellidos"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div>
                  <label htmlFor="confirmEmail" className="sr-only">
                    Confirmar correo electrónico
                  </label>
                  <input
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmar correo electrónico"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                  />
                  {/* Botón de ojo para mostrar/ocultar la contraseña */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmar contraseña"
                  />
                  {/* Botón de ojo para mostrar/ocultar la contraseña repetida */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Registrarse
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <p className="text-sm text-white">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
