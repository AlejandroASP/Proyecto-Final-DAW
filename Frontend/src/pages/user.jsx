import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTranslation } from 'react-i18next';

function User() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Lógica para obtener la información del perfil del usuario al cargar la página
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "No se pudo obtener la información del perfil del usuario"
        );
      }

      const userData = await response.json();
      console.log("Información del usuario:", userData);
    } catch (error) {
      console.error(
        "Error al obtener la información del perfil del usuario:",
        error
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;
    setUserData({
      ...userData,
      [name]: newValue,
    });

    if (type === "file") {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 p-3 min-h-screen flex items-center">
        <div className="container px-8 pt-6 pb-8 mx-auto flex flex-col bg-black bg-opacity-45 border border-white-500 border-4 rounded md:w-2/3">
          <h1 className="text-2xl text-3xl font-extrabold text-white mb-4">
            {t('edit_profile')}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Imagen de perfil en la izquierda para escritorio y centrada para tablet y móvil */}
            <div className="mb-4 md:mr-8 md:w-1/3 flex justify-center md:justify-start flex flex-col items-center">
              <label
                htmlFor="profileImage"
                className="block text-white mb-1 "
              >
                {t('profile_image')}
              </label>
              <div className="max-w-xs w-full relative">
                {userData.profileImage && (
                  <img
                    src={URL.createObjectURL(userData.profileImage)}
                    alt="Profile"
                    className="my-4 w-full md:w-auto rounded-full"
                  />
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                  accept="image/*"
                />
                <span className="block w-full py-2 px-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center cursor-pointer ">
                  {fileName || t('select_image')}
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-2/3">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-white mb-2 "
                >
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-white mb-2"
                >
                  {t('sur_name')}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white mb-2"
                >
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white mb-2"
                >
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-white mb-2"
                >
                  {t('confirm_passw')}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                {t('save_changes')}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default User;
