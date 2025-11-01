import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../paginas/perfil.module.css';
import { proyectoSchema } from '../validations/proyecto.js';

function Proyecto({
  onCerrar,
  onAgregarProyecto,
  nombre,
  descripcion,
  tecnologias,
  onModificarProyecto,
  esEdicion,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(proyectoSchema),
    mode: 'onChange',
    defaultValues: {
      nombre: nombre || '',
      descripcion: descripcion || '',
      tecnologias: tecnologias || '',
    },
  });

  useEffect(() => {
    reset({
      nombre: nombre || '',
      descripcion: descripcion || '',
      tecnologias: tecnologias || '',
    });
  }, [nombre, descripcion, tecnologias, reset]);

  const onSubmit = async (data) => {
  try {
    if (esEdicion && onModificarProyecto) {
      await onModificarProyecto(data); // se llama PUT
    } else if (onAgregarProyecto) {
      await onAgregarProyecto(data);  // se llama POST
    }
    if (onCerrar) onCerrar();
  } catch (error) {
    console.error("Error al guardar el proyecto:", error);
  }
};


  return (
    <div>
      {/* Barra superior con título y botón de cerrar */}
      <div className={styles.barra1} style={{ marginBottom: '1.5rem' }}>
        <h1 >{onModificarProyecto ? "Editar Proyecto" : "Agregar Proyecto"}</h1>
        <button className={styles.cancelar} onClick={onCerrar}>X</button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '0 2rem 2rem' }}>
        
        {/* Nombre */}
        <div className={styles.barra3}>
          <input
            className={`${styles.co} ${errors.nombre ? styles.inputError : ''}`}
            placeholder="Nombre del proyecto"
            type="text"
            {...register("nombre")}
          />
          <label>Nombre del proyecto</label>
          {errors.nombre && (
            <span className={styles.errorBrillante}>{errors.nombre.message}</span>
          )}
        </div>

        {/* Descripción */}
        <div className={styles.barra3}>
          <input
            className={`${styles.co} ${errors.descripcion ? styles.inputError : ''}`}
            placeholder="Describe brevemente el proyecto"
            type="text"
            {...register("descripcion")}
          />
          <label>Descripción</label>
          {errors.descripcion && (
            <span className={styles.errorBrillante}>{errors.descripcion.message}</span>
          )}
        </div>

        {/* Tecnologías */}
        <div className={styles.barra3}>
          <input
            className={`${styles.co} ${errors.tecnologias ? styles.inputError : ''}`}
            placeholder="Ej: React, Node.js, MongoDB"
            type="text"
            {...register("tecnologias")}
          />
          <label>Tecnologías usadas</label>
          {errors.tecnologias && (
            <span className={styles.errorBrillante}>{errors.tecnologias.message}</span>
          )}
        </div>

        {/* Botón de aceptar */}
        <div className={styles.boton}>
          <button
            type="submit"
            className="btn btn-bordo-danger"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Guardando...'
              : onModificarProyecto
              ? 'Guardar cambios'
              : 'Aceptar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Proyecto;