import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
const usernameRegex = /^[a-zA-Z0-9-_]+$/;

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const confirmEmail = event.target.elements.confirmEmail.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    const newErrors = {};

    if (!usernameRegex.test(username)) {
      newErrors.username =
        "❌ Nombre de usuario no válido, no utilice espacios ni caracteres especiales";
    }
    if (!nameRegex.test(firstName)) {
      newErrors.firstName = "❌ Nombre no válido, no puede contener números";
    }
    if (!nameRegex.test(lastName)) {
      newErrors.lastName = "❌ Apellido no válido, no puede contener números";
    }
    if (!emailRegex.test(email)) {
      newErrors.email =
        "❌ Email no válido, asegúrese de usar un formato de correo electrónico correcto";
    }
    if (email !== confirmEmail) {
      newErrors.confirmEmail = "❌ Los correos electrónicos no coinciden";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "❌ La contraseña debe tener entre 6 y 12 caracteres, una mayúscula y un símbolo especial";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "❌ Las contraseñas no coinciden";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = {
      username,
      firstName,
      lastName,
      email,
      password,
      rol: "user",
    };

    fetch("http://localhost:3002/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Error en el registro");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrors({ general: error.message });
      });
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900">
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-black bg-opacity-45 border-white-500 border-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md">

            <h2 className="text-center text-3xl font-extrabold text-white">
              {t("register")}
            </h2>
            {errors.general && (
              <div className="text-red-600">{errors.general}</div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    {t("username")}
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("username")}
                  />
                  {errors.username && (
                    <div className="text-red-600">{errors.username}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    {t("name")}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("name")}
                  />
                  {errors.firstName && (
                    <div className="text-red-600">{errors.firstName}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    {t("sur_name")}
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("sur_name")}
                  />
                  {errors.lastName && (
                    <div className="text-red-600">{errors.lastName}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("email")}
                  />
                  {errors.email && (
                    <div className="text-red-600">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirmEmail" className="sr-only">
                    {t("confirm_email")}
                  </label>
                  <input
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("confirm_email")}
                  />
                  {errors.confirmEmail && (
                    <div className="text-red-600">{errors.confirmEmail}</div>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    {t("password")}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("password")}
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
                  {errors.password && (
                    <div className="text-red-600">{errors.password}</div>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="confirmPassword" className="sr-only">
                    {t("confirm_passw")}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={t("confirm_passw")}
                  />
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
                  {errors.confirmPassword && (
                    <div className="text-red-600">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("register")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
