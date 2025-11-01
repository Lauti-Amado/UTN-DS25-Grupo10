import React, { useState, useRef, useContext } from 'react';
import imagenDefault from '../assets/perfilx.png';
import styles from '../paginas/perfil.module.css';
import { DatosContexto } from '../datosContext';
import {API_URL } from '../config';

function Editar({ onCerrar, onActualizarPerfil, nombre, descripcion, FechaNac, imagen }) {
  const [previewSrc, setPreviewSrc] = useState(imagen || imagenDefault);
  const [nuevoNombre, setNuevoNombre] = useState(nombre || '');
  const [nuevaDescripcion, setNuevaDescripcion] = useState(descripcion || '');
  const [nuevaFechaNac, setNuevafecha] = useState(FechaNac || '');
  const fileInputRef = useRef(null);
  const { usuarioLogueado, setUsuarioLogueado } = useContext(DatosContexto);

  const abrirSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type.startsWith('image/')) {
      const lector = new FileReader();
      lector.onload = (event) => {
        setPreviewSrc(event.target.result);
      };
      lector.readAsDataURL(archivo);
    } else {
      alert('Por favor selecciona una imagen válida.');
    }
  };

  // Cuando se cambia el nombre, se hace la llamada a la API con un PUT para actualizar y guardar cambios
  const aceptarCambios = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!usuarioLogueado?.id || !token) {
      throw new Error('Usuario no logueado o token no disponible');
    }

    const formData = new FormData();
    formData.append('nombreUsuario', nuevoNombre);
    formData.append('descripcion', nuevaDescripcion);
    if (nuevaFechaNac) formData.append('fechaNacimiento', nuevaFechaNac);

    // ✅ Solo si el usuario subió una imagen nueva
    if (fileInputRef.current?.files[0]) {
      formData.append('fotoPerfil', fileInputRef.current.files[0]);
    }

    const response = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error al actualizar el perfil:', text);
      throw new Error('Error al actualizar el perfil');
    }

    const json = await response.json();
    const datos = json.data || json; // según cómo responde tu backend

    // ✅ Actualiza el contexto global
    setUsuarioLogueado(prev => ({
      ...prev,
      nombreUsuario: datos.nombreUsuario,
      descripcion: datos.descripcion,
      fechaNacimiento: datos.fechaNacimiento,
      fotoPerfil: datos.fotoPerfil || prev.fotoPerfil,
    }));

    // ✅ Llama al manejador del componente padre (Perfil.jsx)
    if (onActualizarPerfil) {
      onActualizarPerfil(
        datos.fotoPerfil || previewSrc,
        datos.nombreUsuario,
        datos.descripcion,
        datos.fechaNacimiento
      );
    }

  
    if (onCerrar) onCerrar();
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo actualizar el perfil. Intenta nuevamente.');
  }
};


  // Botones y funcionalidades
  return (
    <div>
      <div className={styles.barra1}>
        <h1>Editar Perfil</h1>
        <button className={styles.cancelar} onClick={onCerrar}>X</button>
      </div>

      <div className={styles.barra2}>
        <button className={styles.fotoper} onClick={abrirSelector}>Editar foto de perfil</button>
        <input
          className={styles.imagenPerfill}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <img src={previewSrc} className={styles.imagenPerfil2} alt="Vista previa" />
      </div>

      <div className={styles.barra3}>
        <input
          className={styles.co}
          placeholder="nombre"
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <label>Nombre</label>
      </div>

      <div className={styles.barra3}>
        <textarea
          className={styles.algo}
          type="text"
          value={nuevaDescripcion}
          onChange={(e) => setNuevaDescripcion(e.target.value)}
        />
        <label>Descripción</label>
      </div>

      <div className={styles.barra3}>
        <input
          className={styles.co}
          type="date"
          value={nuevaFechaNac}
          onChange={(e) => setNuevafecha(e.target.value)}
        />
        <label>Fecha de Nacimiento</label>
      </div>

      <div className={styles.boton}>
        <button className="btn btn-bordo-danger" onClick={aceptarCambios}>Aceptar</button>
      </div>
    </div>
  );
}

export default Editar;
