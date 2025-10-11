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
  onModificarProyecto
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(proyectoSchema),
    mode: 'onChange', // validación en tiempo real al cambiar inputs
    defaultValues: {
      nombre: nombre || '',
      descripcion: descripcion || '',
      tecnologias: tecnologias || ''
    }
  });

  // Actualizamos los valores si cambian las props
  useEffect(() => {
    reset({
      nombre: nombre || '',
      descripcion: descripcion || '',
      tecnologias: tecnologias || ''
    });
  }, [nombre, descripcion, tecnologias, reset]);

  const onSubmit = (data) => {
    if (onAgregarProyecto) onAgregarProyecto(data);
    if (onModificarProyecto) onModificarProyecto(data.nombre, data.descripcion, data.tecnologias);
    if (onCerrar) onCerrar();
  };

  return (
    <div>
      <div className={styles.barra1}>
        <h1>Agregar Proyecto</h1>
        <button className={styles.cancelar} onClick={onCerrar}>X</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.b}>
          <div className={styles.barra3}>
            <input
              className={`${styles.co} ${errors.nombre ? styles.inputError : ''}`}
              type="text"
              {...register("nombre")}
            />
            <label>Nombre</label>
            {errors.nombre && (
              <span className={styles.errorBrillante}>{errors.nombre.message}</span>
            )}
          </div>

          <div className={styles.barra3}>
            <input
              className={`${styles.co} ${errors.descripcion ? styles.inputError : ''}`}
              type="text"
              {...register("descripcion")}
            />
            <label>Descripción</label>
            {errors.descripcion && (
              <span className={styles.errorBrillante}>{errors.descripcion.message}</span>
            )}
          </div>

          <div className={styles.barra3}>
            <input
              className={`${styles.co} ${errors.tecnologias ? styles.inputError : ''}`}
              type="text"
              {...register("tecnologias")}
            />
            <label>Tecnologías Usadas</label>
            {errors.tecnologias && (
              <span className={styles.errorBrillante}>{errors.tecnologias.message}</span>
            )}
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-bordo-danger" disabled={isSubmitting}>
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Proyecto;
