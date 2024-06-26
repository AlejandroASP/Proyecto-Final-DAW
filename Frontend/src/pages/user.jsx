import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import avatar1 from "../assets/avatar/1.png";
import avatar2 from "../assets/avatar/2.png";
import avatar3 from "../assets/avatar/3.png";
import avatar4 from "../assets/avatar/4.png";
import avatar5 from "../assets/avatar/5.png";
import avatar6 from "../assets/avatar/6.png";
import avatar7 from "../assets/avatar/7.png";
import avatar8 from "../assets/avatar/8.png";
import avatar9 from "../assets/avatar/9.png";
import avatar10 from "../assets/avatar/10.png";
import avatar11 from "../assets/avatar/11.png";
import avatar12 from "../assets/avatar/12.png";
import avatar13 from "../assets/avatar/13.png";
import avatar14 from "../assets/avatar/14.png";

const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
const usernameRegex = /^[a-zA-Z0-9-_]+$/;

function User() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  const [fileName, setFileName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
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

      const avatarPath = userData.img ? avatarImages[userData.img - 1] : avatar1; // Ajuste para seleccionar la imagen correcta
      setAvatarUrl(avatarPath);

      setUserData({
        id: userData.id,
        username: userData.usuario,
        firstName: userData.nombre,
        lastName: userData.apellido,
        email: userData.email,
        profileImage: userData.img,
      });
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

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones del frontend
    const { username, firstName, lastName, email } = userData;
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "No se pudo modificar el perfil del usuario"
        );
      }

      console.log("Perfil del usuario actualizado exitosamente");
      setErrors({});
      setSuccessMessage("✅ Perfil actualizado con éxito");
      setIsEditing(false);
    } catch (error) {
      setErrors({ general: error.message });
      console.error("Error al modificar el perfil del usuario:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 p-3 flex items-center">
        <div className="container px-8 pt-6 pb-8 mx-auto flex flex-col bg-black bg-opacity-45  border-white-500 border-4 rounded md:w-2/3">
          <h1 className=" text-3xl font-extrabold text-white mb-4">
            {isEditing ? t("edit_profile") : t("view_profile")}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-4 md:mr-8 md:w-1/3 flex justify-center md:justify-start flex-col items-center">
              <div className="max-w-xs w-full relative">
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="my-4 md:w-auto rounded-full"
                  />
                )}
                <Link to="/selectAvatar">
                  <input
                    type="text"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </Link>
                <span className="block w-full py-2 px-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center cursor-pointer">
                  {fileName || t("select_image")}
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-2/3">
              {errors.general && (
                <div className="text-red-600 mb-4">{errors.general}</div>
              )}
              {successMessage && (
                <div className="text-green-600 mb-4">{successMessage}</div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-white font-bold mb-2"
                >
                  {t("username")}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className={`border rounded w-full py-2 px-3 bg-black text-white ${
                    isEditing ? "" : "disabled"
                  }`}
                  disabled={!isEditing}
                />
                {errors.username && (
                  <div className="text-red-600">{errors.username}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-white mb-2">
                  {t("name")}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className={`border rounded w-full py-2 px-3 bg-black text-white ${
                    isEditing ? "" : "disabled"
                  }`}
                  disabled={!isEditing}
                />
                {errors.firstName && (
                  <div className="text-red-600">{errors.firstName}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-white mb-2">
                  {t("sur_name")}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className={`border rounded w-full py-2 px-3 bg-black text-white ${
                    isEditing ? "" : "disabled"
                  }`}
                  disabled={!isEditing}
                />
                {errors.lastName && (
                  <div className="text-red-600">{errors.lastName}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">
                  {t("email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className={`border rounded w-full py-2 px-3 bg-black text-white ${
                    isEditing ? "" : "disabled"
                  }`}
                  disabled={!isEditing}
                />
                {errors.email && (
                  <div className="text-red-600">{errors.email}</div>
                )}
              </div>
              <button
                type="button"
                onClick={isEditing ? handleSubmit : handleEditClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                {isEditing ? t("save_changes") : t("edit_profile")}
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
