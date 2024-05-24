import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function User() {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null,
  });

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

      // Actualizar el estado con los datos del usuario obtenidos
      setUserData({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 p-3 min-h-screen flex items-center">
        <div className="container px-8 pt-6 pb-8 mx-auto flex flex-col bg-white rounded md:w-2/3">
          <h1 className=" text-3xl font-extrabold text-gray-900 mb-4">
            Ver Perfil
          </h1>
          <div className="flex flex-col md:flex-row md:items-center">
            {/* Imagen de perfil en la izquierda para escritorio y centrada para tablet y móvil */}
            <div className="mb-4 md:mr-8 md:w-1/3 flex justify-center md:justify-start flex-col items-center">
              <label
                htmlFor="profileImage"
                className="block text-gray-700 font-bold"
              >
                Imagen de Perfil
              </label>
              <div className="max-w-xs w-full">
                {userData.profileImage && (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="my-4 w-full md:w-auto rounded-full"
                  />
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  accept="image/*"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full md:w-2/3">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold mb-2 "
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border rounded w-full py-2 px-3"
                  disabled
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Modificar Informacíon
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
