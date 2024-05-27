import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

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

const SelectAvatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate(); // Para la redirección

  const handleAvatarSelection = async (avatarNumber) => {
    try {
      console.log("Enviando número de avatar:", avatarNumber); // Verificar el número de avatar

      const response = await fetch("http://localhost:3002/api/user/profile/avatar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ imgNumber: avatarNumber }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "No se pudo actualizar el avatar del usuario"
        );
      }

      console.log("Avatar del usuario actualizado exitosamente");
      setSelectedAvatar(avatarNumber);
      navigate("/user"); // Redirigir al perfil del usuario
    } catch (error) {
      console.error("Error al actualizar el avatar del usuario:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center bg-gradient-to-b from-violet-900 to-pink-900 p-4">
        <h1 className="text-white text-4xl mb-16">¡Selecciona tu nuevo Avatar!</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {avatarImages.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className={`cursor-pointer max-w-full max-h-52 transition-transform duration-300 transform hover:scale-110 ${
                selectedAvatar === index + 1 ? "border-4 border-green-500" : ""
              }`}
              onClick={() => handleAvatarSelection(index + 1)} // Envía el número de avatar seleccionado
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelectAvatar;
