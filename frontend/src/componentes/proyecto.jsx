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
    {/* Nombre */}
    <div className="mb-4 text-start">
      <label className="form-label fw-bold fs-5">Nombre del proyecto</label>
      <input
        type="text"
        className={`form-control py-3 input-placeholder-chico ${errors.nombre ? 'is-invalid' : ''}`}
        placeholder="Ej: App de gestión de tareas"
        {...register("nombre")}
      />
      {errors.nombre && (
        <div className="invalid-feedback d-block mt-1">{errors.nombre.message}</div>
      )}
    </div>

    {/* Descripción */}
    <div className="mb-4 text-start">
      <label className="form-label fw-bold fs-5">Descripción</label>
      <input
        type="text"
        className={`form-control py-3 input-placeholder-chico ${errors.descripcion ? 'is-invalid' : ''}`}
        placeholder="Describe brevemente el proyecto"
        {...register("descripcion")}
      />
      {errors.descripcion && (
        <div className="invalid-feedback d-block mt-1">{errors.descripcion.message}</div>
      )}
    </div>

    {/* Tecnologías */}
    <div className="mb-4 text-start">
      <label className="form-label fw-bold fs-5">Tecnologías usadas</label>
      <input
        type="text"
        className={`form-control py-3 input-placeholder-chico ${errors.tecnologias ? 'is-invalid' : ''}`}
        placeholder="Ej: React, Node.js, MongoDB"
        {...register("tecnologias")}
      />
      {errors.tecnologias && (
        <div className="invalid-feedback d-block mt-1">{errors.tecnologias.message}</div>
      )}
    </div>
  </div>

  <div className="text-center mt-3">
  <button 
    type="submit" 
    className="btn btn-bordo-danger"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Guardando...' : 'Aceptar'}
  </button>
</div>

</form>

    </div>
  );
}

export default Proyecto;