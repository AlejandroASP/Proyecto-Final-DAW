import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

function User() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setUserData({
            ...userData,
            [name]: newValue
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
    };

    return (
        <>
            <Header />
            <div className='bg-violet-900 p-3 min-h-screen flex items-center'>
                <div className="container px-8 pt-6 pb-8 mx-auto flex flex-col bg-white rounded md:w-2/3">
                    <h1 className="text-2xl text-3xl font-extrabold text-gray-900 mb-4">Editar Perfil</h1>
                    <div className="flex flex-col md:flex-row md:items-center">
                        {/* Imagen de perfil en la izquierda para escritorio y centrada para tablet y móvil */}
                        <div className="mb-4 md:mr-8 md:w-1/3 flex justify-center md:justify-start flex flex-col items-center">
                            <label htmlFor="profileImage" className="block text-gray-700 font-bold">Imagen de Perfil</label>
                            <div className="max-w-xs w-full">
                                {userData.profileImage && (
                                    <img src={URL.createObjectURL(userData.profileImage)} alt="Profile" className="my-4 w-full md:w-auto rounded-full" />
                                )}
                                <input type="file" id="profileImage" name="profileImage" onChange={handleChange} className="border rounded w-full py-2 px-3" accept="image/*" />
                                
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full md:w-2/3">
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2 ">Nombre</label>
                                <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Apellido</label>
                                <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
                                <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Contraseña</label>
                                <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirmar Contraseña</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default User;
