import { useState } from 'react';

function RecoverPassword() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-black bg-opacity-45 border border-white-500 border-4 shadow-md rounded px-8 pt-6 pb-6 mb-4 w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-white">
                Recuperar Contraseña
                </h2>
                {/*Provisionalmente desactivado*/}
                {/* {error && (
                <div className="text-red-600 text-center mb-4">{error}</div>
                )} */}
                <p className='mt-8 text-white'>Introduzca su correo electronico para verificar su identidad</p>
                <form className="mt-3 space-y-6">
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
                    <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Enviar correo
                    </button>
                </div>
                </form>
            </div>
          </div>
    );
}

export default RecoverPassword;
