import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

function EditUser() {
    const [usuario, setUsuario] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [contraseñaNueva, setContraseñaNueva] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [img, setImg] = useState(null);

    useEffect(() => {
        // Aquí iría la lógica para obtener el nombre del usuario del servidor...
        // Por ejemplo:
        fetch('/get-user', {
            credentials: 'include', // incluye las cookies en la solicitud
        })
            .then(response => response.json())
            .then(data => setUsuario(data.usuario))
            .catch(error => console.error('Error al obtener el usuario', error));
    }, []);

    const handleUpdateProfile = async () => {
        if (contraseñaNueva !== confirmarContraseña) {
            alert('Las contraseñas nuevas no coinciden');
            return;
        }

        const formData = new FormData();
        formData.append('usuario', usuario);
        formData.append('contraseñaActual', contraseñaActual);
        formData.append('contraseñaNueva', contraseñaNueva);
        formData.append('img', img);

        try {
            const response = await fetch('/update-profile', {
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error al actualizar el perfil', error);
        }
    };

    return (
        <>
            <div className="content-edit">
                <div>
                    <label>Usuario:</label>
                    <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} />
                </div>
                <div>
                    <label>Contraseña Actual:</label>
                    <input type="password" value={contraseñaActual} onChange={e => setContraseñaActual(e.target.value)} />
                </div>
                <div>
                    <label>Contraseña Nueva:</label>
                    <input type="password" value={contraseñaNueva} onChange={e => setContraseñaNueva(e.target.value)} />
                </div>
                <div>
                    <label>Confirmar Contraseña Nueva:</label>
                    <input type="password" value={confirmarContraseña} onChange={e => setConfirmarContraseña(e.target.value)} />
                </div>
                <div>
                    <label>Imagen de Perfil:</label>
                    <input type="file" onChange={e => setImg(e.target.files[0])} />
                    {img && <img src={URL.createObjectURL(img)} alt="Imagen de Perfil" />}
                </div>
                <button onClick={handleUpdateProfile}>Actualizar Perfil</button>
                <div>
                    <Link to="/">Volver</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditUser;
