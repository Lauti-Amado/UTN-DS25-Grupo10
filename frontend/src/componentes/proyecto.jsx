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
  } = useForm({
    resolver: yupResolver(proyectoSchema),
    mode: 'onChange',
    defaultValues: {
      nombre: nombre || '',
      descripcion: descripcion || '',
      tecnologias: tecnologias || '',
    },
  });

  // Actualizar valores si cambian las props
  useEffect(() => {
    reset({
      nombre: nombre || '',
      descripcion: descripcion || '',
      tecnologias: tecnologias || '',
    });
  }, [nombre, descripcion, tecnologias, reset]);

  const onSubmit = async (data) => {
    try {
      if (onModificarProyecto) {
        await onModificarProyecto(data);
      } else if (onAgregarProyecto) {
        await onAgregarProyecto(data);
      }
      if (onCerrar) onCerrar();
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">    
        <div className="modal-content bg-dark text-light shadow-lg border-0">
          
          {/* Header del modal */}
          <div className="modal-header bg-light text-dark d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold mb-0">
              {onModificarProyecto ? "Editar Proyecto" : "Agregar Proyecto"}
            </h5>
            <button type="button" onClick={onCerrar} class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">x</span>
            </button>
          </div>

          {/* Body del modal */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              
              {/* Nombre */}
              <div className="mb-4 text-start">
                <label className="form-label fw-bold fs-5">Nombre del proyecto</label>
                <input
                  type="text"
                  className={`form-control py-3 ${errors.nombre ? 'is-invalid' : ''}`}
                  placeholder="Ej: App de gestión de tareas"
                  {...register("nombre")}
                />
                {errors.nombre && (
                  <div className="invalid-feedback d-block">
                    {errors.nombre.message}
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-4 text-start">
                <label className="form-label fw-bold fs-5">Descripción</label>
                <input
                  type="text"
                  className={`form-control py-3 ${errors.descripcion ? 'is-invalid' : ''}`}
                  placeholder="Describe brevemente el proyecto"
                  {...register("descripcion")}
                />
                {errors.descripcion && (
                  <div className="invalid-feedback d-block">
                    {errors.descripcion.message}
                  </div>
                )}
              </div>

              {/* Tecnologías */}
              <div className="mb-4 text-start">
                <label className="form-label fw-bold fs-5">Tecnologías usadas</label>
                <input
                  type="text"
                  className={`form-control py-3 ${errors.tecnologias ? 'is-invalid' : ''}`}
                  placeholder="Ej: React, Node.js, MongoDB"
                  {...register("tecnologias")}
                />
                {errors.tecnologias && (
                  <div className="invalid-feedback d-block">
                    {errors.tecnologias.message}
                  </div>
                )}
              </div>
            </div>

            {/* Footer del modal */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCerrar}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
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
      </div>
    </div>
  );
}

export default Proyecto;
