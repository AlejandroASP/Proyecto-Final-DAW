import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    fetch("http://localhost:3002/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Si el inicio de sesión es exitoso, redirige al usuario
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("username", username);
          console.log("Token guardado en el sessionStorage:", data.token);
          navigate("/");
        } else {
          // Si hay un error, muestra un mensaje de error
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(
          "Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo."
        );
      });
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900">
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-black bg-opacity-45 border border-white-500 border-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Iniciar sesión
            </h2>
            {error && (
              <div className="text-red-600 text-center mb-4">{error}</div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Usuario
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Usuario"
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                  />
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
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
            <div className="text-center mt-3">
              <p className="text-sm text-white">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Regístrate
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

export default Login;
